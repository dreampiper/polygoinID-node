const { postRequest } = require("./apiRequest");
const { createIssuerSchemaClaimUrl } = require("../constants/apiUrls");
const { schemaStructure } = require("../yourData");
const { parseOrgIdFromToken } = require("../helpers/parseJwt");
const express = require("express");

const router = express.Router();

router.post("/", async function (req, res) {
  const token = req.body.token;
  const createSchema = async () => {
    const orgId = parseOrgIdFromToken(token);
    const url = createIssuerSchemaClaimUrl(orgId, "createSchema");
    return await postRequest(url, schemaStructure, {
      Authorization: `bearer ${token}`,
    });
  };

  try {
    const claim = await createSchema();
    if (claim) {
      console.log("finished", claim);
      res.status(200).send(claim);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e });
  }
});

module.exports = router;


