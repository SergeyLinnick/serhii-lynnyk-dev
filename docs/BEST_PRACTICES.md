# Best Practices

Living document. Add patterns as they emerge.

---

## 2025-04-13 — Server Action Validation Boundary

**Issuer:** Developer
**Summary:** Server Actions must treat input as `unknown`, not as pre-typed data.
**Recommendation:** Always wrap write mutations with `safeAction(schema, handler)`. The `raw` parameter must be typed as `unknown` — never as `z.infer<TSchema>` — so Zod proves the shape at runtime. This prevents TypeScript from silently trusting client-submitted data.

---

## 2025-04-13 — Combined Payload Schema for Multi-arg Actions

**Issuer:** Developer
**Summary:** Server Actions wrapped with `safeAction` accept a single argument. Multi-arg actions need a combined schema.
**Recommendation:** Use `z.object({ id, data })` to combine parameters into a single validated payload. Define the combined schema adjacent to the action in `actions.ts`. Update call sites to pass `{ id, data }` instead of separate arguments.

---

## 2025-04-13 — Sentry.captureException for Validation Failures

**Issuer:** Developer
**Summary:** Server-side validation failures indicate bypassed client validation — an anomaly, not routine.
**Recommendation:** Use `Sentry.captureException` (not `addBreadcrumb`) for validation failures in `safeAction`. Tag with `level: "warning"` and `category: "validation"`. Reserve breadcrumbs for general error context in ApiProvider.

---

## 2025-04-13 — Zod v4: Use flattenError() Instead of .flatten()

**Issuer:** Developer
**Summary:** The `.flatten()` instance method on `ZodError` is deprecated in Zod v4.
**Recommendation:** Import `flattenError` from `"zod"` and call `flattenError(result.error).fieldErrors`. This is the v4-compatible API.
