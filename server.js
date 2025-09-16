// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');

// const authRoutes = require('./routes/auth');
// const complaintsRoutes = require('./routes/complaints');
// const newsRoutes = require('./routes/news');

// const app = express();
// app.use(cors({ origin: 'http://localhost:3000' }));   
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use('/api/auth', authRoutes);
// app.use('/api/complaints', complaintsRoutes);
// app.use('/api/news', newsRoutes);

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI).then(()=> {
//   console.log('Mongo connected');
//   app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
// }).catch(err => console.error('Mongo connection error', err));

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require('./routes/auth');

const complaintsRoutes = require("./routes/complaints");
const newsRoutes = require('./routes/news');

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/complaints", complaintsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error("Message:", err.message);

    if (err.message.includes("auth")) {
      console.error("👉 Authentication failed. Check your username/password in MONGO_URI.");
    } else if (err.message.includes("ENOTFOUND")) {
      console.error("👉 Could not reach MongoDB Atlas. Check your internet or cluster address.");
    } else if (err.message.includes("ECONNREFUSED")) {
      console.error("👉 Connection refused. Make sure Atlas is running and IP whitelist is set.");
    } else {
      console.error(err);
    }

    process.exit(1); // Stop app if DB fails
  });

// Example route
app.get("/", (req, res) => {
  res.send("✅ Civic Portal Backend Running");
});

  // .then(() => {
  //   console.log("MongoDB connected");
  //   app.listen(PORT,  () => {
  //     console.log(`Server running on ${PORT}');
  //     });
  // })
  // .catch((err) => console.error(err));
