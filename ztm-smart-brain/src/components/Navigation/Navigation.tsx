type Props = {
  changePath: (path: string) => void;
  path: string;
  signOut: () => void;
};

export const Navigation: React.FC<Props> = ({ changePath, path, signOut }) => {
  return (
    <>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        {path === "home" ? (
          <p
            onClick={signOut}
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
