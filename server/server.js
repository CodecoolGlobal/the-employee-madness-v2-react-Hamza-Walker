require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const WorkLogModel = require("./db/workLog.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" }).populate("workLog");
  console.log(employees);
  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id).populate("workLog");
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});
app.patch("/api/workLog/update/:id", async (req, res, next) => {
  try {
    const workLog = await WorkLogModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );

    const employee = await EmployeeModel.findById(req.params.id).populate("workLog");
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id/workLog", async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const { task, hours } = req.body;

    // Create a new work log document
    const workLog = await WorkLogModel.create({ task, hours });

    // Find the employee by ID and populate the "workLog" field
    const employee = await EmployeeModel.findById(employeeId).populate("workLog");
    employee.workLog = [...employee.workLog, workLog];

    // Save the updated employee document
    await employee.save();

    // Return the updated employee document as the response
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});



app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});


const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
