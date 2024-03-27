import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TodoContext } from "../Context/Context";
import axios from "axios";
import { serverUrl } from "../App";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setAuthenticated, setLoading, loading } =
    useContext(TodoContext);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${serverUrl}/users/logout`, {
        withCredentials: true,
      });
      toast.success("logged out successfully!");
      setAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error("something wen't wrong!");
      setAuthenticated(true);
      setLoading(false);
    }
  };
  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={handleLogout} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
