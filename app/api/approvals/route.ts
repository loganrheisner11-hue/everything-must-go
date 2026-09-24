import { NextResponse } from 'next/server'
import { z } from 'zod'
import { requireUser } from '../../../lib/auth'
import type { Json } from '../../../lib/database.types'

const schema = z.object({
  inventoryId: z.string().uuid(),
  kind: z.enum(['PUBLISH', 'PRICE_CHANGE', 'COUNTER', 'BUNDLE_CHANGE', 'FINAL_DISPOSITION']),
  payload: z.record(z.string(), z.unknown()).default({}),
})

export async function GET() {
  try {
    const { supabase } = await requireUser()
    const { data, error } = await supabase
      .from('approvals')
      .select('*')
      .eq('status', 'PENDING')
      .order('created_at', { ascending: true })

    if (error) throw error
    return NextResponse.json(data || [], { headers: { 'Cache-Control': 'no-store' } })
  } catch (error: unknown) {
    const auth = error instanceof Error && error.message === 'UNAUTHENTICATED'
    return NextResponse.json(
      { error: auth ? 'UNAUTHENTICATED' : 'APPROVAL_READ_FAILED' },
      { status: auth ? 401 : 500 },
    )
  }
}

export async function POST(req: Request) {
  try {
    const { supabase, user } = await requireUser()
    const x = schema.parse(await req.json())

    const { data: item, error: itemError } = await supabase
      .from('inventory_items')
      .select('id')
      .eq('id', x.inventoryId)
      .single()

    if (itemError || !item) {
      return NextResponse.json({ error: 'ITEM_NOT_FOUND' }, { status: 404 })
    }

    const { data, error } = await supabase
      .from('approvals')
      .insert({
        inventory_id: x.inventoryId,
        owner_id: user.id,
        kind: x.kind,
        payload: x.payload as Json,
        status: 'PENDING',
      })
      .select('*')
      .single()

    if (error) throw error

    await supabase
      .from('inventory_items')
      .update({
        status: 'NEEDS_LOGAN',
        next_action: `Approve ${x.kind.toLowerCase().replaceAll('_', ' ')}`,
      })
      .eq('id', x.inventoryId)

    return NextResponse.json(data, { status: 201 })
  } catch (error: unknown) {
    const auth = error instanceof Error && error.message === 'UNAUTHENTICATED'
    return NextResponse.json(
      { error: auth ? 'UNAUTHENTICATED' : 'APPROVAL_CREATE_FAILED' },
      { status: auth ? 401 : 400 },
    )
  }
}
