const axios = require("axios");
require("dotenv").config();

const postRequest = (url, data = {}, headers = {}, cb) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "application/json",
      ...headers,
    },
  };

  return axios
    .post(url, data, config)
    .then((res) => {
      // console.log(`Status: ${res.status}`);
      // console.log("Body:", res.data);
      if (cb) {
        // const x = cb(res.data);
        // console.log("token", x);
        if (res.data) {
          return res.data;
        }
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  postRequest,
};
