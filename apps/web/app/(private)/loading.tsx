export default function PrivateLoading() {
	return (
		<div className="flex-1 p-6 space-y-4 animate-pulse">
			<div className="h-8 w-48 bg-muted rounded" />
			<div className="h-64 bg-muted rounded" />
		</div>
	);
}
