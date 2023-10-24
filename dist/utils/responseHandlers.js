"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
// create a success response handler
function successResponse(res, data, status = 200, message) {
    return res.status(status).json({
        message,
        status,
        success: true,
        data,
    });
}
exports.successResponse = successResponse;
// create an error response handler
function errorResponse(res, message, status = 500) {
    return res.status(status).json({
        message,
        status,
        success: false,
    });
}
exports.errorResponse = errorResponse;
