export const image = (db) => (req, res) => {
  const { id } = req.body;

  return db("users")
    .where("id", "=", id)
    .increment("score", 1)
    .returning("score")
    .then((score) => res.json(score[0]))
    .catch((err) => res.status(400).json("failed sending the request"));
};
