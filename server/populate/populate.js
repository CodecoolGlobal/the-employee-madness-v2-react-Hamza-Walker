/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const nameshobbie = require("./nameshobbie.json");
const descriptionhobbie = require("./descriptionhobbie.json");
const EmployeeModel = require("../db/employee.model");
const HobbieModel = require("../db/hobbie.model");


const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  const allHobbies = await HobbieModel.find(); // this to get all hobbies frrom the database

  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => {
    const nameParts = name.split(" ");
    const randomHobby = pick(allHobbies); // this to get a random hobby from the array
    return {
      firstName: nameParts[0],
      lastName: nameParts[1],
      level: pick(levels),
      position: pick(positions),
      hobbies: [randomHobby._id],     // this to get the id of the random hobby .id if you just wand the id .description etc if you want the description
    };
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateHobbies = async () => {
  await HobbieModel.deleteMany({});

  const hobbies = nameshobbie.map((name, index) => {
    return {
      name: name,
      description: descriptionhobbie[index],
    };
  });

  await HobbieModel.create(...hobbies);
  console.log("Hobbies created");
};



const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();
  await populateHobbies(); //// change here 
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
