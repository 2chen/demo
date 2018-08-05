import * as express from "express";
const apiRouter = express.Router();

var unfurl = require('unfurl.js');

apiRouter.use("/api/unfurl", (req, res) => {
  unfurl(req.body.url)
    .then(result => res.send(result))
    .catch(console.error);
});

export default apiRouter;
