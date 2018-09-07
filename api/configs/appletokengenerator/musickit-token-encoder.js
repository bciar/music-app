"use strict";

const fs  = require('fs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('./api/configs/appletokengenerator/AuthKey.p8').toString();

const teamId     = 'FXMJ3T377R';
const keyId      = '6658GA2Y4K';

const jwtToken = jwt.sign({}, privateKey, {
  algorithm: 'ES256',
  expiresIn: '180d',
  issuer: teamId,
  header: {
    alg: 'ES256',
    kid: keyId
  }
});

module.exports = jwtToken;