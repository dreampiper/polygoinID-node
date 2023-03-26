// const orgInfo = require("../constants/orgInfo");
const { postRequest } = require("./apiRequest");
const { createUrl } = require("../constants/apiUrls");
const express = require("express");

const router = express.Router();
const url = createUrl("orgs", "create");

router.post("/", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const orgInfo = {
    email,
    password,
  };

  try {
    const data = await postRequest(url, orgInfo);
    if (data) {
      res.status(200).send(data);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e });
  }
});

module.exports = router;
