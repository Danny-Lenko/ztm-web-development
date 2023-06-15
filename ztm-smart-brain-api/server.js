import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import knex from "knex";

import { register } from "./controllers/register.js";
import { signIn } from "./controllers/signin.js";
import { image } from "./controllers/image.js";
import { getProfile } from "./controllers/profile.js";

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

app.get("/profile/:id", getProfile(db));

app.post("/signin", signIn(db, bcrypt));
app.post("/register", register(db, bcrypt));

app.put("/image", image(db));

app.listen(port, () => {
  console.log(`smart-brain app listening on port ${port}`);
});

