import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../App";
import { TodoContext } from "../Context/Context";

const Register = () => {
  const { isAuthenticated, setAuthenticated, setLoading, loading } =
    useContext(TodoContext);
  const [sign, setSign] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = sign;
    try {
      const { data } = await axios.post(
        `${serverUrl}/users/new`,
        {
          name: name,
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
      toast.error("something isn't right!!");
      setAuthenticated(false);
      setLoading(false);
    }
  };
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={sign.name}
            onChange={(e) => setSign({ ...sign, name: e.target.value })}
            type="text"
            placeholder="Name"
          />
          <input
            value={sign.email}
            onChange={(e) => setSign({ ...sign, email: e.target.value })}
            type="email"
            placeholder="Email"
          />
          <input
            value={sign.password}
            onChange={(e) => setSign({ ...sign, password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <button disabled={loading} type="submit">
            Sign Up
          </button>
          <h4>Or</h4>
          <Link to="/login">Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
