const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 6001;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi.ey2veef.mongodb.net/foodi?retryWrites=true&w=majority&appName=foodi`
  )
  .then(console.log("Mongodb connected successfully"))
  .catch((error) => console.log("Error connecting to mongodb", error));

//jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });

  res.send({ token });
});

// middleware for verify jwt token

// import routes

const menuRouts = require("./API/Routs/menuRouts");
const cartRoutes = require("./API/Routs/cartRoutes");
const userRoutes = require("./API/Routs/userRoutes");
const paymentRoutes = require("./API/Routs/paymentRoutes")

app.use("/menu", menuRouts);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes)
// stripe payment routes

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("Hello Foodi client server");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
