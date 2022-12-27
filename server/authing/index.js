require("dotenv").config();

const host = process.env["DEMO_API_ENDPOINT"];

const authingRequest = async (
  method,
  url,
  body = {},
  userPoolId = undefined,
  tenantId = undefined
) => {
  const result = await axios.request({
    method: method,
    url: `${host}${url}`,
    headers: {
      authorization: req.headers["authorization"] || "",
      "x-authing-request-from": "console",
      "x-authing-userpool-id": userPoolId || "",
      "x-authing-app-tenant-id": tenantId || "",
      "content-type": "application/json",
    },
    data: JSON.stringify(body || {}),
  });
  return JSON.parse(result.data);
};

module.exports = authingRequest;
