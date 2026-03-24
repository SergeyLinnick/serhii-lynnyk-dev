import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Serhii Lynnyk — Front-End Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: "#0a0a0a",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					padding: "80px",
				}}
			>
				<div style={{ color: "#4d8c00", fontSize: 24, marginBottom: 24 }}>
					serhii-lynnyk-dev.vercel.app
				</div>
				<div
					style={{
						color: "#ffffff",
						fontSize: 72,
						fontWeight: 700,
						lineHeight: 1.1,
						marginBottom: 24,
					}}
				>
					Serhii Lynnyk
				</div>
				<div style={{ color: "#a0a0a0", fontSize: 36 }}>
					Front-End Engineer
				</div>
				<div style={{ color: "#666666", fontSize: 28, marginTop: 16 }}>
					10+ years · React / Next.js
				</div>
			</div>
		),
		{ ...size },
	);
}
