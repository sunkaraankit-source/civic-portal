const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req,res)=>{
  try{
    const {name,email,password} = req.body;
    if(!name||!email||!password) return res.status(400).json({message:'Missing fields'});
    if(await User.findOne({email})) return res.status(400).json({message:'User exists'});
    const hash = await bcrypt.hash(password,10);
    const u = new User({name,email,password:hash});
    await u.save();
    res.json({message:'Registered'});
  }catch(err){ res.status(500).json({message:'Server error'}); }
});

router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const u = await User.findOne({email});
    if(!u) return res.status(400).json({message:'Invalid credentials'});
    const ok = await bcrypt.compare(password,u.password);
    if(!ok) return res.status(400).json({message:'Invalid credentials'});
    const token = jwt.sign({id:u._id, role:u.role, name:u.name, email:u.email}, process.env.JWT_SECRET, {expiresIn:'12h'});
    res.json({token, user:{id:u._id,name:u.name,email:u.email,role:u.role}});
  }catch(err){ res.status(500).json({message:'Server error'}); }
});

module.exports = router;
