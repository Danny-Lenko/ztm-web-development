import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    // port : 3306,
    user: "postgres",
    password: "ewq321",
    database: "smart-brain",
  },
});

db.select("*").from("users").then(console.log);

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  // const user = db.users.filter(
  //   (user) => email === user.email && password === user.password
  // )[0];

  if (user) {
    // console.log(
    //   "true:",
    //   bcrypt.compareSync(
    //     "ann",
    //     "$2b$10$NtWH8mhMYQOpSIi3IEFtm.ex/nZcyQhoH30c0gvSD8lF/FtQwn8je"
    //   )
    // ); // true
    // console.log(
    //   "false:",
    //   bcrypt.compareSync(
    //     "apple",
    //     "$2b$10$NtWH8mhMYQOpSIi3IEFtm.ex/nZcyQhoH30c0gvSD8lF/FtQwn8je"
    //   ) // false
    // );
    const { id, name, email, score, joined } = user;
    const userSecure = {
      id,
      name,
      email,
      score,
      joined,
    };
    res.json(userSecure);
  } else {
    res.status(400).json("wrong email or password");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // const saltRounds = 10;
  // const hash = bcrypt.hashSync(password, saltRounds);
  // console.log(hash);

  db("users")
    .returning("*")
    .insert({
      name,
      email,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json("failed to register user"));
});

app.get("/profile/:id", (req, res) => {
  // const user = db.users.find((user) => user.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(400).json("user does not exist");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("score", 1)
    .returning("score")
    .then((score) => res.json(score[0]))
    .catch((err) => res.status(400).json("failed to sending the request"));
});

app.listen(port, () => {
  console.log(`smart-brain app listening on port ${port}`);
});

function setId(arr) {
  const lastId = arr[arr.length - 1].id;
  return +lastId + 1 + "";
}
