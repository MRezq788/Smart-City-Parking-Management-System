import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUp.css";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isVisible_1, setIsVisible_1] = useState(false);
  const [isVisible_2, setIsVisible_2] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Driver");

  function switchVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function handleUsernameChange(event) {
    const val = event.target.value;
    setUsername(val);
    const messageContainer_1 = document.getElementById("messageContainer-1");
    if (val.length > 80) {
      messageContainer_1.textContent =
        "The username can't be more than 80 characters";
      setIsVisible_1(true);
    } else if (val.length === 0) {
      messageContainer_1.textContent = "The username can't be empty";
      setIsVisible_1(true);
    } else {
      messageContainer_1.textContent = "";
      setIsVisible_1(false);
    }
  }

  function handlePasswordChange(event) {
    const val = event.target.value;
    setPassword(val);
    const messageContainer_2 = document.getElementById("messageContainer-2");
    if (val.length > 80) {
      messageContainer_2.textContent =
        "The password can't be more than 80 characters";
      setIsVisible_2(true);
    } else if (val.length === 0) {
      messageContainer_2.textContent = "The password can't be empty";
      setIsVisible_2(true);
    } else if (val.length < 8) {
      messageContainer_2.textContent = "The password can't be less that 8 characters";
      setIsVisible_2(true);
    } else {
      messageContainer_2.textContent = "";
      setIsVisible_2(false);
    }
  }

  function handleRoleChange(event) {
    setRole(event.target.value);
  }

  const Register = async (event) => {
  };

  return (
    <div className="page">
      <form className="form-new" onSubmit={Register}>
        <h2 className="form-header">Client Sign Up</h2>
        <div className="group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            placeholder="Enter your username"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <div
            id="messageContainer-1"
            className={isVisible_1 ? "visible" : "hidden"}
          ></div>
        </div>
        <div className="group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div className="form-password-container">
            <input
              className="form-input"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              pattern=".{8,}"
              required
            />
            <span className="eye-icon" onClick={switchVisibility}>
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div
            id="messageContainer-2"
            className={isVisible_2 ? "visible" : "hidden"}
          ></div>
        </div>
        <div className="group">
          <label className="form-label">Role</label>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                id="admin"
                name="role"
                value="Admin"
                checked={role === "Admin"}
                onChange={handleRoleChange}
              />
              <label htmlFor="admin">Admin</label>
            </div>
            <div>
              <input
                type="radio"
                id="lotManager"
                name="role"
                value="Lot Manager"
                checked={role === "Lot Manager"}
                onChange={handleRoleChange}
              />
              <label htmlFor="lotManager">Lot Manager</label>
            </div>
            <div>
              <input
                type="radio"
                id="driver"
                name="role"
                value="Driver"
                checked={role === "Driver"}
                onChange={handleRoleChange}
              />
              <label htmlFor="driver">Driver</label>
            </div>
          </div>
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
