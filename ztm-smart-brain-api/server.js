import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const port = 8080;

const db = {
  users: [
    {
      id: "111",
      name: "John",
      email: "john@gmail.com",
      password: "john",
      score: 0,
      joined: new Date(),
    },
    {
      id: "112",
      name: "Jack",
      email: "jack@gmail.com",
      password: "jack",
      score: 0,
      joined: new Date(),
    },
  ],
};

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.filter(
    (user) => email === user.email && password === user.password
  )[0];

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

  db.users.push({
    id: setId(db.users),
    name: name,
    email: email,
    password: password,
    score: 0,
    joined: new Date(),
  });

  res.json(db.users);
});

app.get("/profile/:id", (req, res) => {
  const user = db.users.find((user) => user.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(400).json("user does not exist");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  const user = db.users.find((user) => user.id === id);

  if (user) {
    db.users = db.users.map((user) =>
      user.id === id ? { ...user, score: user.score + 1 } : user
    );
    res.json(db.users.find((user) => user.id === id));
  } else {
    res.status(400).json("user not found");
  }
});

app.listen(port, () => {
  console.log(`smart-brain app listening on port ${port}`);
});

function setId(arr) {
  const lastId = arr[arr.length - 1].id;
  return +lastId + 1 + "";
}
