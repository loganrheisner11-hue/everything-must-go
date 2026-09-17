# Everything Must Go (EMG)

Resale command center for the October 25, 2026 move liquidation and future flipping operation.

## Current build
- v2 Inventory Brain foundation: unified item schema, seeded move inventory, ASK/TARGET/SOFT FLOOR/HARD FLOOR, status pipeline, KPI dashboard, household/card/flip lanes.
- v3 Intake foundation: phone-first Sell Something form, card lane-ready schema, photo-ready item records.

## Governance
Logan is final authority. Research and drafting may automate; publishing, meaningful price changes and negotiated counters require approval. Hard floor is a code-level guardrail and must never be crossed automatically. Exact home address is never auto-shared.

## Architecture direction
The repository is the source code of truth. Persistent database and object/photo storage are deliberately isolated as the next infrastructure layer rather than faked with browser-only state. Marketplace connectors will support Direct API, Assisted, or Manual modes based on each platform's authorized capabilities.

## Deadline
Sell-down deadline: October 25, 2026.
