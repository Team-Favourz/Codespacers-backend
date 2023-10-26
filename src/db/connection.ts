import {
	type Cluster,
	connect,
	type ConnectOptions,
	type Bucket,
	type Collection,
} from "couchbase";
import { env } from "env";
import * as couchbase from "couchbase";
const { CONNSTR, DB_USERNAME, DB_PASSWORD, DB_BUCKET_NAME, DB_SCOPE_NAME } =
	env;

const username: string = DB_USERNAME;
const password: string = DB_PASSWORD;

const connectOptions: ConnectOptions = {
	username,
	password,
	configProfile: "wanDevelopment",
};

export function scope(): couchbase.Scope {
	const cluster = new couchbase.Cluster(CONNSTR, connectOptions);
	const bucket = cluster.bucket(DB_BUCKET_NAME);
	return bucket.scope(DB_SCOPE_NAME);
}

async function connectToCouchbase(_collection: string): Promise<Collection> {
	const clusterConnStr: string = CONNSTR;
	const connectOptions: ConnectOptions = {
		username,
		password,
		configProfile: "wanDevelopment",
	};

	const cluster: Cluster = await connect(clusterConnStr, connectOptions);
	const bucket: Bucket = cluster.bucket(DB_BUCKET_NAME);
	const collection: Collection = bucket
		.scope(DB_SCOPE_NAME)
		.collection(_collection);
	return collection;
}

export default connectToCouchbase;
