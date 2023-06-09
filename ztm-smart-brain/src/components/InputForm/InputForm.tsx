import "./InputForm.css";

type Props = {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonSubmit: () => void;
  buttonIsActive: boolean;
};

export const InputForm: React.FC<Props> = ({
  onInputChange,
  onButtonSubmit,
  buttonIsActive,
}) => {
  console.log(buttonIsActive)

  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="tex"
            placeholder="Enter your name"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple submit-btn"
            onClick={onButtonSubmit}
            disabled={!buttonIsActive}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
