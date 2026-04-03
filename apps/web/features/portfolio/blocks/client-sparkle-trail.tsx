"use client";

import dynamic from "next/dynamic";

const SparkleTrail = dynamic(() => import("./sparkle-trail").then(m => m.SparkleTrail), { ssr: false });

export function ClientSparkleTrail(props: { count: number; size: number; life: number; speed: number }) {
	return <SparkleTrail {...props} />;
}
