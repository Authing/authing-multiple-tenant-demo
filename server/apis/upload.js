var fs = require("fs");
var Router = require("express").Router;
var authingFormDataRequest = require("../authing").authingFormDataRequest;
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const FormData = require("form-data");
var uploadRouter = Router();

uploadRouter.post("/:folder", upload.single("file"), async function (req, res) {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(req.file.path), {
    filename: req.file.originalname,
  });
  try {
    var result = await authingFormDataRequest(
      `/api/v2/upload?folder=${req.params.folder}`,
      formData,
      req.headers["authorization"]
    );
    res.statusCode = 200;
    res.json(result);
  } catch (err) {
    res.statusCode = 200;
    res.json({
      message: err.response.data,
      code: 413,
      statusCode: 413,
    });
  }
});

module.exports = uploadRouter;
