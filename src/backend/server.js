/* I declare that the lab work here submitted is original 
except for source material explicitly acknowledged,
and that the same or closely related material has not been 
previously submitted for another course.
I also acknowledge that I am aware of University policy and 
regulations on honesty in academic work, and of the disciplinary 
guidelines and procedures applicable to breaches of such
policy and regulations, as contained in the website.

University Guideline on Academic Honesty: 
https://www.cuhk.edu.hk/policy/academichonesty/

Student Name : Liu Man Yin
Student ID : 1155159567
Student Name : Li Tsz Kin 
Student ID: 1155158177 
Student Name : Cheung Mei Yi 
Student ID : 1155159106 
Student Name : Ho Yun Kit 
Student ID : 1155158328 
Student Name : AU Yeuk Lai Rickie 
Student ID : 1155143101

Class/Section : CSCI2720
Date : 10/12/2023 */

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const moment = require("moment-timezone");
const hkTimeZone = "Asia/Hong_Kong";

const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect("mongodb://127.0.0.1:27017/Project"); // database link here

const db = mongoose.connection;
// Upon connection failure
db.on("error", console.error.bind(console, "Connection error:"));
// Upon opening the database successfully
db.once("open", function () {
  console.log("Connection is open...");

  // Schema and Model - Event, Location
  const eventSchema = mongoose.Schema({
    eventId: {
      type: Number,
      required: [true, "EventId is required"],
      unique: [true, "EventId must be unique"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    loc: { type: Schema.Types.ObjectId, ref: "Location" },
    startDateTime: {
      type: Date,
      required: [true, "StartDateTime is required"],
    },
    endDateTime: {
      type: Date,
      required: [true, "EndDateTime is required"],
    },
    recurringPattern: {
      type: String,
      default: "", // Optional
    },
    description: {
      type: String,
      default: "", // Optional, set a default empty string if description is not provided
    },
    presenter: {
      type: String,
      required: [true, "Presenter is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
  });

  const locationSchema = mongoose.Schema({
    locId: {
      type: Number,
      required: [true, "locId is required"],
      unique: [true, "locId is unique"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: [true, "latitude and longitude coordinates are required"],
      },
    },
  });

  const commentSchema = mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  });

  const userAccountSchema = mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    favoriteLocations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
  });

  const Event = mongoose.model("Event", eventSchema);
  const Location = mongoose.model("Location", locationSchema);
  const User = mongoose.model("User", userSchema);
  const Comment = mongoose.model("Comment", commentSchema);
  const UserAccount = mongoose.model("UserAccount", userAccountSchema);
  /*
  // Create a new User document
  let newUser = new User({
    username: "monty_python",
    password: "password1234",
    isAdmin: false,
  });

  // Save the new user to the database
  newUser
    .save()
    .then(() => {
      console.log("A new user created:", newUser);
    })
    .catch((error) => {
      console.log("Failed to save user:", error);
    });

  // Create a new Comment document
  let newComment = new Comment({
    user: newUser._id, // ObjectId of the associated user
    location: "6579de61fda3eeec704b2325", // ObjectId of the associated location
    content: "This place is lovely!",
  });

  // Save the new comment to the database
  newComment
    .save()
    .then(() => {
      console.log("A new comment created:", newComment);
    })
    .catch((error) => {
      console.log("Failed to save comment:", error);
    });

  // Create a new UserAccount document
  let newUserAccount = new UserAccount({
    user: newUser._id, // ObjectId of the associated user
    favoriteLocations: ["6579de61fda3eeec704b2325"], // Array of ObjectId of favorite locations
  });

  // Save the new user account to the database
  newUserAccount
    .save()
    .then(() => {
      console.log("A new user account created:", newUserAccount);
    })
    .catch((error) => {
      console.log("Failed to save user account:", error);
    });

  // Create a new Location document
  let newLocation = new Location({
    locId: 87110120,
    name: "Kwai Tsing Theatre (Lecture Room)",
    coordinates: {
      type: "Point",
      coordinates: [22.35665, 114.12623],
    },
  });

  // Saving this new loaction to database
  newLocation
    .save()
    .then(() => {
      console.log("A new location created:", newLocation);
    })
    .catch((error) => {
      console.log("failed to save location:", error);
    });

  // Create a new Location document
  let twoLocation = new Location({
    locId: 7744,
    name: "Yuen Chau Kok Public Library",
    coordinates: {
      type: "Point",
      coordinates: [22.37957, 114.20452],
    },
  });

  // Create a new Event document
  let newEvent = new Event({
    eventId: 155799,
    title: "Adventure Harmonica Band 18th Anniversary Concert",
    loc: "6579e4227d5c9f57d8b7dcd3", // Assign the location document's object id
    startDateTime: new Date(
      moment.tz("2024-01-21T19:30:00", hkTimeZone).toDate()
    ),
    endDateTime: new Date(
      moment.tz("2024-01-21T21:15:00", hkTimeZone).toDate()
    ),
    recurringPattern: "",
    description: "Only for age 4 or above",
    presenter: "Adventure Harmonica Music Centre",
    price: "$150",
  });

  // Saving this new event to database
  newEvent
    .save()
    .then(() => {
      console.log("A new event created:", newEvent);
    })
    .catch((error) => {
      console.log("Failed to save event:", error);
    });
*/
  // Fetch all locations (GET)
  app.get("/lo", async (req, res) => {
    try {
      // Retrieve all locations from the database
      const locations = await Location.find();

      // Prepare the location table data
      const locationTableData = locations.map((location) => ({
        name: location.name,
        link: `/lo/${location._id}`,
        eventCount: location.locId, // Placeholder for event count, to be updated later
      }));

      // Send the location table data as the response
      res.json(locationTableData);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  app.post("/keywords", async (req, res) => {
    const keywords = req.body.search;
    console.log(keywords);
    try {
      // Retrieve all locations from the database
      const locations = await Location.find();

      // Prepare the location table data
      const locationTableData = locations.map((location) => ({
        name: location.name,
        link: `/lo/${location._id}`,
        eventCount: "0", // Placeholder for event count, to be updated later
      }));

      // Send the location table data as the response
      res.json(locationTableData);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  // handle ALL requests with Hello World
  //   app.all("/*", (req, res) => {
  //     res.send("Hello World!");
  //   });
});

const server = app.listen(3000);
