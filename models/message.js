const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, required: true },
  content: { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

MessageSchema.virtual("url").get(function () {
  return `/messages/${this._id}`;
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
