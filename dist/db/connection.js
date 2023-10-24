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
/* eslint-disable @typescript-eslint/consistent-type-imports */
const couchbase_1 = require("couchbase");
function connectToCouchbase() {
    return __awaiter(this, void 0, void 0, function* () {
        const clusterConnStr = 'couchbases://cb.lezbashbovm7oskq.cloud.couchbase.com';
        const connectOptions = {
            username: 'favour',
            password: 'Favour1$',
        };
        const cluster = yield (0, couchbase_1.connect)(clusterConnStr, connectOptions);
        return cluster;
    });
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
