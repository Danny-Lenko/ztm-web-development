import { useState } from "react";
import axios from "axios";

type Props = {
  changePath: (path: string) => void;
};

export const Register: React.FC<Props> = ({ changePath }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    switch (target.name) {
      case "email-address":
        setEmail(target.value);
        break;

      case "name":
        setName(target.value);
        break;

      default:
        setPassword(target.value);
        break;
    }
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        changePath("home");
      })
      .catch(console.log);
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={handleChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={handleSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  );
};
