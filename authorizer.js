const jwt = require('jsonwebtoken');
const jwk = require('jwk-to-pem');
const key = {
    "kid": "c59a51fd-9990-493d-b892-8d0a059037cd",
    "kty": "RSA",
    "n": "v23EzuyHkJX95ayexpsCrUufn5IBJ3HiR81ShYvfYlWJWRAX_bdWwhCKyCxTJwQ-g7-Z5yn-csfZCAlshTH33NHXvLvFTZeId4NDky4z5Ncy7GNMpSNuB5gSbHnAyzqJnJyvBHL5maI_nv1CJY8LYhixJnrPutt_8iyZ8CKech5aXFtL0GvPG_XK9EKwXXCjF66kUnCPkVhzuP39dP5jGa4Y6fCkFHmUmNZtcdxqiFpciLgFUfBlwpdeesCRPS_BDXw2Yb5D6FrP45-DkKFoa-1jZqVqgjWtcZ5HkXUkglWo34jDOmBaAV-mZLAYSdJVZOwZDazRopxTKORNkxnKgQ",
    "e": "AQAB"
};

/** 
 * decodes payload using isin web token and jwk to pem
 * @param {string} headerVal - usually req.headers.authorization
 * @returns - json object with decoded payload
 */

function getPayload(headerVal) {
    let payload = null;
    payload = jwt.verify(headerVal.replace("Bearer ", ""), jwk(key));
    return payload;
}

module.exports.getPayload = getPayload;

function test () {
}

module.exports.test = test;