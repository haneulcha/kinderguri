const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => res.send("메인 페이지 입니다."));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
