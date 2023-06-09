type Props = {
  changePath: (path: string) => void;
  path: string;
};

export const Navigation: React.FC<Props> = ({ changePath, path }) => {
  return (
    <>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        {path === "home" ? (
          <p
            onClick={() => changePath("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        ) : (
          <>
            <p
              onClick={() => changePath("signin")}
              className="f3 link dim black underline pa3 pointer"
            >
              Sign In
            </p>
            <p
              onClick={() => changePath("register")}
              className="f3 link dim black underline pa3 pointer"
            >
              Register
            </p>
          </>
        )}
      </nav>
    </>
  );
};
