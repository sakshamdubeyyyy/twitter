const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./config/db'); // Sequelize instance
require('dotenv').config();
const cors = require("cors");

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
// Middleware
app.use(session({
  secret: 'khkhkhk',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/post", require('./routes/postRoutes'));
app.use("/api/v1/comment", require('./routes/commentRoutes'));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/like", require("./routes/postLikeRoutes"));

// Start server
app.listen(process.env.PORT, async () => {
  try {
    await db.authenticate(); // ✅ Correct Sequelize connection check
    console.log("Database connected.");

    await db.sync({ alter: true }); 

    console.log(`Server is running on PORT: ${process.env.PORT}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
});
