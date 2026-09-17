import {createClient} from './supabase/server';
export async function requireUser(){const supabase=await createClient();const {data:{user},error}=await supabase.auth.getUser();if(error||!user)throw new Error('UNAUTHENTICATED');return {supabase,user};}
