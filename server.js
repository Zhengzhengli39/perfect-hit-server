const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let leaderboard = [];

/* 提交分数 */
app.post("/submit", (req, res) => {
  const { score } = req.body;
  if (typeof score !== "number") {
    return res.status(400).send("Invalid score");
  }

  leaderboard.push({
    score,
    time: Date.now()
  });

  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);

  res.send({ success: true });
});

/* 获取排行榜 */
app.get("/leaderboard", (req, res) => {
  res.send(leaderboard);
});

app.listen(3000, () => {
  console.log("Leaderboard server running on http://localhost:3000");
});
