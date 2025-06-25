const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
  type: String, 
  date: Date,
  startTime: String,
  endTime: String,
  price: Number,
  location: String, // For offline events
  meetingLink: String, // For online events
  description: String,
  speakers: [
    {
      name: String,
      role: String,
      image: String
    }
  ],
  dressCode: String,
  ageRestriction: String,
  tags: [String],
  image: String 
}, { timestamps: true }
)

const Event = mongoose.model("Events", eventSchema)

module.exports = Event

