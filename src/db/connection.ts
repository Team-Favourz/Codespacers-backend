/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Cluster, connect, ConnectOptions } from 'couchbase';


async function connectToCouchbase(): Promise<Cluster> {
  const clusterConnStr = 'couchbases://cb.lezbashbovm7oskq.cloud.couchbase.com';
  const connectOptions: ConnectOptions = {
    username: 'favour',
    password: 'Favour1$',
  };

  const cluster: Cluster = await connect(clusterConnStr, connectOptions);

  return cluster;
}

const clusterPromise = connectToCouchbase();

clusterPromise
  .then((_cluster) => {
    // Use the connected cluster here
    console.log('Couchbase connected successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to Couchbase:', error);
  });