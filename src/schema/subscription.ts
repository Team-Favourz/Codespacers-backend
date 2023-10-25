import { z } from "zod";

export const SubscriptionSchema = z.object({
	plan: z.string().min(2).max(40),
	Duration: z.enum(["Daily", "Biweekly", "Weekly", "Monthly", "Yearly"]),
	startDate: z.date().min(new Date()),
	amount: z.number().min(0),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

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
