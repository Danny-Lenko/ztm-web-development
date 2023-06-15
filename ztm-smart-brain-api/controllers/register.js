export const register = (db, bcrypt) => (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  if (!name || !email || !password) {
    return res.status(400).json('wrong register info')
  }

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
};
