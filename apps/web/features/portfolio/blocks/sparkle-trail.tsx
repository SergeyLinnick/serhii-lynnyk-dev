"use client";

import { useEffect, useRef } from "react";

interface SparkleTrailProps {
	color?: string;
	count?: number;
	size?: number;
	life?: number;
	speed?: number;
	zIndex?: number;
}

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	size: number;
	born: number;
	life: number;
	rot: number;
	rotSpeed: number;
	type: "star" | "dot";
	alive: boolean;
}

const MAX_STEPS = 8;
const POOL_SIZE = 400;
const FRAME_MS = 16.667;
const TIME_GAP_THRESHOLD = 100;

function createParticle(): Particle {
	return {
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		size: 0,
		born: 0,
		life: 0,
		rot: 0,
		rotSpeed: 0,
		type: "star",
		alive: false,
	};
}

export function SparkleTrail({
	color = "#ffffff",
	count = 5,
	size = 3,
	life = 700,
	speed = 1,
	zIndex = 50,
}: SparkleTrailProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pool = useRef<Particle[]>([]);
	const activeCount = useRef(0);
	const lastPos = useRef<{ x: number; y: number; time: number } | null>(null);
	const animId = useRef(0);
	const running = useRef(false);
	const disposed = useRef(false);
	const lastFrameTime = useRef(0);

	const propsRef = useRef({ color, count, size, life, speed });
	propsRef.current = { color, count, size, life, speed };

	const ctxRef = useRef<{
		ctx: CanvasRenderingContext2D;
		W: number;
		H: number;
		dpr: number;
	} | null>(null);

	if (pool.current.length === 0) {
		for (let i = 0; i < POOL_SIZE; i++) {
			pool.current.push(createParticle());
		}
	}

	const drawStar = (
		ctx: CanvasRenderingContext2D,
		cx: number,
		cy: number,
		r: number,
		alpha: number,
		rot: number,
		dpr: number,
	) => {
		const cos = Math.cos(rot);
		const sin = Math.sin(rot);
		ctx.setTransform(cos * dpr, sin * dpr, -sin * dpr, cos * dpr, cx * dpr, cy * dpr);
		ctx.globalAlpha = alpha;
		ctx.beginPath();
		const spikes = 4;
		const inner = r * 0.3;
		for (let i = 0; i < spikes * 2; i++) {
			const rad = i % 2 === 0 ? r : inner;
			const a = (Math.PI / spikes) * i - Math.PI / 2;
			if (i === 0) ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad);
			else ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
		}
		ctx.closePath();
		ctx.fill();
	};

	const drawDot = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, alpha: number) => {
		ctx.globalAlpha = alpha;
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.fill();
	};

	const render = useRef((now: number) => {
		const c = ctxRef.current;
		if (!c) return;
		const { ctx, W, H, dpr } = c;

		const dt = lastFrameTime.current > 0 ? Math.min((now - lastFrameTime.current) / FRAME_MS, 3) : 1;
		lastFrameTime.current = now;

		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = propsRef.current.color;
		const arr = pool.current;
		let alive = 0;
		const friction = Math.pow(0.98, dt);

		for (let i = 0; i < activeCount.current; i++) {
			const p = arr[i]!;
			if (!p.alive) continue;

			const age = now - p.born;
			if (age > p.life) {
				p.alive = false;
				continue;
			}

			alive++;
			const t = age / p.life;
			const ease = 1 - t * t;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.vx *= friction;
			p.vy *= friction;
			p.rot += p.rotSpeed * dt;
			const sz = p.size * ease;
			if (sz < 0.2) continue;
			if (p.type === "star") {
				drawStar(ctx, p.x, p.y, sz, ease, p.rot, dpr);
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			} else {
				drawDot(ctx, p.x, p.y, sz * 0.6, ease);
			}
		}

		if (alive < activeCount.current) {
			let writeIdx = 0;
			for (let i = 0; i < activeCount.current; i++) {
				if (arr[i]!.alive) {
					if (writeIdx !== i) {
						const tmp = arr[writeIdx]!;
						arr[writeIdx] = arr[i]!;
						arr[i] = tmp;
					}
					writeIdx++;
				}
			}
			activeCount.current = writeIdx;
		}
	});

	const startLoop = useRef(() => {
		if (running.current || disposed.current) return;
		running.current = true;
		lastFrameTime.current = 0;
		const tick = (now: number) => {
			if (disposed.current) {
				running.current = false;
				return;
			}
			render.current(now);
			if (activeCount.current > 0) {
				animId.current = requestAnimationFrame(tick);
			} else {
				running.current = false;
			}
		};
		animId.current = requestAnimationFrame(tick);
	});

	const spawn = useRef((x: number, y: number) => {
		const { count: c, size: s, life: l, speed: sp } = propsRef.current;
		const n = c + Math.floor(Math.random() * 3);
		const arr = pool.current;

		for (let i = 0; i < n; i++) {
			let p: Particle;
			if (activeCount.current < arr.length) {
				p = arr[activeCount.current]!;
			} else {
				p = createParticle();
				arr.push(p);
			}

			const angle = Math.random() * Math.PI * 2;
			const spd = (0.3 + Math.random() * 1.5) * sp;
			p.x = x;
			p.y = y;
			p.vx = Math.cos(angle) * spd;
			p.vy = Math.sin(angle) * spd;
			p.size = (0.5 + Math.random()) * s;
			p.born = performance.now();
			p.life = l * (0.6 + Math.random() * 0.8);
			p.rot = Math.random() * Math.PI;
			p.rotSpeed = (Math.random() - 0.5) * 0.08;
			p.type = Math.random() > 0.4 ? "star" : "dot";
			p.alive = true;
			activeCount.current++;
		}
		startLoop.current();
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		disposed.current = false;

		let W = 0,
			H = 0,
			dpr = 1;

		const resize = () => {
			dpr = window.devicePixelRatio || 1;
			W = window.innerWidth;
			H = window.innerHeight;
			canvas.width = W * dpr;
			canvas.height = H * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctxRef.current = { ctx, W, H, dpr };
		};

		resize();
		window.addEventListener("resize", resize);

		const onMove = (clientX: number, clientY: number) => {
			const now = performance.now();
			if (lastPos.current) {
				const timeSinceLast = now - lastPos.current.time;
				if (timeSinceLast > TIME_GAP_THRESHOLD) {
					lastPos.current = null;
				}
			}

			const mx = clientX;
			const my = clientY;
			if (lastPos.current) {
				const dx = mx - lastPos.current.x;
				const dy = my - lastPos.current.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const steps = Math.min(MAX_STEPS, Math.max(1, Math.floor(dist / 6)));
				for (let s = 0; s < steps; s++) {
					const t = s / steps;
					spawn.current(lastPos.current.x + dx * t, lastPos.current.y + dy * t);
				}
			} else {
				spawn.current(mx, my);
			}
			lastPos.current = { x: mx, y: my, time: now };
		};

		const handleMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
		const handleTouch = (e: TouchEvent) => {
			e.preventDefault();
			const touch = e.touches[0];
			if (touch) onMove(touch.clientX, touch.clientY);
		};
		const handleTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0];
			if (touch) onMove(touch.clientX, touch.clientY);
		};
		const handleLeave = () => {
			lastPos.current = null;
		};

		window.addEventListener("mousemove", handleMouse);
		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchmove", handleTouch, { passive: false });
		window.addEventListener("mouseleave", handleLeave);

		return () => {
			disposed.current = true;
			cancelAnimationFrame(animId.current);
			running.current = false;
			ctxRef.current = null;
			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", handleMouse);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouch);
			window.removeEventListener("mouseleave", handleLeave);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none fixed inset-0"
			style={{ zIndex, width: "100vw", height: "100vh" }}
		/>
	);
}
