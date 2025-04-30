import { useState } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("token")
  );

  return (
    <div className="app">
      {isLoggedIn ? (
        <Profile onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
