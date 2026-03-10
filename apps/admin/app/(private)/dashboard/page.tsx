import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui";

export default function AdminDashboardPage() {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				<p className="text-muted-foreground">Manage your application from here.</p>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardDescription>Total Users</CardDescription>
						<CardTitle className="text-3xl">0</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">Registered users</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardDescription>Active Sessions</CardDescription>
						<CardTitle className="text-3xl">0</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">Currently logged in</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardDescription>System Status</CardDescription>
						<CardTitle className="text-3xl text-green-600">OK</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">All services operational</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
