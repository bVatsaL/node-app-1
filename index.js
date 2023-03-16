const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const PORT = process.env.PORT || 3001;

const prismaticWebhookTrigger = 'https://hooks.prismatic.io/trigger/SW5zdGFuY2VGbG93Q29uZmlnOjdlMGIzZDM4LWFkMzAtNDcwZC05M2M2LWEyM2VhNWY4NDNiZA==';

const app = express();
app.use(bodyParser.json({
  extended: true,
}));

app.use(cors());

let items = [];

app.get("/api", (req, res) => {
  res.json({items});
});

app.post("/api", (req, res) => {
  const body = req.body;
  if (!items.includes(body.item)) {
    items.push(body.item);
    axios.post(prismaticWebhookTrigger, {
      item: body.item,
    }).then((result) => console.log(result)).catch((err) => console.log(err));
    res.json({data: `${body.item} is created!`});
  } else {
    res.json({data: `${body.item} is already exist!`});
  }
});

app.delete("/api/clear", (req, res) => {
  items = [];
  res.json({data: items});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
