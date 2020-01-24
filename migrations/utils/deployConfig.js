module.exports = artifacts => ({
  ammFunding: process.env.REACT_APP_AMMFUNDING || "1" + "0".repeat(18),
  oracle:
    process.env.REACT_APP_ORACLE || artifacts.require("Migrations").defaults()["from"]
});
