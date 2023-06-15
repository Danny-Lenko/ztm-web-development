import { useState, useEffect } from "react";
import ParticlesBg from "particles-bg";

import {
  Navigation,
  Logo,
  InputForm,
  Rank,
  FaceRecognition,
  SignIn,
  Register,
} from "./components";

import "./App.css";
import axios from "axios";

export type FaceCoords = {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  score: string;
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [buttonIsActive, setButtonIsActive] = useState(false);
  const [faceBox, setFaceBox] = useState<FaceCoords | null>(null);
  const [path, setPath] = useState("signin");
  const [user, setUser] = useState<User>();

  const changePath = (path: string) => {
    setPath(path);
  };

  const signOut = () => {
    setInputValue("");
    changePath("signin");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setInputValue(target.value);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/detect", { url: inputValue })
      .then((res) => calculateFaceLocation(res.data))
      .catch(console.log);

    axios
      .put("http://localhost:8080/image", { id: user?.id })
      .then((res) => setUser({ ...user!, score: res.data.score }))
      .catch(console.log);
  };

  const calculateFaceLocation = (data: any) => {
    const clarifaiCoords = data.data.regions[0].region_info.bounding_box;

    const faceCoords = {
      leftCol: clarifaiCoords.left_col * imageWidth,
      topRow: clarifaiCoords.top_row * imageHeight,
      rightCol: imageWidth - clarifaiCoords.right_col * imageWidth,
      bottomRow: imageHeight - clarifaiCoords.bottom_row * imageHeight,
    };

    setFaceBox(faceCoords);
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
      <Navigation changePath={changePath} path={path} signOut={signOut} />
      {path === "signin" ? (
        <SignIn setUser={setUser} changePath={changePath} />
      ) : path === "register" ? (
        <Register setUser={setUser} changePath={changePath} />
      ) : (
        <>
          <Logo />
          {user && <Rank name={user.name} entries={user.score} />}
          <InputForm
            value={inputValue}
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
