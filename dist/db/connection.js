"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const couchbase_1 = require("couchbase");
const { CONNSTR, DB_USERNAME, DB_PASSWORD, DB_BUCKET_NAME, DB_SCOPE_NAME, DB_COLLECTION_NAME, } = process.env;
const username = DB_USERNAME;
const password = DB_PASSWORD;
const bucketName = DB_BUCKET_NAME;
function connectToCouchbase() {
    return __awaiter(this, void 0, void 0, function* () {
        const clusterConnStr = CONNSTR;
        const connectOptions = {
            username,
            password,
            configProfile: "wanDevelopment",
        };
        const cluster = yield (0, couchbase_1.connect)(clusterConnStr, connectOptions);
        const bucket = cluster.bucket(bucketName);
        const collection = bucket
            .scope(DB_SCOPE_NAME)
            .collection(DB_COLLECTION_NAME);
        return collection;
    });
}
exports.default = connectToCouchbase;
