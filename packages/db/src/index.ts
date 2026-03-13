import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import * as schema from "./schema";

type Schema = typeof schema;

function createDb(): NeonHttpDatabase<Schema> {
	const sql = neon(process.env.DATABASE_URL!);
	return drizzle(sql, { schema });
}

let instance: NeonHttpDatabase<Schema> | undefined;

export const db: NeonHttpDatabase<Schema> = new Proxy({} as NeonHttpDatabase<Schema>, {
	get(_, prop) {
		instance ??= createDb();
		const value = Reflect.get(instance, prop);
		return typeof value === "function" ? value.bind(instance) : value;
	},
});
export type Database = typeof db;
