export const signIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("wrong login info");
  }

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
};
