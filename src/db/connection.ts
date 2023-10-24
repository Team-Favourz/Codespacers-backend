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
	DB_COLLECTION_NAME,
} = process.env;

const username: string = DB_USERNAME as string;
const password: string = DB_PASSWORD as string;
const bucketName: string = DB_BUCKET_NAME as string;

async function connectToCouchbase(): Promise<Collection> {
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
		.collection(DB_COLLECTION_NAME as string);
	return collection;
}

export default connectToCouchbase;
