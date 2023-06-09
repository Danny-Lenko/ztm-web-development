import { useState, useEffect } from "react";
import {
  Navigation,
  Logo,
  InputForm,
  Rank,
  FaceRecognition,
  SignIn,
  Register,
} from "./components";
import ParticlesBg from "particles-bg";
import "./App.css";

const PAT = "4449b2845cd94e64b8b1c7e75f2df75f";
const USER_ID = "devdanny";
const APP_ID = "my-first-application";
const MODEL_ID = "face-detection";

export type FaceCoords = {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [buttonIsActive, setButtonIsActive] = useState(false);
  const [faceBox, setFaceBox] = useState<FaceCoords | null>(null);
  const [path, setPath] = useState("signin");

  const changePath = (path: string) => {
    setPath(path);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setInputValue(target.value);
  };

  const handleSubmit = () => {
    console.log("submitted");
    fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => calculateFaceLocation(result))
      .catch((error) => console.log("error", error));
  };

  const calculateFaceLocation = (data: any) => {
    const clarifaiCoords =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const faceCoords = {
      leftCol: clarifaiCoords.left_col * imageWidth,
      topRow: clarifaiCoords.top_row * imageHeight,
      rightCol: imageWidth - clarifaiCoords.right_col * imageWidth,
      bottomRow: imageHeight - clarifaiCoords.bottom_row * imageHeight,
    };

    setFaceBox(faceCoords);
  };

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: inputValue,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  const getImage = (image: HTMLImageElement) => {
    const width = image.clientWidth;
    const height = image.clientHeight;

    if (width && height) {
      setImageWidth(width);
      setImageHeight(height);
    } else {
      setImageWidth(0);
      setImageHeight(0);
    }
  };

  useEffect(() => {
    if (imageWidth && imageHeight) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [imageWidth, imageHeight]);

  return (
    <div className="app">
      <ParticlesBg type="cobweb" bg={true} num={200} color={"#ffffff"} />
      <Navigation changePath={changePath} path={path} />
      {path === "signin" ? (
        <SignIn changePath={changePath} />
      ) : path === "register" ? (
        <Register changePath={changePath} />
      ) : (
        <>
          <Logo />
          <Rank name={"Valerii"} entries={"#1"} />
          <InputForm
            onInputChange={handleInputChange}
            onButtonSubmit={handleSubmit}
            buttonIsActive={buttonIsActive}
          />
          <FaceRecognition
            imageUrl={inputValue}
            getImage={getImage}
            box={faceBox}
          />
        </>
      )}
    </div>
  );
}

export default App;
