const { postRequest } = require("./apiRequest");
const { createIssuerSchemaClaimUrl } = require("../constants/apiUrls");
const { claimOffer } = require("../yourData");
const { parseOrgIdFromToken } = require("../helpers/parseJwt");
const { offerQrCode } = require("./offerQrCode");
const express = require("express");

const router = express.Router();

router.post("/", async function (req, res) {
  const token = req.body.token;

  const createClaim = async () => {
    const orgId = parseOrgIdFromToken(token);
    const url = createIssuerSchemaClaimUrl(
      orgId,
      "createSchema",
      claimOffer.schemaId
    );
    return await postRequest(
      url,
      claimOffer.claimPayload,
      {
        Authorization: `bearer ${token}`,
      },
      ({ id }) => offerQrCode(id)
    );
  };
  try {
    const claim = await createClaim();
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
