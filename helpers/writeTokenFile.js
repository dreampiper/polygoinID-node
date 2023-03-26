const fs = require("fs");

const tokenJsFileContent = (token) => `const token="${token}"; 

module.exports = {
    token,
};`;

const writeTokenFile = async (data) => {
  const token = data.token;
  console.log(token);
  return token;
};

module.exports = {
  writeTokenFile,
};
