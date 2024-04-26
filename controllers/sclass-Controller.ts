import { Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
const Sclass = require("../models/sclassSchema");

const sclassCreate = async (req: Request, res: Response) => {
  try {
    const sclass = new Sclass({
      sclassName: req.body.sclassName,
      school: req.body.adminID,
    });
    const existingSclassByName = await Sclass.findOne({
      sclassName: req.body.sclassName,
      school: req.body.adminID,
    });
    if (existingSclassByName) {
      res.send({ message: "Sorry this class name already exists" });
    } else {
      const result = await sclass.save();
      res.send(result);
    }
  } catch (err) {
    res.status(501).json(err);
  }
};

module.exports = { sclassCreate };
