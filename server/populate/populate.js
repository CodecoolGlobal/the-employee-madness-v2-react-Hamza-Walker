/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const SupervisorModel = require("../db/supervisor.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateSupervisors = async () => {
  await SupervisorModel.deleteMany({});
  const Supervisors = {
    name:"Donald Trump"
  };
  await SupervisorModel.create(Supervisors)
  console.log("Supervisors created");

}
const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const allSupervisors = await SupervisorModel.find({})

  const employees = names.map((name) => {
    const nameParts = name.split(" ");
    return {
      firstName: nameParts[0],
      lastName: nameParts[1],
      level: pick(levels),
      position: pick(positions),
      supervisor: pick(allSupervisors)._id,
    };
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};
const main = async () => {
  await mongoose.connect(mongoUrl);
  await populateSupervisors();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
