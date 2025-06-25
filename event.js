const express = require("express")
const app = express()
const cors = require("cors")
const fs = require("fs")
const path = require('path'); 


const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());

app.use(cors(corsOptions))


const { initializeDatabase } = require("./db/db.connect")

const Event = require("./model/event.model")

initializeDatabase()

const eventsPath = path.join(__dirname, 'events.json');
console.log("Reading events from:", eventsPath);
const eventsData = fs.readFileSync(eventsPath, 'utf-8');



function  seedEventsData(){
    try{
      for (const eventData of eventsData){
          const newEvent = new Event ({
               title: eventData.title,
               type:eventData.type, 
               date:eventData.date,
               startTime: eventData.startTime,
               endTime: eventData.endTime,
               price: eventData.price,
               location: eventData.location, 
               meetingLink: eventData.meetingLink,
               description: eventData.description,
                speakers: eventData.speakers, 
               dressCode: eventData.dressCode,
               ageRestriction: eventData.ageRestriction,
                tags: eventData.tags,
                image: eventData.image
              })

    // console.log(newEvent.title)
        newEvent.save()
      }  
    }catch (error){
        console.log("error seeding data", error)
    }
}

seedEventsData()

async function CreateNewEvent(newEvent){
    try{
      const event = new Event(newEvent)
      const saveEvent = await event.save()
      return saveEvent
    }catch (error){
        throw error
    }
}

app.post("/events", async (req, res) => {
  try {
    const saved = await CreateNewEvent(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error });
  }
});

async function readAllEvents(){
    try{
        const allEvents = await Event.find()
        return allEvents
    } catch(error){
        console.log(error)
    }
}

app.get("/events", async (req,res) => {
    try{
        const events = await readAllEvents()
        if(events){
            res.json(events)
        } else {
            res.status(404).json({error: "No events found."})
        }
    } catch (error){
        res.status(500).json({error: "Failed to fetch events."})
    }
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})



