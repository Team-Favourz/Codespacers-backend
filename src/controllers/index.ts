import type { Request, Response } from "express";
import "dotenv/config";
import couchbase from "couchbase";

export const createFolder = async (req: Request, res: Response) => {
	const userId = req.params.userId;
	const { name, purpose, month, amount } = req.body;

	const expense = {
		name,
		purpose,
		month,
		amount,
	};

	const expensesKey = `expenses:${userId}`;
	const clusterConnStr: any = process.env.CONNSTR;
	const cluster = await couchbase.connect(clusterConnStr, {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,

		configProfile: "wanDevelopment",
	});

	const bucketName = "codespacers";
	const bucket = cluster.bucket(bucketName);

	const defaultBucket = bucket.defaultCollection();

	// Retrieve user's expenses from Couchbase (if they exist) and update the list.
	defaultBucket
		.get(expensesKey)
		.then(async (result) => {
			const userExpenses = result.content ? result.content : [];
			userExpenses.push(expense);

			// Save the updated list of expenses back to Couchbase.
			return await defaultBucket.upsert(expensesKey, userExpenses);
		})
		.then(() => {
			res.status(201).json({ message: "Folder created successfully", expense });
		})
		.catch((err) => {
			res
				.status(500)
				.json({ error: "Failed to save user expenses", details: err });
		});
};

export const displayFolderDetails = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId;
		const expensesKey = `expenses:${userId}`;

		const clusterConnStr: any = process.env.CONNSTR;
		const cluster = await couchbase.connect(clusterConnStr, {
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,

			configProfile: "wanDevelopment",
		});

		const bucketName = "codespacers";
		const bucket = cluster.bucket(bucketName);
		const collection = bucket.defaultCollection();

		// Retrieve folder data from Couchbase
		const getResult = await collection.get(expensesKey);
		const folderData = getResult.content;

		res.status(200).json({
			message: "Folder data retrieved successfully",
			folder: folderData,
		});
	} catch (error) {
		res.status(404).json({ error: "Folder data not found", details: error });
	}
};
