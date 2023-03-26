const { postRequest } = require("./apiRequest");
const { createUrl } = require("../constants/apiUrls");
const { writeTokenFile } = require("../helpers/writeTokenFile");
const express = require("express");
const router = express.Router();

const url = createUrl("orgs", "signin");

router.post("/", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const orgInfo = {
    email,
    password,
  };

  try {
    const data = await postRequest(url, orgInfo, {}, writeTokenFile);
    if (data) {
      //redirect to activate account
      const redirectUrl = `/signin/activate/${data.token}`;
      res.redirect(redirectUrl);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e });
  }
});

router.get("/activate/:token", async function (req, res) {
  const params = req.params;

  console.log("params:", params);

  const activateAccount = async (token) => {
    const url = createUrl("orgs", "activate");
    return await postRequest(
      url,
      {},
      { Authorization: `bearer ${token}` },
      writeTokenFile
    );
  };

  if (params) {
    try {
      const activatedToken = await activateAccount(params.token);
      if (activatedToken) {
        console.log("finished", activatedToken.token);
        res.status(200).send(activatedToken.token);
      }
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e });
    }
  }
});

module.exports = router;
