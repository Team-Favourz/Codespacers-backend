const couchbase = require('couchbase');
import {
	type Cluster,
	connect,
	type ConnectOptions,
	type Bucket,
	type Collection,
} from "couchbase";
const {
	CONNSTR,
	DB_USERNAME,
	DB_PASSWORD,
	DB_BUCKET_NAME,
	DB_SCOPE_NAME,
	// DB_COLLECTION_NAME,
} = process.env;

const username: string = DB_USERNAME as string;
const password: string = DB_PASSWORD as string;
const bucketName: string = DB_BUCKET_NAME as string;

const clusterConnStr: string = CONNSTR as string;
const connectOptions: ConnectOptions = {
	username,
	password,
	configProfile: "wanDevelopment",
};

export const cluster = new couchbase.Cluster(clusterConnStr, connectOptions);

async function connectToCouchbase(_collection: string): Promise<Collection> {
	const clusterConnStr: string = CONNSTR as string;
	const connectOptions: ConnectOptions = {
		username,
		password,
		configProfile: "wanDevelopment",
	};

	const cluster: Cluster = await connect(clusterConnStr, connectOptions);
	const bucket: Bucket = cluster.bucket(bucketName);
	const collection: Collection = bucket
		.scope(DB_SCOPE_NAME as string)
		.collection(_collection);
	return collection;
}

export default connectToCouchbase;
