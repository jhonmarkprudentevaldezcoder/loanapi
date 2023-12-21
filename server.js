const express = require("express");
const mongoose = require("mongoose");
const Users = require("./models/userModel");
const Loans = require("./models/loanModel");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//default route
app.get("/", (req, res) => {
  res.send("API WORKING SUCCESS");
});

//register
app.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the email is already taken
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already taken." });
    }

    // If the email is not taken, create the user
    const user = await Users.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/loan", async (req, res) => {
  try {
    const themes = await Loans.find({});
    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//searchloan
app.get("/loan/user", async (req, res) => {
  try {
    const { email } = req.body;
    const loan = await Loans.find({ email });

    if (loan.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//add loan
app.post("/loan", async (req, res) => {
  const { username } = req.body;
  try {
    // Check if the email is already taken
    const existingUser = await Loans.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Email already taken." });
    }

    // If the email is not taken, create the user
    const user = await Loans.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  });
//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Set the token as a cookie (optional)
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    // Respond with the token as a Bearer token
    res.status(200).json({
      message: "Login successful",
      userID: user._id,
      userStatus: user.userStatus,
      userName: user.username,
      userEmail:user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://akosijaycee:Eyeshield232045@cluster0.rb77oza.mongodb.net/loanDB"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
