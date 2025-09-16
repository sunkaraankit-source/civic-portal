const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const header = req.header('authorization') || req.header('Authorization');
  if(!header) return res.status(401).json({message:'No token'});
  const token = header.split(' ')[1];
  if(!token) return res.status(401).json({message:'No token'});
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  }catch(err){
    res.status(401).json({message:'Token invalid'});
  }
};
