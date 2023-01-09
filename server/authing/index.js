require("dotenv").config();
const axios = require("axios");
const host = process.env["DEMO_AUTHING_API_ENDPOINT"];

const authingRequest = async (
  method,
  url,
  body = {},
  authorization = "",
  userPoolId = undefined,
  tenantId = undefined
) => {
  const result = await axios.request({
    method: method,
    url: `${host}${url}`,
    headers: {
      authorization,
      "x-authing-request-from": "console",
      "x-authing-userpool-id":
        userPoolId || process.env.DEMO_AUTHING_USERPOOL_ID || "",
      "x-authing-app-tenant-id":
        tenantId || process.env.DEMO_AUTHING_TENANT_ID || "",
      "content-type": "application/json",
    },
    data: JSON.stringify(body || {}),
  });
  return result.data;
};

module.exports = authingRequest;
