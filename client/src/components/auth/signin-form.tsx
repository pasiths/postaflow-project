import { useState } from "react";
import { useDispatch } from "react-redux";
import { InputWithLabel } from "../atoms/InputWithLabel";
import { Button } from "../ui/button";
import { loginApi } from "@/api/auth";
import { signin } from "@/features/auth/authSlice";

const SignInForm = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setLoading(true);

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    try {
      interface LoginResponse {
        user: {
          role: string;
        };
      }

      const res = (await loginApi(username, password)) as LoginResponse;
      dispatch(signin(res.user));
      if (res.user.role === "POSTALCLERK") {
        console.log("this logged postal clerk", res);
      }
      if (res.user.role === "MAIL_DELIVERER") {
        console.log("this logged mail deliverer");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <InputWithLabel
            label={"Username"}
            id={"username"}
            placeholder={"Enter your username..."}
            type={"text"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            autoFocus
            required
          />

          <InputWithLabel
            label={"Password"}
            id={"password"}
            placeholder={"Enter your password..."}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
