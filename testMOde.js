var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
  username: String,
  text: String,  
  location: {
   type: { type: String },
   coordinates: []
  }
 });
MessageSchema.index({ location: "2dsphere" });
var Message = mongoose.model("Message", MessageSchema);
module.exports = Message;