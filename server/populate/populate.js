/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const tasks = require("./workLog.js");
const EmployeeModel = require("../db/employee.model");
const WorkLogModel = require("../db/workLog.model");
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];
const populateWorkLog = async () => {
  await WorkLogModel.deleteMany({})
  const workLogDocument = tasks.map( tas => {
    return {
      task : tas.task,
      time : tas.duration
    }
  })
  console.log(workLogDocument);
  await WorkLogModel.create(...workLogDocument)
  console.log("WorkLog created");
}
const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const workLog = await WorkLogModel.find({});
  const employees = names.map((name) => {
    return {
      name: pick(names),
      level: pick(levels),
      position: pick(positions),
      workLog: [pick(workLog)._id],
    };
  });

  console.log(employees);

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  await populateWorkLog();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
