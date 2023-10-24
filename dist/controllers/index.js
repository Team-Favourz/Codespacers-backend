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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.userLogIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const users = {};
const userLogIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = users[username];
    if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        // Compare the hashed password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatch) {
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ username }, `${process.env.APP_SECRET}`, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        }
        else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.userLogIn = userLogIn;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, phoneNumber, address, occupation } = req.body;
        // Check if the user already exists
        const query = `SELECT username FROM \`${userdata}\` WHERE username = $1`;
        const queryOptions = { parameters: [username] };
        const result = yield collection.query(query, queryOptions);
        if (result.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Hash the password
        const saltRounds = 10; // You can adjust this for stronger/weaker hashing
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Create the user document
        const user = {
            type: 'user',
            username,
            password: hashedPassword,
            email,
            phoneNumber,
            address,
            occupation,
        };
        // Store the user in the database
        yield collection.insert(username, user);
        res.status(201).json({ message: 'User registered successfully', collection });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.registerUser = registerUser;
