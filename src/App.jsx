import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import "./styles/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { TodoContext } from "./Context/Context";

export const serverUrl =
  "https://node-js-todo-app-backend-only.onrender.com/api/v1";

function App() {
  const { setUser, setAuthenticated, setLoading } = useContext(TodoContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${serverUrl}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        setUser(null);
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
