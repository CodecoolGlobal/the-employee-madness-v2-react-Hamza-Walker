/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const companyNames = require ('./companyNames.json')
const EmployeeModel = require("../db/employee.model");
const CompanyModel = require ('../db/company.model')
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];
const populateCompanies = async () => {
  await CompanyModel.deleteMany({});
  const companies = companyNames.map((name) => {
    return {
      name:name
    }
  })
  console.log(companies)
  await CompanyModel.create(companies)
  console.log("Companies created")
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const companies = await CompanyModel.find({})
  const employees = names.map((name) => {
    return {
      name: pick(names),
      level: pick(levels),
      position: pick(positions),
      company : pick(companies)._id,
    };
  });

  // console.log(employees);

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  await populateCompanies();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
