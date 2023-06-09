import { useRef } from "react";
import { FaceCoords } from "../../App";
import "./FaceRecognition.css";

type Props = {
  imageUrl: string;
  getImage: (image: HTMLImageElement) => void;
  box: FaceCoords | null;
};

export const FaceRecognition: React.FC<Props> = ({
  imageUrl,
  getImage,
  box,
}) => {
  const ref = useRef<HTMLImageElement>(null);

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          onLoad={() => getImage(ref.current!)}
          onError={() => {
            getImage(ref.current!);
          }}
          ref={ref}
          id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
        />
        {box && (
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};
