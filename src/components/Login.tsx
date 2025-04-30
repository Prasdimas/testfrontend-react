import { useState } from "react";
import { loginUser } from "../utils/Api";
import { AxiosError } from "axios";
export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  type ErrorResponse = {
    message: string;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      sessionStorage.setItem("token", res.data.data.token);
      alert(res.data.message);
      onLogin();
    }  catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const message =
        error.response?.data?.message || "Login Gagal. Silakan coba lagi.";
      alert(message);
      // console.error("Login error:", error);
    }
    
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
    
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required minLength={8}
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "👁️" : "🔑"}
        </span>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
