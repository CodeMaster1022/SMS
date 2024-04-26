const Admin = require("../models/adminSchema");
import { Request, Response } from "express";

const adminRegister = async (req: Request, res: Response) => {
  try {
    const admin = new Admin({
      ...req.body,
    });

    const existingAdmin = await Admin.findOne({ email: req.body.email });
    const existingSchool = await Admin.findOne({ school: req.body.school });

    if (existingAdmin) {
      res.send({ message: "Email Already exists" });
    } else if (existingSchool) {
      res.send({ message: "school already exists" });
    } else {
      let result = await admin.save();
      result.password = undefined;
      res.send(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const adminLogin = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let admin = await Admin.findOne({
      email: req.body.email,
    });
    if (admin) {
      if (req.body.password === admin.password) {
        admin.password = undefined;
        res.send(admin);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  } else {
    res.send({ message: "Email and password are required" });
  }
};

const getAdminDetail = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      let admin = await Admin.findOne({ id: req.params.id });
      if (admin) {
        admin.password = undefined;
        res.send(admin);
      } else {
        res.send({ message: "User not found" });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { adminRegister, adminLogin, getAdminDetail };
