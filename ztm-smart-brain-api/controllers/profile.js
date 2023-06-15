export const getProfile = (db) => (req, res) => {
  db("users")
    .select("*")
    .where("id", "=", req.params.id)
    .then((data) => {
      const user = data[0];
      if (user.email) {
        return res.json(user);
      }
    })
    .catch((err) => res.status(400).json("failed request"));
};
