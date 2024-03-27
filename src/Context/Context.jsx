import { createContext, useState } from "react";

export const TodoContext = createContext({
  isAuthenticated: false,
});

const AppWrapper = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <>
      <TodoContext.Provider
        value={{
          isAuthenticated,
          setAuthenticated,
          loading,
          setLoading,
          setUser,
          user,
        }}
      >
        {children}
      </TodoContext.Provider>
    </>
  );
};

export default AppWrapper;
