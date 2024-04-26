const router = require("express").Router();

const { adminRegister } = require("../controllers/admin-Controller");
const { studentRegister } = require("../controllers/student-Controller");
const { sclassCreate } = require("../controllers/sclass-Controller");
//Admin

router.post("/AdminReg", adminRegister);
router.post("/StudentReg", studentRegister);
router.post("/ClassCre", sclassCreate);

module.exports = router;
