import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
import { TodoContext } from "../Context/Context";
import TodoComp from "../Components/TodoComp";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { setLoading, loading, isAuthenticated } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Task Updated");
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${serverUrl}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${serverUrl}/task/new`,
        {
          title: title,
          description: desc,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDesc("");
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.err(err.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${serverUrl}/task/my`, {
        withCredentials: true,
      })
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => console.log(err));
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks?.map((task) => (
          <TodoComp
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            key={task._id}
            task={task}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
