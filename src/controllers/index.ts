/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { Cluster, Collection, QueryOptions } from 'couchbase';

const users: Record<string, any> = {};


export const userLogIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users[username];

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate a JWT token
      const token = jwt.sign({ username }, `${process.env.APP_SECRET}`, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, phoneNumber, address, occupation } = req.body;

    // Check if the user already exists
    const query = `SELECT username FROM \`${userdata}\` WHERE username = $1`;
    const queryOptions: QueryOptions = { parameters: [username] };
    const result = await collection.query(query, queryOptions);

    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10; // You can adjust this for stronger/weaker hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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
    await collection.insert(username, user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};