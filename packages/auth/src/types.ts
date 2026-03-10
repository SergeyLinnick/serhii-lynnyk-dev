export type User = {
	id: string;
	email: string;
	name: string;
	image?: string;
};

export type Session = {
	user: User;
	token: string;
	expiresAt: Date;
};
