import * as express from "express";
const apiRouter = express.Router();

var unfurl = require('unfurl.js');

apiRouter.use("/v1/api/unfurl", (req, res) => {
  console.log(req.body.url);
  unfurl(req.body.url)
    .then(result => res.send(result))
    .catch(console.error);
});

export default apiRouter;
