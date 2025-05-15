const router = require('express').Router();

const { authenticate } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdminMiddleware");

const registerPerson = require("../controllers/person/register");
const getPerson = require("../controllers/person/get");
const getAllPeople = require("../controllers/person/getAll");
const updatePerson = require("../controllers/person/update");
const deletePerson = require("../controllers/person/delete");

router.use(authenticate);

router.post("/register", isAdmin, registerPerson);
router.get("/get/:id", getPerson);
router.get("/getAll", getAllPeople);
router.put("/update/:id", isAdmin, updatePerson);
router.delete("/delete/:id", isAdmin, deletePerson);

module.exports = router;