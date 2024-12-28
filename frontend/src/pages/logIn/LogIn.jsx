import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './LogIn.css';
import BasicSignIn from '../../components/API/signInApi';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    // if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    //   setEmailError('Please enter a valid email');
    //   return;
    // }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    // if (password.length < 7) {
    //   setPasswordError('The password must be 8 characters or longer');
    //   return;
    // }

    try {
      const response = await BasicSignIn(email, password);
      console.log('Login successful', response);
      const parsedToken = JSON.parse(response.token); // Parse the stringified token into a JavaScript object

      login({
        id: parsedToken.id,
        driverId: parsedToken.driverId,
        token: parsedToken.token,
        role: parsedToken.role
      });

      //sessionStorage.setItem('token', parsedToken.token);
      // Now you can check the role in the parsed token
      if (parsedToken.role === '[ROLE_DRIVER]') {
        navigate('/driver/home');
      } else if (parsedToken.role === '[ROLE_MANAGER]') {
        navigate('/manager/home');
      }else {
        navigate('/admin')
      }

    } catch (error) {
      console.error('Login error:', error);
      setPasswordError(error.message);
    }
  };

  const handleSignUpClick = () => {
    navigate('/');
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="titleContainer">
          <h1>Login</h1>
        </div>
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className="inputBox"
          />
          {emailError && <label className="errorLabel">{emailError}</label>}
        </div>
        <div className="inputContainer">
          <input
            type="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
          {passwordError && <label className="errorLabel">{passwordError}</label>}
        </div>
        <div className="buttonContainer">
          <input
            className="inputButton"
            type="button"
            onClick={onButtonClick}
            value="Sign in"
          />
        </div>
        <div className="signUpContainer">
          <p>
            Don&apos;t have an account?{' '}
            <button className="signUpButton" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
