const Student = require("../models/studentSchema");
import { Request, Response } from "express";
const bcrypt = require("bcrypt");

const studentRegister = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const existingStudent = await Student.findOne({
      rollNum: req.body.rollNum,
      school: req.body.school,
      sclassName: req.body.sclassName,
    });
    if (existingStudent) {
      res.send({ message: "Roll Nubmer already exists" });
    } else {
      const student = new Student({
        ...req.body,
        school: req.body.school,
        password: hashedPass,
      });
      let result = await student.save();

      result.password = undefined;
      console.log(result);
      res.send(result);
    }
  } catch (err) {
    res.status(501).json(err);
  }
};

const studentLogin = async (req: Request, res: Response) => {
  try {
    let student = await Student.findOne({
      rollNum: req.body.rollNum,
      name: req.body.studentName,
    });
    if (student) {
      const validate = await bcrypt.compare(
        req.body.password,
        student.password
      );
      if (validate) {
        student = await student.populate("school", "schoolName");
        student = await student.populate("sclassName", "sclassName");
        student.password = undefined;
        student.examResult = undefined;
        student.attendance = undefined;
        res.send(student);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "Student not found" });
    }
  } catch (err) {
    res.status(501).json(err);
  }
};

module.exports = { studentRegister };
