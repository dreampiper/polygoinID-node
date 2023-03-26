import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to polygon-osap node");
});

export default router;
