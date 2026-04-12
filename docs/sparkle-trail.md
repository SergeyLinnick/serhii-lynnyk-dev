# SparkleTrail — Cursor Particle Effect

## Overview

Canvas-based particle system that spawns star and dot shapes from the mouse cursor on the portfolio hero section. Scoped to the hero container only (not fullscreen). Desktop only — no touch support by design.

**File:** `apps/web/features/portfolio/blocks/sparkle-trail.tsx`
**Wrapper:** `apps/web/features/portfolio/blocks/client-sparkle-trail.tsx` (client component with dynamic import, `ssr: false`)
**Integration:** `apps/web/features/portfolio/blocks/portfolio-hero.tsx` (placed inside hero `Container`)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `"#ffffff"` | CSS color for all particles |
| `count` | `number` | `5` | Base particles per spawn point |
| `size` | `number` | `3` | Max particle radius (px) |
| `life` | `number` | `700` | Base lifetime (ms) |
| `speed` | `number` | `1` | Velocity multiplier |
| `zIndex` | `number` | `50` | Canvas z-index |

**Current usage:** `<SparkleTrail count={2} size={2} life={500} speed={1} />`

## Architecture

```
mousemove → onMove → spawn() → startLoop() → tick() → render() → rAF(tick)
                                                                      ↓
                                                         particles === 0 → STOP
```

### Key Design Decisions

- **All state in refs, not React state** — animation runs outside React render cycle, zero re-renders during animation
- **Object pool** — pre-allocated 400 particles, reused via `alive` flag, no GC pressure
- **On-demand loop** — `requestAnimationFrame` runs only when particles exist, zero CPU when idle
- **Delta-time physics** — frame-rate independent: `p.x += p.vx * dt`, `friction = 0.98^dt`
- **Desktop only** — touch events removed to avoid blocking mobile scroll
- **Deferred init** — `requestIdleCallback` delays pool creation and event listeners until browser is idle
- **Hero-scoped** — canvas is `position: absolute` inside hero container, not fullscreen. Events listen on parent element, coordinates are container-relative. `ResizeObserver` tracks container size changes

### Constants

| Constant | Value | Purpose |
|----------|-------|---------|
| `MAX_STEPS` | `4` | Max interpolation points between mouse samples |
| `POOL_SIZE` | `400` | Pre-allocated particle objects |
| `FRAME_MS` | `16.667` | Reference frame duration (60fps) for delta-time |
| `TIME_GAP_THRESHOLD` | `100ms` | Reset lastPos if gap between moves exceeds this |
| `MOVE_THROTTLE_MS` | `16ms` | Minimum interval between mousemove processing |

## Rendering

### Particle Types
- **Star (60%)** — 4-spike shape drawn with `moveTo`/`lineTo`, inner radius 30% of outer
- **Dot (40%)** — circle via `ctx.arc`, radius scaled to 60% of star equivalent

### Fade Curve
Quadratic ease-out: `ease = 1 - (age/life)^2`
- Controls both opacity (`globalAlpha`) and size simultaneously
- Particles shrink and fade together for natural decay

### Canvas Optimizations
- `ctx.fillStyle` set once per frame (all particles share color)
- `ctx.setTransform()` instead of `save()/restore()` for star rotation
- `Math.pow(0.98, dt)` computed once per frame, not per particle
- Compact pass (swap alive particles to front) runs only when deaths occur

## Performance Profile

With current props (`count=2, life=500ms`):
- ~20-30 active particles during continuous mouse movement
- ~0.1ms per render frame (negligible)
- Zero CPU/GPU when mouse is stationary
- No GC stutters (object pool, no allocations in hot path)

## Solved Problems

| Problem | Solution |
|---------|----------|
| rAF leak after unmount | `disposed` ref checked in `tick()`, set in cleanup |
| Unbounded spawn on fast mouse | `MAX_STEPS=4` caps interpolation points |
| O(n^2) array splice | Swap-and-compact pattern, O(n) per frame |
| Stale closures on prop change | Props stored in `propsRef`, callbacks in stable `useRef` |
| Ghost frame after last particle | `clearRect` runs before particle loop every frame |
| Touch blocks mobile scroll | Touch listeners removed entirely (desktop-only effect) |
| Teleport line after cursor re-enter | `TIME_GAP_THRESHOLD` resets `lastPos` after 100ms gap |
| FPS-dependent physics | Delta-time: position, velocity, friction, rotation all scaled by `dt` |
| Init blocks main thread | `requestIdleCallback` defers pool + listener setup |

## Mobile Behavior

No effect on mobile/touch devices. The component renders an empty canvas (`pointer-events: none`) but registers no touch listeners. This is intentional — the sparkle trail is a cursor decoration that conflicts with touch scrolling.

## Testing Performance

1. **Real-time monitoring:** DevTools → Ctrl+Shift+P → "Show Performance Monitor" → watch CPU% and JS heap during mouse movement
2. **Frame analysis:** DevTools → Performance → Record → move mouse 5-10s → check for frames >16ms
3. **Memory:** DevTools → Memory → compare heap snapshots before/after mouse activity (pool should prevent growth)
