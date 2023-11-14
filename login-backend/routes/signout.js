const router = require("express").Router();
const express = require("express");
const getTokenFromHeader = require("../auth/getTokenFromHeader");
const Token = require("../schema/token");
// const { jsonResponse } = require("../lib/jsonResponse");

router.delete("/", async function (req, res, next) {
  try {
    const refreshToken = getTokenFromHeader(req.headers);
    await Token.findOneAndDelete({ token: refreshToken });
    res.json({ success: 'Token removed' });
  } catch (error) {
    console.error('Error deleting token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

module.exports = router; 