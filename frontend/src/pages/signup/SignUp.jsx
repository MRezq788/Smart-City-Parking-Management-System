  import { useState } from "react";
  import { FaEye, FaEyeSlash } from "react-icons/fa";
  import "./SignUp.css";
  import { useNavigate } from 'react-router-dom';
  

  function SignUp() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isVisible_1, setIsVisible_1] = useState(false);
    const [isVisible_2, setIsVisible_2] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("ROLE_DRIVER");
    const [plateNumber, setPlateNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const navigate = useNavigate();

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

    function handleFullNameChange(event) {
      const val = event.target.value;
      setFullName(val);
      const messageContainer_3 = document.getElementById("messageContainer-3");
      if (val.length > 80) {
        messageContainer_3.textContent =
          "The full name can't be more than 80 characters";
        setIsVisible_1(true);
      } else if (val.length === 0) {
        messageContainer_3.textContent = "The full name can't be empty";
        setIsVisible_1(true);
      } else {
        messageContainer_3.textContent = "";
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

    function handlePlateNumberChange(event) {
      const val = event.target.value;
      setPlateNumber(val);
      const messageContainer_4 = document.getElementById("messageContainer-4");
      if (val.length > 80) {
        messageContainer_4.textContent =
          "The plate number can't be more than 80 characters";
        setIsVisible_1(true);
      } else if (val.length === 0) {
        messageContainer_4.textContent = "The plate number can't be empty";
        setIsVisible_1(true);
      } else {
        messageContainer_4.textContent = "";
        setIsVisible_1(false);
      }
    }

    function handlePaymentMethodChange(event) {
      setPaymentMethod(event.target.value);
    }

    const Register = async (event) => {
      event.preventDefault();
      let accountData = {
        username: username,
        password: password,
        fullName: fullName,
        role: role
      };
  
      try {
        let response;
        if (role === "ROLE_DRIVER") {
          accountData = {
            username: username,
            password: password,
            fullName: fullName,
            role: role,
            plateNumber: plateNumber,
            paymentMethod: paymentMethod
          };

          response = await fetch("http://localhost:8080/drivers/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(accountData),
          });

          if (response.ok) {
            alert("Registration successful!");
          } else if (response.status === 409) {
            alert("Username or Plate Number is already used.")
          }
        }
        else {
          response = await fetch("http://localhost:8080/signup/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(accountData),
          });
    
          if (response.ok) {
            alert("Registration successful!");
          } else if (response.status === 409) {
            
            alert("Username is already used.")
          }
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Error during registration. Please try again.");
      }
    };
    function loginNavigate(){
      navigate('/signin');
    }

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
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              placeholder="Enter your full name"
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={handleFullNameChange}
              required
            />
            <div
              id="messageContainer-3"
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
                  value="ROLE_ADMIN"
                  checked={role === "ROLE_ADMIN"}
                  onChange={handleRoleChange}
                />
                <label htmlFor="admin">Admin</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="lotManager"
                  name="role"
                  value="ROLE_MANAGER"
                  checked={role === "ROLE_MANAGER"}
                  onChange={handleRoleChange}
                />
                <label htmlFor="lotManager">Lot Manager</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="driver"
                  name="role"
                  value="ROLE_DRIVER"
                  checked={role === "ROLE_DRIVER"}
                  onChange={handleRoleChange}
                />
                <label htmlFor="driver">Driver</label>
              </div>
            </div>
          </div>
          {role === "ROLE_DRIVER" && (
            <>
              <div className="group">
                <label className="form-label">Plate Number</label>
                <input
                  className="form-input"
                  placeholder="Enter your plate number"
                  type="text"
                  id="plateNumber"
                  name="plateNumber"
                  value={plateNumber}
                  onChange={handlePlateNumberChange}
                  required
                />
                <div
                  id="messageContainer-4"
                  className={isVisible_1 ? "visible" : "hidden"}
                ></div>
              </div>
              <div className="group">
                <label className="form-label">Payment Method</label>
                <div className="radio-group">
                  <div>
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="cash">Cash</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="visa"
                      name="paymentMethod"
                      value="visa"
                      checked={paymentMethod === "visa"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="visa">Visa</label>
                  </div>
                </div>
              </div>
            </>
          )}
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
        <button className="form-button" onClick={loginNavigate}>
            log in 
        </button>
        
      </div>
    );
  }

  export default SignUp;
