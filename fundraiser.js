const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mainRouter = require("./routes/main.route");
const paymentRouter = require("./routes/payment.route");

const port = Number(process.env.PORT) || 7800;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.set("case sensitive routing", true);
app.set("view engine", "ejs");

app.use("/", mainRouter);
app.use("/pay", paymentRouter);

app.get("/api", (req, res) => {
    res.send(`Stripe Server started at port: ${port} at ${new Date()}`);
});

app.listen(port, () => {
    console.log(`Stripe Server started at port: ${port}`);
});
