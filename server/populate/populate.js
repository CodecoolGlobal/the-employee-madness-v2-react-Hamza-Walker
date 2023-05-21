/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const LevelModel = require("../db/level.model");
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateLevels = async () => {
  await LevelModel.deleteMany({})

  const levelDocuments = levels.map((level , index) => {
    return {
      name: level,
      order: index + 1,
    }
  })
  console.log(levelDocuments)
  await LevelModel.create(...levelDocuments)
  console.log("Levels created");
}
const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const levels = await LevelModel.find({})
  const employees = names.map((name) => {
    return {
      name: pick(names),
      position: pick(positions),
      level: pick(levels)._id,
    };
  });

  console.log(employees);

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  await populateLevels();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
