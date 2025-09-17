"use client";

import { useUser } from "@clerk/nextjs";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { PRO_PLANS } from "@/constants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ProPage = () => {
	const [loadingPlan, setLoadingPlan] = useState("");
	const { user, isLoaded: isUserLoaded } = useUser();

	const userData = useQuery(api.users.getUserByClerkId, user ? { clerkId: user?.id } : "skip");
	const userSubscription = useQuery(
		api.subscriptions.getUserSubscription,
		userData ? { userId: userData?._id } : "skip"
	);

	const isYearlySubscriptionActive = userSubscription?.status === "active" && userSubscription.planType === "year";
	const createProPlanCheckoutSession = useAction(api.stripe.createProPlanCheckoutSession);

	const handlePlanSelection = async (planId: "month" | "year") => {
		if (!user) {
			toast.error("Please log in to select a plan.", {
				id: "login-error",
				position: "top-center",
				duration: 3000,
			});
			return;
		}

		setLoadingPlan(planId);
		try {
			const result = await createProPlanCheckoutSession({ planId });
			if (result.checkoutUrl) {
				window.location.href = result.checkoutUrl;
			}
		} catch (error: any) {
			if (error.message.includes("Rate limit exceeded")) {
				toast.error("You've tried too many times. Please try again later.");
			} else {
				toast.error("There was an error initiating your purchase. Please try again.");
			}
			console.log(error);
		} finally {
			setLoadingPlan("");
		}
	};

	return (
		<div className='container mx-auto px-4 py-16 max-w-6xl min-h-screen pb-24'>
			<h1 className='text-4xl font-bold text-center mb-4 text-gray-800'>Choose Your Pro Journey</h1>
			<p className='text-xl text-center mb-12 text-gray-600'>
				Unlock premium features and accelerate your learning
			</p>

			{isUserLoaded && userSubscription?.status === "active" && (
				<div className='bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-md'>
					<p className='text-blue-700'>
						You have an active <span className='font-semibold'>{userSubscription.planType}</span>{" "}
						subscription.
					</p>
				</div>
			)}

			<div className='grid md:grid-cols-2 gap-8 items-stretch'>
				{PRO_PLANS.map((plan) => (
					<Card
						key={plan.id}
						className={`
               flex flex-col transition-all duration-300 ${
					plan.highlighted
						? "border-purple-400 shadow-lg hover:shadow-xl"
						: "hover:border-purple-200 hover:shadow-md"
				}
          `}
					>
						<CardHeader className='flex-grow'>
							<CardTitle className={`text-2xl ${plan.highlighted ? "text-purple-600" : "text-gray-800"}`}>
								{plan.title}
							</CardTitle>

							<CardDescription className='mt-2'>
								<span className='text-3xl font-bold text-gray-900'>{plan.price}</span>
								<span className='text-gray-600 ml-1'>{plan.period}</span>
							</CardDescription>
						</CardHeader>

						<CardContent>
							<ul className='space-y-3'>
								{plan.features.map((feature, fIdx) => (
									<li key={fIdx} className='flex items-center'>
										<Check
											className={`h-5 w-5 ${plan.highlighted ? "text-purple-500" : "text-green-500"} mr-2 flex-shrink-0`}
										/>
										<span className='text-gray-700'>{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>

						<CardFooter className='mt-auto'>
							<Button
								className={`w-full py-6 text-lg ${
									plan.highlighted
										? "bg-purple-600 hover:bg-purple-700 text-white"
										: "bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50"
								}`}
								onClick={() => handlePlanSelection(plan.id as "month" | "year")}
								disabled={
									userSubscription?.status === "active" &&
									(userSubscription.planType === plan.id || isYearlySubscriptionActive)
								}
							>
								{loadingPlan === plan.id ? (
									<>
										<Loader2Icon className='mr-2 size-4 animate-spin' />
										Processing...
									</>
								) : isUserLoaded &&
								  userSubscription?.status === "active" &&
								  userSubscription.planType === plan.id ? (
									"Current Plan"
								) : isUserLoaded && plan.id === "month" && isYearlySubscriptionActive ? (
									"Yearly Plan Active"
								) : (
									plan.ctaText
								)}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{/* Test Card Information - Always Visible */}
				<div className='mt-12 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg'>
					<div className='text-center mb-6'>
						<h3 className='text-xl font-bold text-yellow-800 mb-2'>⚠️ Stripe Test Card Information</h3>
						<p className='text-yellow-700'>
							Use these official Stripe test card numbers for testing payments (no real charges will be made)
						</p>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{/* Successful Cards */}
						<div className='bg-white p-4 rounded-lg border border-yellow-200'>
							<h4 className='font-semibold text-green-700 mb-3'>✅ Successful Payments</h4>
							<div className='space-y-2 text-sm'>
								<div>
									<p className='font-medium'>Visa</p>
									<p className='font-mono text-gray-600'>4242 4242 4242 4242</p>
								</div>
								<div>
									<p className='font-medium'>Visa (Debit)</p>
									<p className='font-mono text-gray-600'>4000 0566 5566 5556</p>
								</div>
								<div>
									<p className='font-medium'>Mastercard</p>
									<p className='font-mono text-gray-600'>5555 5555 5555 4444</p>
								</div>
								<div>
									<p className='font-medium'>American Express</p>
									<p className='font-mono text-gray-600'>3782 822463 10005</p>
								</div>
							</div>
						</div>

						{/* Declined Cards */}
						<div className='bg-white p-4 rounded-lg border border-yellow-200'>
							<h4 className='font-semibold text-red-700 mb-3'>❌ Declined Payments</h4>
							<div className='space-y-2 text-sm'>
								<div>
									<p className='font-medium'>Generic Decline</p>
									<p className='font-mono text-gray-600'>4000 0000 0000 0002</p>
								</div>
								<div>
									<p className='font-medium'>Insufficient Funds</p>
									<p className='font-mono text-gray-600'>4000 0000 0000 9995</p>
								</div>
								<div>
									<p className='font-medium'>Expired Card</p>
									<p className='font-mono text-gray-600'>4000 0000 0000 0069</p>
								</div>
								<div>
									<p className='font-medium'>Incorrect CVC</p>
									<p className='font-mono text-gray-600'>4000 0000 0000 0127</p>
								</div>
							</div>
						</div>

						{/* 3D Secure Cards */}
						<div className='bg-white p-4 rounded-lg border border-yellow-200'>
							<h4 className='font-semibold text-blue-700 mb-3'>🔐 3D Secure Required</h4>
							<div className='space-y-2 text-sm'>
								<div>
									<p className='font-medium'>Requires Authentication</p>
									<p className='font-mono text-gray-600'>4000 0025 0000 3155</p>
								</div>
								<div>
									<p className='font-medium'>Always Authenticate</p>
									<p className='font-mono text-gray-600'>4000 0027 6000 3184</p>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
						<h4 className='font-semibold text-blue-800 mb-2'>📝 Additional Test Details</h4>
						<div className='text-sm text-blue-700 space-y-1'>
							<p><strong>Expiry Date:</strong> Any future date (e.g., 12/34)</p>
							<p><strong>CVC:</strong> Any 3 digits for Visa/MC/Discover (4 digits for Amex)</p>
							<p><strong>ZIP Code:</strong> Any valid postal code</p>
							<p><strong>Name:</strong> Any name</p>
						</div>
					</div>

					<div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
						<h4 className='font-semibold text-green-800 mb-3'>💳 Complete Test Example - Copy & Paste Ready</h4>
						<div className='bg-white p-4 rounded border border-green-200'>
							<p className='text-sm font-medium text-green-800 mb-3'>Use these exact test values in the Stripe checkout:</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
								<div>
									<p className='font-medium text-gray-700'>Card Number:</p>
									<p className='font-mono text-lg text-gray-900 bg-gray-50 p-2 rounded border'>4242 4242 4242 4242</p>
								</div>
								<div>
									<p className='font-medium text-gray-700'>Expiry Date:</p>
									<p className='font-mono text-lg text-gray-900 bg-gray-50 p-2 rounded border'>12/34</p>
								</div>
								<div>
									<p className='font-medium text-gray-700'>CVC:</p>
									<p className='font-mono text-lg text-gray-900 bg-gray-50 p-2 rounded border'>123</p>
								</div>
								<div>
									<p className='font-medium text-gray-700'>ZIP Code:</p>
									<p className='font-mono text-lg text-gray-900 bg-gray-50 p-2 rounded border'>12345</p>
								</div>
								<div className='md:col-span-2'>
									<p className='font-medium text-gray-700'>Cardholder Name:</p>
									<p className='font-mono text-lg text-gray-900 bg-gray-50 p-2 rounded border'>John Doe</p>
								</div>
							</div>
							<div className='mt-3 text-xs text-green-600'>
								<p>✅ This combination will result in a successful test payment</p>
							</div>
						</div>
					</div>

					<div className='mt-4 text-center'>
						<p className='text-xs text-yellow-600'>
							This test card information is from Stripe's official documentation and is safe for public display.
						</p>
					</div>
				</div>
		</div>
	);
};

export default ProPage;
