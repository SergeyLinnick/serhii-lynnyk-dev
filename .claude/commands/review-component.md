## Review Component

Review a component against the following checklist:

### Checklist

- [ ] **TypeScript strict** — No `any`, proper type annotations
- [ ] **Controlled component pattern** — Props control state where applicable
- [ ] **forwardRef** — Component forwards ref to root element
- [ ] **cn() for className** — Uses `cn()` utility for className merging
- [ ] **CVA for variants** — Uses class-variance-authority for variant styling
- [ ] **Accessibility** — Proper aria attributes, keyboard navigation support
- [ ] **Storybook story exists** — Story file with Default + variant stories
- [ ] **Test exists** — Unit/integration test covering core behavior

### Usage

```
/review-component <component-path>
```
