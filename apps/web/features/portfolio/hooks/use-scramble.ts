"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+?#&!";
const CYCLE_INTERVAL = 40;
const STAGGER_PER_CHAR = 60;
const SETTLE_DURATION = 400;

export function useScramble(text: string, trigger: boolean): string {
	const [display, setDisplay] = useState(text);
	const frameRef = useRef<ReturnType<typeof setTimeout> | number | null>(null);
	const startRef = useRef<number>(0);

	const animate = useCallback(() => {
		const now = performance.now();
		const elapsed = now - startRef.current;

		let result = "";
		let allDone = true;

		for (let i = 0; i < text.length; i++) {
			const ch = text[i];
			if (ch === " " || ch === "\n") {
				result += ch;
				continue;
			}

			const charDelay = i * STAGGER_PER_CHAR;
			const charElapsed = elapsed - charDelay;

			if (charElapsed < SETTLE_DURATION) {
				result += CHARS[Math.floor(Math.random() * CHARS.length)];
				allDone = false;
			} else {
				result += ch;
			}
		}

		setDisplay(result);

		if (!allDone) {
			frameRef.current = setTimeout(() => {
				frameRef.current = requestAnimationFrame(animate);
			}, CYCLE_INTERVAL);
		}
	}, [text]);

	useEffect(() => {
		if (!trigger) return;
		startRef.current = performance.now();
		frameRef.current = requestAnimationFrame(animate);
		return () => {
			if (typeof frameRef.current === "number") {
				cancelAnimationFrame(frameRef.current);
			}
			clearTimeout(frameRef.current as ReturnType<typeof setTimeout>);
		};
	}, [trigger, animate]);

	return display;
}
