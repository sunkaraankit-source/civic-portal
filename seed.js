require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Complaint = require('./models/Complaint');

async function run(){
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Complaint.deleteMany({});
  const adminPass = await bcrypt.hash('AdminPass123', 10);
  const admin = await new User({ name: 'Admin User', email: 'admin@local', password: adminPass, role: 'admin' }).save();
  const userPass = await bcrypt.hash('UserPass123', 10);
  const user = await new User({ name: 'Test User', email: 'user@local', password: userPass }).save();
  await new Complaint({
    title: 'Pothole on MG Road',
    category: 'Roads',
    description: 'Large pothole near the market.',
    locationText: 'MG Road, Bengaluru',
    locationCoords: { lat: 12.9721, lng: 77.5937 },
    createdBy: user._id
  }).save();
  console.log('Seed complete. Admin:', admin.email, 'User:', user.email);
  process.exit(0);
}
run().catch(e=>{console.error(e); process.exit(1);});
