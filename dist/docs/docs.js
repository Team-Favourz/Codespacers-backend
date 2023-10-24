"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your application',
        },
    },
    apis: ['src/route/*.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.default = specs;
