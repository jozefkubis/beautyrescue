---
applyTo: "app/_lib/actions/**/*.{ts,tsx}"
description: "Use when editing server actions: keep return shapes consistent, validate inputs simply, and add practical Slovak comments for junior readability"
---

# Actions Instructions

- Prefer simple and readable server action logic over helper-heavy abstractions.
- Keep return shapes consistent across success and failure branches so client code can handle results predictably.
- Validate inputs early with short, clear checks.
- Handle auth and permission checks near the top of the action.
- Add short Slovak comments above non-obvious logic blocks to explain what happens and why.
- Avoid comments for obvious lines.
- For server-only code without JSX, prefer `.ts` files.
- Keep revalidation and cache invalidation explicit and easy to understand.
