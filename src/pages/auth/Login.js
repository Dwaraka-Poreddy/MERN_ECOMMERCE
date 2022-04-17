import React, { useState, useEffect } from "react";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const auth = getAuth();
  let dispatch = useDispatch();
  const [email, setEmail] = useState("dwaraka.bits@gmail.com");
  const [password, setpassword] = useState("1111111");
  const [loading, setloading] = useState(false);
  const provider = new GoogleAuthProvider();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user]);
  const handleGoogleSubmit = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message);

      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
    toast.success(`Login successfull`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setloading(false);
    }
    toast.success(`Login successfull`);
  };
  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        {" "}
        <input
          type="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          autoFocus
        />
      </div>

      <div className="form-group">
        {" "}
        <input
          type="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter your Password"
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {LoginForm()}
          <Button
            onClick={handleGoogleSubmit}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <div>
            <Link
              to="/forgot/password"
              className="text-danger "
              style={{
                display: "block",
                textAlign: "right",
                fontWeight: "600",
              }}
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
