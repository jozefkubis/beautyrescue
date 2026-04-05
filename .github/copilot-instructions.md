# Copilot Instructions

This project prefers simple, readable, and practical code over clever abstractions.

## Coding style

- Prefer small, focused components and straightforward functions.
- Use clear names for variables, functions, props, and components.
- Reuse existing components from `app/_components` before creating new ones.
- Avoid unnecessary custom hooks, helper layers, wrappers, and abstractions.
- Keep server and client responsibilities clear.
- Preserve existing project patterns unless there is a clear reason to improve them.

## Visual consistency

- Match the existing visual style of the project.
- Reuse existing colors, spacing, fonts, and layout patterns.
- Do not generate generic dashboard-style Tailwind UI when the project already has its own brand direction.
- Prefer extending current components and styles over introducing a new visual system.

## Comments in Slovak

- Write code comments in Slovak language.
- Every new component should include a short Slovak comment explaining what it does.
- Add short Slovak comments above non-obvious logic blocks to explain what happens and why.
- Write comments for a junior developer so the code is easier to understand on first read.
- Do not comment obvious lines or repeat what the code literally says.

## Friendly collaboration

- Be friendly, calm, and respectful.
- Explain decisions simply and practically.
- Write like a helpful senior developer mentoring a junior developer.
- Avoid arrogant, cold, or overly strict phrasing.
- When changing code, briefly explain what changed and why.

## Preferred workflow

- Start with the simplest good solution.
- Keep changes minimal and easy to maintain.
- When refactoring, preserve behavior unless the task explicitly requires a change.
- For forms and UI, prefer existing project components and patterns first.
- For Supabase and server actions, keep data flow readable and return shapes consistent.
