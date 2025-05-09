import { useState } from "react";
import { InputWithLabel } from "../atoms/InputWithLabel";
import { Button } from "../ui/button";
import { TextareaWithLabel } from "../atoms/TextareaWithLabel";
import SelectWithLabel from "../atoms/SelectWithLabel";

const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [role, setRole] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
            label={"Email"}
            id={"email"}
            placeholder={"Enter your email..."}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <InputWithLabel
            label={"First Name"}
            id={"firstName"}
            placeholder={"Enter your first name..."}
            type={"text"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
            required
          />

          <InputWithLabel
            label={"Last Name"}
            id={"lastName"}
            placeholder={"Enter your last name..."}
            type={"text"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
            required
          />

          <InputWithLabel
            label={"Phone Number"}
            id={"phoneNum"}
            placeholder={"Enter your phone number..."}
            type={"text"}
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            disabled={loading}
            required
          />

          <TextareaWithLabel
            label={"Address"}
            id={"address"}
            placeholder={"Enter your address..."}
            rows={5}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
            required
          />

          <SelectWithLabel
            label={"Role"}
            id={"role"}
            placeholder={"Select your Job Role..."}
            items={[
              { id: 1, item: "Mail Deliverer", value: "MAIL_DELIVERER" },
              { id: 2, item: "Postal Clerk", value: "POSTALCLERK" },
            ]}
            onChange={(value) => setRole(value)}
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
          <InputWithLabel
            label={"Confirm Password"}
            id={"confirmPassword"}
            placeholder={"Enter your password again..."}
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
