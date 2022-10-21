const express = require("express");
const app = express();
const routes = require("./router");
app.use(express.json());

app.use("/", routes);
app.listen(3000, (req, res) => {
  console.log("3000번 포트로 열렸습니다");
});
