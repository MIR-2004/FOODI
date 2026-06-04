// Polyfill for Node v26+ compatibility to fix legacy SlowBuffer removal in dependencies
import nodeBuffer from "buffer";
if (!nodeBuffer.SlowBuffer) {
  nodeBuffer.SlowBuffer = class SlowBuffer {
    equal() {}
  };
}

// Dynamically import dependencies at runtime to bypass ESM static hoisting
const express = (await import("express")).default;
const cors = (await import("cors")).default;
const mongoose = (await import("mongoose")).default;
const jwt = (await import("jsonwebtoken")).default;
const dotenv = (await import("dotenv")).default;
const Stripe = (await import("stripe")).default;

// Import routes
const menuRouts = (await import("./API/Routs/menuRouts.js")).default;
const cartRoutes = (await import("./API/Routs/cartRoutes.js")).default;
const userRoutes = (await import("./API/Routs/userRoutes.js")).default;
const paymentRoutes = (await import("./API/Routs/paymentRoutes.js")).default;

dotenv.config();

const app = express();
const port = process.env.PORT || 6001;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//middleware
app.use(cors());
app.use(express.json());

const dbURI = process.env.DB_USER && process.env.DB_PASSWORD
  ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wn2uoz6.mongodb.net/?appName=Cluster0`
  : "mongodb://127.0.0.1:27017/foodi";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("Failed to connect to primary MongoDB Atlas, attempting local fallback...", error.message);
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/foodi");
      console.log("Fallback: Connected to local MongoDB successfully");
    } catch (fallbackError) {
      console.log("Error connecting to local fallback MongoDB", fallbackError.message);
    }
  }
};

connectDB();

//jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });

  res.send({ token });
});

app.use("/menu", menuRouts);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);

// stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = Math.round(price * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello Foodi client server");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
