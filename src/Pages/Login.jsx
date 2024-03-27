import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TodoContext } from "../Context/Context";
import { serverUrl } from "../App";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { isAuthenticated, setAuthenticated, setLoading, loading } =
    useContext(TodoContext);
  if (isAuthenticated) return <Navigate to={"/"} />;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = login;
    try {
      const { data } = await axios.post(
        `${serverUrl}/users/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      toast.success(data.message);
      setAuthenticated(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setAuthenticated(false);
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            type="email"
            placeholder="Email"
          />
          <input
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
