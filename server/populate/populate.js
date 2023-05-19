/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const mongoUrl = process.env.MONGO_URL;
const NoteModel = require("../db/notes.model");
const notes = require("./notes.json");
const titles = require("./titles.json");
if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateNotes = async () => {
  await NoteModel.deleteMany({});
  const note = names.map((name) => {
    return {
      title: pick(titles),
      content: pick(notes),
    };
  });
  console.log(note);
  await NoteModel.create(...note);
  console.log("Notes created");
};

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const allNotes = await NoteModel.find({})
  const employees = names.map((name) => {
    return {
      name: pick(names),
      level: pick(levels),
      position: pick(positions),
      notes: [pick(allNotes)._id],

    };
  });

  // console.log(employees);

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  await populateNotes()
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
