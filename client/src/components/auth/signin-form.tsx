import { useState } from "react";
import { InputWithLabel } from "../atoms/InputWithLabel";
import { Button } from "../ui/button";

const SignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
