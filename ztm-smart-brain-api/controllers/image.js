const PAT = "4449b2845cd94e64b8b1c7e75f2df75f";
const USER_ID = "devdanny";
const APP_ID = "my-first-application";
const MODEL_ID = "face-detection";

import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";
const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);

// detectFace
export const detectFace = () => (req, res) => {
  const { url } = req.body;

  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      model_id: MODEL_ID,
      inputs: [{ data: { image: { url: url, allow_duplicate_url: true } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        throw new Error(err);
      }

      if (response.status.code !== 10000) {
        throw new Error(
          "Post model outputs failed, status: " + response.status.description
        );
      }

      const output = response.outputs[0];
      res.json(output);
    }
  );
};

// incrementScore
export const incrementScore = (db) => (req, res) => {
  const { id } = req.body;

  return db("users")
    .where("id", "=", id)
    .increment("score", 1)
    .returning("score")
    .then((score) => res.json(score[0]))
    .catch((err) => res.status(400).json("failed sending the request"));
};
