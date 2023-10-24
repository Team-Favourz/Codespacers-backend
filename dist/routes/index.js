"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const index_1 = require("../controllers/index");
const index_2 = require("../services/index");
const router = (0, express_1.Router)();
router.post('/register', index_1.registerUser);
router.post('/login', index_2.verifyToken, index_1.userLogIn);
exports.default = router;
