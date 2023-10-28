import {
	type Cluster,
	connect,
	type ConnectOptions,
	type Bucket,
	type Collection,
  type Scope,
} from "couchbase";
import { env } from "env";
// import * as couchbase from "couchbase";
const { CONNSTR, DB_USERNAME, DB_PASSWORD, DB_BUCKET_NAME, DB_SCOPE_NAME } =
	env;

const username: string = DB_USERNAME;
const password: string = DB_PASSWORD;

interface DBCollection {
	cluster: Cluster;
	bucket: Bucket;
  scope: Scope;
	collection: Collection;
}

async function connectToCouchbase(_collection: string): Promise<DBCollection> {
	const clusterConnStr: string = CONNSTR;
	const connectOptions: ConnectOptions = {
		username,
		password,
		configProfile: "wanDevelopment",
	};

	const cluster: Cluster = await connect(clusterConnStr, connectOptions);
	const bucket: Bucket = cluster.bucket(DB_BUCKET_NAME);
	const scope: Scope = bucket.scope(DB_SCOPE_NAME);
	const collection: Collection = scope.collection(_collection);

	const dbCollection = {
		cluster,
		bucket,
		scope,
		collection,
	};
	return dbCollection;
}

export default connectToCouchbase;
