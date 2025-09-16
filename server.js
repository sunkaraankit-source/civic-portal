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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error(err));
