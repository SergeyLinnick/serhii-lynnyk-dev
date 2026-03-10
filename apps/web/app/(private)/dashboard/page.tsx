import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui";

export default function DashboardPage() {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
				<p className="text-muted-foreground">Here is an overview of your workspace.</p>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader>
						<CardDescription>Total Tasks</CardDescription>
						<CardTitle className="text-3xl">3</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">Across all statuses</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardDescription>In Progress</CardDescription>
						<CardTitle className="text-3xl">1</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">Currently being worked on</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardDescription>Completed</CardDescription>
						<CardTitle className="text-3xl">1</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">Done this week</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardDescription>To Do</CardDescription>
						<CardTitle className="text-3xl">1</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">Waiting to start</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
