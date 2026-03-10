## Generate Form

Generate a form using three layers:

1. **View** (minimal wrapper) — `create-<entity>-view.tsx`
2. **Form Wrapper** (data + mutations) — `<entity>-form.tsx` in `blocks/`
3. **Form Component** (presentation + react-hook-form + Zod) — `<entity>-form-component.tsx`

### Pattern

```
features/<entity>/
  views/
    create-<entity>-view.tsx      # Minimal wrapper, renders form wrapper
  blocks/
    <entity>-form.tsx             # Fetches data, handles mutations, passes to form component
    <entity>-form-component.tsx   # Presentation layer, react-hook-form + Zod validation
```

### Usage

```
/generate-form <entity-name>
```
