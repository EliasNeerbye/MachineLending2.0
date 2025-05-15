const router = require('express').Router();

const { authenticate } = require("../middleware/authMiddleware");

const lendMachine = require("../controllers/lending/lend");
const finishLending = require("../controllers/lending/finishLending");
const updateLendingStatus = require("../controllers/lending/updateStatus");
const getAllLendings = require("../controllers/lending/getAll");

router.use(authenticate);

router.post("/lend", lendMachine);

router.put("/finish/:id", finishLending);

router.put("/status/:id", updateLendingStatus);

router.get("/", getAllLendings);

module.exports = router;