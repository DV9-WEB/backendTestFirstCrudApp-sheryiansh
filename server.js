const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const userRoute = require("./routes/userRoutes.js");
const adminRoute = require("./routes/adminRoutes.js");

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use("/api/auth", userRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log("Server is Running");
});
