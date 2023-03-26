const { postRequest } = require("./apiRequest");
const { createUrl } = require("../constants/apiUrls");
const { writeTokenFile } = require("../helpers/writeTokenFile");
const express = require("express");
const router = express.Router();

router.post("/", async function (req, res) {
  const token = req.body.token;
  const display = req.body.display;
  const legal = req.body.legal;

  const createIssuer = async (token) => {
    const url = createUrl("issuer");
    return await postRequest(
      url,
      {
        displayName: display,
        legalName: legal,
        region: "USA",
      },
      { Authorization: `bearer ${token}` },
      writeTokenFile
    );
  };

  try {
    const issuerInfo = await createIssuer(token);
    if (issuerInfo) {
      console.log("finished", issuerInfo);
      res.status(200).send(issuerInfo);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e });
  }
});

module.exports = router;
