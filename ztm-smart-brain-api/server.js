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

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  db.select("*")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValidPass = bcrypt.compareSync(password, data[0].hash); // true
      if (isValidPass) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((users) => res.json(users[0]))
          .catch((err) => res.status(400).json("failed extracting user data"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  db.transaction((trx) => {
    return trx
      .insert({
        email,
        hash: hash,
      })
      .into("login")
      .returning("email")
      .then((returnings) => {
        return trx("users").returning("*").insert({
          name,
          email: returnings[0].email,
          joined: new Date(),
        });
      })
      .then((users) => {
        res.json(users[0]);
      })
      .catch((err) => res.status(400).json("failed to register user"));
  });
});

app.put("/image", (req, res) => {
  const { id } = req.body;

  console.log(id)

  return db("users")
    .where("id", "=", id)
    .increment("score", 1)
    .returning("score")
    .then((score) => res.json(score[0]))
    .catch((err) => res.status(400).json("failed sending the request"));
});

app.listen(port, () => {
  console.log(`smart-brain app listening on port ${port}`);
});

// app.get("/profile/:id", (req, res) => {
//   // const user = db.users.find((user) => user.id === req.params.id);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(400).json("user does not exist");
//   }
// });
