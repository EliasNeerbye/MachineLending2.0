const router = require('express').Router();

const { authenticate } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdminMiddleware");

const registerMachine = require("../controllers/machine/register");
const getMachine = require("../controllers/machine/get");
const getAllMachines = require("../controllers/machine/getAll");
const updateMachine = require("../controllers/machine/update");
const deleteMachine = require("../controllers/machine/delete");

router.use(authenticate);

router.post("/register", isAdmin, registerMachine);
router.get("/get/:id", getMachine);
router.get("/getAll", getAllMachines);
router.put("/update/:id", isAdmin, updateMachine);
router.delete("/delete/:id", isAdmin, deleteMachine);

module.exports = router;