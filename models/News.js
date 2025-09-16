const mongoose = require('mongoose');
const NewsSchema = new mongoose.Schema({
  title:String,
  link:String,
  pubDate:Date,
  source:String,
  contentSnippet:String
},{timestamps:true});
module.exports = mongoose.models.News || mongoose.model('News', NewsSchema);
