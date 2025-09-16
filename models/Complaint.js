// // // // const mongoose = require("mongoose");

// // // // const complaintSchema = new mongoose.Schema(
// // // //   {
// // // //     title: { type: String, required: true },
// // // //     category: { type: String, required: true },
// // // //     description: String,
// // // //     department: String,
// // // //     locationText: String,
// // // //     contactPhone: String,
// // // //     status: { type: String, default: "Pending" }, // Pending | In Progress | Resolved
// // // //     files: [String],
// // // //   },
// // // //   { timestamps: true }
// // // // );

// // // // module.exports = mongoose.model("Complaint", complaintSchema);
// // // const mongoose = require("mongoose");

// // // const ComplaintSchema = new mongoose.Schema({
// // //   title: { type: String, required: true },
// // //   category: { type: String, required: true },
// // //   description: { type: String, required: true },
// // //   department: { type: String },
// // //   locationText: { type: String, required: true },
// // //   contact: { type: String },
// // //   files: [{ type: String }],
// // //   status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
// // //   createdAt: { type: Date, default: Date.now }
// // // });

// // // module.exports = mongoose.model("Complaint", ComplaintSchema);

// // const mongoose = require("mongoose");

// // const ComplaintSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     category: { type: String, required: true },
// //     description: String,
// //     department: String,
// //     locationText: String,
// //     latitude: Number,
// //     longitude: Number,
// //     contactPhone: String,
// //     status: {
// //       type: String,
// //       enum: ["Pending", "In Progress", "Resolved"],
// //       default: "Pending",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Complaint", ComplaintSchema);
// const mongoose = require("mongoose");

// const ComplaintSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     category: String,
//     description: String,
//     department: String,
//     locationText: String,
//     contactPhone: String,
//     status: {
//       type: String,
//       enum: ["Pending", "In Progress", "Resolved"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Complaint", ComplaintSchema);
// backend/models/Complaint.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'general' },
  description: { type: String, default: '' },
  department: { type: String, default: '' },
  priority: {type: String, default:''},
  locationText: { type: String, default: '' }, // human readable location
  lat: { type: Number }, // optional geocoded latitude
  lng: { type: Number }, // optional geocoded longitude
  contactPhone: { type: String, default: '' },
  
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
