import { z } from "zod";

export const validCryptoUUID = z.string();

// pagination params validation
export const paginationSchema = z.object({
	page: z.number().min(1),
	limit: z.number().min(1),
});

export type Pagination = z.infer<typeof paginationSchema>;

export const SubscriptionSchema = z.object({
	plan: z.string().min(2).max(40),
	duration: z.enum(["Daily", "Biweekly", "Weekly", "Monthly", "Yearly"]),
	startDate: z.string().datetime(),
	amount: z.number().min(0),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

export const SubscriptionUpdateSchema = z.object({
	plan: z.string().min(2).max(40).optional(),
	duration: z
		.enum(["Daily", "Biweekly", "Weekly", "Monthly", "Yearly"])
		.optional(),
	startDate: z.string().datetime().optional(),
	amount: z.number().min(0).optional(),
});

export type SubscriptionUpdate = z.infer<typeof SubscriptionUpdateSchema>;

export const SubscriptionListSchema = z.array(SubscriptionSchema);

export type SubscriptionList = z.infer<typeof SubscriptionListSchema>;

export const SubscriptionResponseSchema = z.object({
	data: SubscriptionSchema,
	success: z.boolean(),
	status: z.number(),
	message: z.string(),
});

export const SubscriptionListResponseSchema = z.object({
	data: SubscriptionListSchema,
	success: z.boolean(),
	status: z.number(),
	message: z.string(),
});

export const SubscriptionErrorResponseSchema = z.object({
	success: z.boolean(),
	status: z.number(),
	message: z.string(),
});
