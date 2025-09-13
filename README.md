<div align="center" id="toc">
  <ul style="list-style: none">
    <summary>
      <h1>MasterClass</h1>
    </summary>
  </ul>
</div>

<div align="center">

[![Built With](https://img.shields.io/badge/Built_with-Next.js_App_Router-blue)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Auth](https://img.shields.io/badge/Auth-Clerk-blue)](https://clerk.com/)
[![Database](https://img.shields.io/badge/Database-Convex-blue)](https://convex.dev)
[![Emails](https://img.shields.io/badge/Emails-Resend-blue)](https://resend.com/)
[![Rate Limiting](https://img.shields.io/badge/Rate_Limiting-Upstash-blue)](https://upstash.com/)
[![Payments](https://img.shields.io/badge/Payments-Stripe-blue)](https://stripe.com/)

[![Version](https://img.shields.io/badge/version-10.0.0-blue.svg)](https://github.com/Isaiahpeoples/MasterClass)
[![Maintenance](https://img.shields.io/badge/Maintained-yes-brightgreen.svg)](https://github.com/Isaiahpeoples/MasterClass/graphs/commit-activity)
[![Live](https://img.shields.io/badge/Live-Demo-brightgreen)](https://master-class.fun/)

</div>
<br/>

## 🛍️ Project Overview
This project is a **full-stack course platform** showcasing how to integrate **Stripe Payments** with **Next.js App Router**. 
This e-commerce application can serve as a **boilerplate** for quickly integrating one-time payments, subscriptions, and billing portals.

<br/>

## 🚀 Technologies Used
| Technology         | Description |
|--------------------|-------------|
| **Next.js App Router** | ⚡ React framework for server-side rendering and full-stack apps. |
| **React 18**       | ⚛️ UI library for interactive components. |
| **Tailwind CSS + CDN** | 🎨 Utility-first styling for responsive design. |
| **Shadcn UI**      | 🧩 Accessible, prebuilt UI components. |
| **Clerk**          | 🔐 Authentication and user management. |
| **Convex**         | ⚡ Real-time backend and database. |
| **Stripe**         | 💳 Handles payments, subscriptions, and billing portals. |
| **Resend**         | 📧 Transactional email service (welcome, purchase, subscription confirmations). |
| **Upstash**        | 🚦 Rate limiting to prevent abuse and malicious requests. |

<br/>

## 📸 Project Screenshot
<div align="center">
<img src="https://online-project-images.s3.us-east-2.amazonaws.com/masterclass/masterclass-1.png"  height="95%" width="95%" alt="MasterClass Logo"/>
</div>

*A full-stack course platform with payments, subscriptions, and billing management.*

<br/>

## 📑 Key Features
- 💳 **One-Time Payments** — Sell courses securely via Stripe Checkout.  
- 📅 **Subscriptions** — Pro plan with monthly and yearly billing.  
- 🧾 **Billing Portal** — Customers can update payment methods, cancel plans, or view invoices.  
- 📧 **Email Automation** — Welcome, purchase, and subscription emails via Resend.  
- 🚦 **Rate Limiting** — Secure APIs against abuse with Upstash.  
- 🔐 **Authentication** — Clerk login, profile management, and secure sessions.  
- 📱 **Responsive UI** — Tailored for mobile, tablet, and desktop users.  

<br/>

## 🔧 Installation & Setup 🔧
1. **Clone the repository**:
```bash
git clone https://github.com/USERNAME/MasterClass.git
cd MasterClass
```

2. **Install dependencies**:
```bash
npm install
```

3. **Environment variables: Configure the .env file with the following keys**:

```js
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Resend (Emails)
RESEND_API_KEY=

# Upstash (Rate Limiting)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

4. **Start the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

<br/>

## 📂 Project Structure 📂

- **/app: Next.js App Router routes and API handlers**

- **/components: Reusable UI and form components**

- **/lib: Utility functions (Stripe, email, auth helpers)**

- **/convex: Convex functions for database logic**

- **/public: Static assets and images**

<br/>

## 📌 Learn More 📌

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Resend Documentation](https://resend.com/docs)
- [Upstash Documentation](https://upstash.com/docs)

<br/>

## 🌐 Live Demo

Check out the live version:  
👉 [MasterClass Live Demo](https://master-class.fun/)

<br/>

### ⭐️ Support ⭐️
If you found this project helpful or interesting, please give it a ⭐️! Your support helps to grow the project and boosts visibility. Thank you!
