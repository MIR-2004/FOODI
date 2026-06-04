# infood — Fine Dining & Restaurant Management Platform

**infood** (formerly *Foodi*) is a premium, full-stack gourmet restaurant application and merchant management platform designed with modern glassmorphic aesthetics. Built using the MERN stack (MongoDB, Express, React, Node.js), it integrates secure Firebase Authentication, Stripe Payment processing, and a robust administrative control panel for handling menus, users, and orders.

---

## 🌟 Key Features

### 🍽️ Gourmet Client Experience
- **Interactive Menu Catalog**: View, filter, and search gourmet selections with real-time updates.
- **Cart Management**: Seamless shopping cart workflows powered by custom React Hooks and database synchronization.
- **Secure Stripe Checkout**: Complete end-to-end checkout with Stripe client-secret authorization.
- **Order Tracking**: Keep track of pending, processing, and completed order states.
- **Personalized Profiles**: Editable user settings, booking/order histories, and avatars.

### 👑 Admin Control Console
- **Dashboard Overview**: Access analytics showing overall performance metrics.
- **Menu Management**: Add, update, or remove menu items complete with image urls, pricing, and category tagging.
- **User Administration**: View registered users, track accounts, and manage administrative privileges.
- **Order Pipeline**: Monitor transactions, payment confirmations, and order completion processes.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Vite-powered for Fast HMR)
- **Styling**: Tailwind CSS & DaisyUI (featuring a custom dark/glassmorphic design system)
- **State Management & Fetching**: TanStack React Query (`@tanstack/react-query`) & Axios
- **Authentication**: Firebase Client SDK
- **Payment Processing**: Stripe React SDK (`@stripe/react-stripe-js`)
- **Routing**: React Router DOM v6
- **Animations & Assets**: Lucide Icons, React Slick Carousel, SweetAlert2, React Toastify

### Backend
- **Framework**: Express & Node.js
- **Database ORM**: Mongoose & MongoDB (with local database fallback compatibility)
- **Authentication Security**: JSON Web Tokens (JWT) for secure API endpoints
- **Integrations**: Stripe Node SDK for secure PaymentIntent creation

---

## 📁 Project Directory Structure

```text
FOODI/
├── Backend/                # Express & Node.js API Service
│   ├── API/
│   │   ├── Models/         # Mongoose Schemas (Cart, Menu, Payment, User)
│   │   ├── Routs/          # Express Routes
│   │   └── Middleware/     # JWT Verification & Security Middlewares
│   ├── index.js            # Backend Entry Point
│   ├── package.json
│   └── .env.example
│
└── Frontend/               # React & Vite client app
    ├── public/             # Static Assets (favicon, icons, recipes)
    ├── src/
    │   ├── Components/     # Reusable components (Navbar, Profile, Modals, Login/Signup)
    │   ├── Context/        # AuthContext providing Firebase auth state
    │   ├── Hooks/          # Custom hooks (useCart, useAuth, useAdmin, etc.)
    │   ├── Layout/         # Multi-layout architectures (MainLayout, DashboardLayout)
    │   ├── pages/          # Main route components (Home, Shop/Menu, Dashboard, Order)
    │   ├── Router/         # React Router configurations
    │   ├── App.jsx         # App component setup
    │   └── main.jsx        # Client Entry point
    ├── package.json
    └── .env.example
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- **Node.js** (v18.x or higher recommended)
- **MongoDB** (running locally or a MongoDB Atlas connection string)
- **Firebase Project** (with Email/Password and Google sign-in enabled)
- **Stripe Account** (for developer API testing keys)

### 1. Clone & Set Up the Backend

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` (or configure these variables):
   ```env
   PORT=6001
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_signing_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Start the development server (uses `nodemon`):
   ```bash
   npm run dev
   ```

### 2. Set Up the Frontend

1. Navigate to the `Frontend` directory:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` or `.env.development` file:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_BACKEND_URL=http://localhost:6001
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```
4. Start the Vite client application:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Building for Production

To build the frontend project for production deployment:
```bash
cd Frontend
npm run build
```
The compiled static assets will be located in the `Frontend/dist` folder.
