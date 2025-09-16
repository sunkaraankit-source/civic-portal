// // // // // // // const express = require("express");
// // // // // // // const multer = require("multer");
// // // // // // // const path = require("path");
// // // // // // // const Complaint = require("../models/Complaint");

// // // // // // // const router = express.Router();

// // // // // // // // 📂 File upload setup
// // // // // // // const storage = multer.diskStorage({
// // // // // // //   destination: (req, file, cb) => {
// // // // // // //     cb(null, path.join(__dirname, "../uploads"));
// // // // // // //   },
// // // // // // //   filename: (req, file, cb) => {
// // // // // // //     cb(null, Date.now() + "-" + file.originalname);
// // // // // // //   },
// // // // // // // });
// // // // // // // const upload = multer({ storage });

// // // // // // // // 🟢 POST complaint
// // // // // // // router.post("/", upload.array("files"), async (req, res) => {
// // // // // // //   try {
// // // // // // //     const complaint = new Complaint({
// // // // // // //       title: req.body.title,
// // // // // // //       category: req.body.category,
// // // // // // //       description: req.body.description,
// // // // // // //       department: req.body.department,
// // // // // // //       locationText: req.body.locationText,
// // // // // // //       contactPhone: req.body.contactPhone,
// // // // // // //       status: req.body.status || "Pending",
// // // // // // //       files: req.files ? req.files.map((f) => f.filename) : [],
// // // // // // //     });

// // // // // // //     await complaint.save();
// // // // // // //     res.json(complaint);
// // // // // // //   } catch (err) {
// // // // // // //     console.error("❌ Complaint submission error:", err);
// // // // // // //     res.status(500).json({ error: "Failed to submit complaint" });
// // // // // // //   }
// // // // // // // });

// // // // // // // // 🔵 GET all complaints
// // // // // // // router.get("/all", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const complaints = await Complaint.find().sort({ createdAt: -1 });
// // // // // // //     res.json(complaints);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ error: "Failed to fetch complaints" });
// // // // // // //   }
// // // // // // // });

// // // // // // // // 🟡 GET single complaint by ID
// // // // // // // router.get("/:id", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const complaint = await Complaint.findById(req.params.id);
// // // // // // //     if (!complaint) return res.status(404).json({ error: "Not found" });
// // // // // // //     res.json(complaint);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ error: "Failed to fetch complaint" });
// // // // // // //   }
// // // // // // // });

// // // // // // // // 🟠 PUT update status
// // // // // // // router.put("/:id/status", async (req, res) => {
// // // // // // //   try {
// // // // // // //     const complaint = await Complaint.findByIdAndUpdate(
// // // // // // //       req.params.id,
// // // // // // //       { status: req.body.status },
// // // // // // //       { new: true }
// // // // // // //     );
// // // // // // //     res.json(complaint);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ error: "Failed to update status" });
// // // // // // //   }
// // // // // // // });

// // // // // // const express = require("express");
// // // // // // const router = express.Router();
// // // // // // const multer = require("multer");
// // // // // // const path = require("path");
// // // // // // const Complaint = require("../models/Complaint");

// // // // // // // -------------------- FILE UPLOAD SETUP --------------------
// // // // // // const storage = multer.diskStorage({
// // // // // //   destination: function (req, file, cb) {
// // // // // //     cb(null, path.join(__dirname, "../uploads"));
// // // // // //   },
// // // // // //   filename: function (req, file, cb) {
// // // // // //     cb(null, Date.now() + "-" + file.originalname);
// // // // // //   }
// // // // // // });

// // // // // // const upload = multer({ storage });

// // // // // // // -------------------- CREATE COMPLAINT --------------------
// // // // // // router.post("/", upload.array("files"), async (req, res) => {
// // // // // //   try {
// // // // // //     const { title, category, description, department, locationText, contact } = req.body;

// // // // // //     if (!title || !category || !description || !locationText) {
// // // // // //       return res.status(400).json({ success: false, error: "Missing required fields" });
// // // // // //     }

// // // // // //     const files = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

// // // // // //     const complaint = new Complaint({
// // // // // //       title,
// // // // // //       category,
// // // // // //       description,
// // // // // //       department,
// // // // // //       locationText,
// // // // // //       contact,
// // // // // //       status: "Pending",
// // // // // //       files,
// // // // // //       createdAt: new Date()
// // // // // //     });

// // // // // //     await complaint.save();
// // // // // //     res.json({ success: true, complaint });

// // // // // //   } catch (err) {
// // // // // //     console.error("Error saving complaint:", err);
// // // // // //     res.status(500).json({ success: false, error: "Failed to submit complaint" });
// // // // // //   }
// // // // // // });

// // // // // // // -------------------- GET ALL COMPLAINTS --------------------
// // // // // // router.get("/all", async (req, res) => {
// // // // // //   try {
// // // // // //     const complaints = await Complaint.find().sort({ createdAt: -1 });
// // // // // //     res.json(complaints);
// // // // // //   } catch (err) {
// // // // // //     console.error("Error fetching complaints:", err);
// // // // // //     res.status(500).json({ error: "Failed to fetch complaints" });
// // // // // //   }
// // // // // // });

// // // // // // // -------------------- UPDATE STATUS --------------------
// // // // // // router.put("/:id/status", async (req, res) => {
// // // // // //   try {
// // // // // //     const { status } = req.body;
// // // // // //     const complaint = await Complaint.findByIdAndUpdate(
// // // // // //       req.params.id,
// // // // // //       { status },
// // // // // //       { new: true }
// // // // // //     );
// // // // // //     res.json({ success: true, complaint });
// // // // // //   } catch (err) {
// // // // // //     console.error("Error updating status:", err);
// // // // // //     res.status(500).json({ error: "Failed to update status" });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;

// // // // // const express = require('express');
// // // // // const Complaint = require('../models/Complaint');
// // // // // const { geocodeLocation } = require('../utils/geocode');
// // // // // const fs = require('fs');
// // // // // const path = require('path');

// // // // // const router = express.Router();
// // // // // const fallbackFile = path.join(__dirname, '../fallback-complaints.json');

// // // // // // Ensure fallback file exists
// // // // // if (!fs.existsSync(fallbackFile)) {
// // // // //   fs.writeFileSync(fallbackFile, JSON.stringify([]));
// // // // // }

// // // // // router.post('/', async (req, res) => {
// // // // //   try {
// // // // //     console.log('Incoming complaint body:', req.body);

// // // // //     const { title, category, description, department, location, contactPhone } = req.body;

// // // // //     if (!title || !description || !location) {
// // // // //       console.warn('Validation failed:', { title, description, location });
// // // // //       return res.status(400).json({ error: 'Title, description and location are required.' });
// // // // //     }

// // // // //     let lat = null, lng = null;

// // // // //     try {
// // // // //       const geo = await geocodeLocation(location);
// // // // //       lat = geo.lat;
// // // // //       lng = geo.lng;
// // // // //     } catch (geoErr) {
// // // // //       console.error('⚠️ Geocoding failed:', geoErr.message);
// // // // //       // fallback: no coordinates
// // // // //     }

// // // // //     const complaintData = {
// // // // //       title,
// // // // //       category: category || 'general',
// // // // //       description,
// // // // //       department,
// // // // //       locationText: location,
// // // // //       lat,
// // // // //       lng,
// // // // //       contactPhone,
// // // // //       status: 'Pending',
// // // // //       createdAt: new Date(),
// // // // //     };

// // // // //     try {
// // // // //       // Try saving to Mongo
// // // // //       const newComplaint = new Complaint(complaintData);
// // // // //       const saved = await newComplaint.save();
// // // // //       console.log('✅ Complaint saved with id:', saved._id);
// // // // //       return res.status(201).json(saved);
// // // // //     } catch (dbErr) {
// // // // //       console.error('❌ MongoDB save failed. Saving to fallback file:', dbErr.message);

// // // // //       // Save to fallback JSON
// // // // //       const fallbackComplaints = JSON.parse(fs.readFileSync(fallbackFile, 'utf8'));
// // // // //       fallbackComplaints.push(complaintData);
// // // // //       fs.writeFileSync(fallbackFile, JSON.stringify(fallbackComplaints, null, 2));

// // // // //       return res.status(201).json(complaintData);
// // // // //     }
// // // // //   } catch (err) {
// // // // //     console.error('❌ Error in complaint route:', err.message, err.stack);
// // // // //     return res.status(500).json({ error: err.message || 'Failed to create complaint' });
// // // // //   }
// // // // // });

// // // // // router.get('/', async (req, res) => {
// // // // //   try {
// // // // //     let complaints = [];
// // // // //     try {
// // // // //       complaints = await Complaint.find().sort({ createdAt: -1 });
// // // // //     } catch (dbErr) {
// // // // //       console.warn('⚠️ Mongo not available, loading from fallback file');
// // // // //       complaints = JSON.parse(fs.readFileSync(fallbackFile, 'utf8'));
// // // // //     }
// // // // //     return res.json(complaints);
// // // // //   } catch (err) {
// // // // //     console.error('❌ Error fetching complaints:', err.message);
// // // // //     return res.status(500).json({ error: 'Failed to fetch complaints' });
// // // // //   }
// // // // // });

// // // // // module.exports = router;

// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const Complaint = require("../models/Complaint");

// // // // // Get all complaints
// // // // router.get("/", async (req, res) => {
// // // //   try {
// // // //     const complaints = await Complaint.find().sort({ createdAt: -1 });
// // // //     res.json(complaints);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });

// // // // // Create complaint
// // // // router.post("/", async (req, res) => {
// // // //   try {
// // // //     const complaint = new Complaint(req.body);
// // // //     await complaint.save();
// // // //     res.json(complaint);
// // // //   } catch (err) {
// // // //     res.status(400).json({ error: err.message });
// // // //   }
// // // // });

// // // // // Update complaint status
// // // // router.put("/:id/status", async (req, res) => {
// // // //   try {
// // // //     const { status } = req.body;
// // // //     const updated = await Complaint.findByIdAndUpdate(
// // // //       req.params.id,
// // // //       { status },
// // // //       { new: true }
// // // //     );
// // // //     res.json(updated);
// // // //   } catch (err) {
// // // //     res.status(400).json({ error: err.message });
// // // //   }
// // // // });

// // // // module.exports = router;

// // // const express = require("express");
// // // const router = express.Router();
// // // const Complaint = require("../models/Complaint");

// // // // Create a new complaint
// // // router.post("/", async (req, res) => {
// // //   try {
// // //     const { title, category, description, department, locationText, contactPhone } = req.body;

// // //     const newComplaint = new Complaint({
// // //       title,
// // //       category,
// // //       description,
// // //       department,
// // //       locationText,
// // //       contactPhone,
// // //       status: "Pending", // Default status
// // //     });

// // //     await newComplaint.save();
// // //     res.json(newComplaint);
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // // Get all complaints
// // // router.get("/", async (req, res) => {
// // //   try {
// // //     const complaints = await Complaint.find().sort({ createdAt: -1 });
// // //     res.json(complaints);
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// // const Complaint = require("../models/Complaint");

// // // Create complaint
// // router.post("/", async (req, res) => {
// //   try {
// //     const complaint = new Complaint(req.body);
// //     await complaint.save();
// //     res.json(complaint);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Get all complaints
// // router.get("/", async (req, res) => {
// //   try {
// //     const complaints = await Complaint.find().sort({ createdAt: -1 });
// //     res.json(complaints);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Update complaint status
// // router.put("/:id/status", async (req, res) => {
// //   try {
// //     const { status } = req.body;
// //     if (!["Pending", "In Progress", "Resolved"].includes(status)) {
// //       return res.status(400).json({ error: "Invalid status" });
// //     }

// //     const updated = await Complaint.findByIdAndUpdate(
// //       req.params.id,
// //       { status },
// //       { new: true }
// //     );

// //     res.json(updated);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Complaint = require("../models/Complaint");
// const { geocodeLocation } = require('../utils/geocode');
//  const fs = require('fs');
//  const path = require('path');

// // ✅ Get all complaints
// router.get("/all", async (req, res) => {
//   try {
//     const complaints = await Complaint.find().sort({ createdAt: -1 });
//     res.json(complaints);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Create complaint
// router.post("/", async (req, res) => {
//   try {
//     const { title, category, description, department, locationText, contactPhone } = req.body;

//     const complaint = new Complaint({
//       title,
//       category,
//       description,
//       department,
//       locationText,
//       contactPhone,
//       status: "Pending", // default
//     });

//     await complaint.save();
//     res.status(201).json(complaint);
//   } catch (err) {
//     console.error("Error creating complaint:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Update complaint status
// router.put("/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updated = await Complaint.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ message: "Complaint not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Delete complaint
// // Delete complaint only if Resolved
// router.delete("/:id", async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id);
//     if (!complaint) return res.status(404).json({ error: "Complaint not found" });

//     if (complaint.status !== "Resolved") {
//       return res.status(400).json({ error: "Only resolved complaints can be deleted" });
//     }

//     await complaint.deleteOne();
//     res.json({ message: "Complaint deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete complaint" });
//   }
// });

// // router.delete("/:id", async (req, res) => {
// //   try {
// //     const deleted = await Complaint.findByIdAndDelete(req.params.id);
// //     if (!deleted) {
// //       return res.status(404).json({ message: "Complaint not found" });
// //     }
// //     res.json({ message: "Complaint deleted successfully" });
// //   } catch (err) {
// //     console.error("Error deleting complaint:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// module.exports = router;
// backend/routes/complaints.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Basic helper to geocode a human address using Nominatim (OpenStreetMap)
async function geocodeLocation(text) {
  if (!text) return null;
  try {
    const q = encodeURIComponent(text);
    const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`;
    // Nominatim politely requires a user-agent; include one
    const res = await fetch(url, { headers: { 'User-Agent': 'Civic-Portal/1.0 (contact@example.com)' } });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
  } catch (err) {
    console.error('Geocode error:', err);
  }
  return null;
}

// GET all complaints (also support /all for older frontend calls)
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});
router.get('/all', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// POST create complaint (geocode locationText -> lat,lng if possible)
router.post('/', async (req, res) => {
  try {
    const { title, category, description, department,priority, locationText, contactPhone } = req.body;

    // optional: attempt to geocode the provided locationText
    let lat, lng;
    const geo = await geocodeLocation(locationText);
    if (geo) {
      lat = geo.lat;
      lng = geo.lng;
    }

    const complaint = new Complaint({
      title,
      category: category || 'general',
      description,
      department,
      priority,
      locationText,
      contactPhone,
      lat,
      lng,
      status: 'Pending'
    });

    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    console.error('Create complaint error:', err);
    res.status(500).json({ error: 'Failed to create complaint' });
  }
});

// PUT update status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const updated = await Complaint.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Complaint not found' });
    res.json(updated);
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// DELETE complaint (only allow deletion if it's Resolved)
router.delete('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });

    if (complaint.status !== 'Resolved') {
      return res.status(400).json({ error: 'Only resolved complaints can be deleted' });
    }

    await complaint.deleteOne();
    res.json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    console.error('Delete complaint error:', err);
    res.status(500).json({ error: 'Failed to delete complaint' });
  }
});

module.exports = router;
