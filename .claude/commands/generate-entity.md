## Generate CRUD Entity

Generate a new CRUD entity following the existing Task entity as reference pattern.

### Steps

1. **Schema + Types** — Create schema and types in `models/<entity>/`
2. **Contracts** — Create contracts in `api/src/<entity>/`
3. **Services + Mappers + Queries** — Create services, mappers, and queries in `api/src/<entity>/`
4. **Views + Blocks** — Create views and blocks in `features/<entity>/`
5. **Routes** — Create routes in `app/(private)/<entity>/`
6. **Verify** — Run `pnpm check-types` and `pnpm lint` to confirm no errors

### Usage

```
/generate-entity <entity-name>
```

Reference the existing Task entity for file structure, naming conventions, and implementation patterns.
