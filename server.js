const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
// const catRouter = require("./routes/cat-router");
// const cors = require("cors"); // Import the cors package
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

const uri = process.env.MONGODB_URI;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
// const uri =
//   "mongodb+srv://netsanet:urgessa@catcluster.twra24t.mongodb.net/?retryWrites=true&w=majority&appName=CatCluster";
// const clientOptions = {
//   serverApi: { version: "1", strict: true, deprecationErrors: true },
// }
mongoose.connect(uri);

db = mongoose.connection;

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

app.use(express.json());

//define routes
app.get("/greeting", (req, res) => {
  res.send("Hello from your backend API");
});

app.get(`/users`, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
