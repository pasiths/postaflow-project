import { createCustomer } from "@/api/customer";
import { InputWithLabel } from "../atoms/InputWithLabel";
import { TextareaWithLabel } from "../atoms/TextareaWithLabel";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { toast } from "react-toastify";

const CustomerEditor = () => {
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [address, setAddress] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNumError, setContactNumError] = useState("");
  const [addressError, setAddressError] = useState("");

  const handleCreateCustomer = async () => {
    setLoading(true);
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setContactNumError("");
    setAddressError("");

    // Validate inputs
    let isHasError = false;

    if (!firstName) {
      setFirstNameError("First name is required");
      isHasError = true;
    }
    if (!lastName) {
      setLastNameError("Last name is required");
      isHasError = true;
    }
    if (!email) {
      setEmailError("Email is required");
      isHasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email format");
        isHasError = true;
      }
    }

    if (!contactNum) {
      setContactNumError("Contact number is required");
      isHasError = true;
    } else {
      const contactNumRegex = /^\d{10,15}$/;
      if (!contactNumRegex.test(contactNum)) {
        setContactNumError("Contact number must be 10-15 digits");
        isHasError = true;
      } else {
        setContactNumError(""); // Clear error if validation passes
      }
    }
    if (!address) {
      setAddressError("Address is required");
      isHasError = true;
    }

    if (isHasError) {
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      isHasError = true;
    }

    // Validate contact number format (only digits and length between 7-15)
    const contactNumRegex = /^\d{7,15}$/;
    if (!contactNumRegex.test(contactNum)) {
      setContactNumError("Contact number must be 7-15 digits");
      isHasError = true;
    }

    try {
      await createCustomer({
        firstName,
        lastName,
        email,
        contactNum,
        address,
      });

      toast.success("Customer created successfully");

      window.location.reload();
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-base font-bold">Create Customer</h1>
      <Separator className="mb-5" />
      <div className="space-y-2">
        <div className="flex gap-2">
          <InputWithLabel
            label="First Name:"
            id="firstName"
            placeholder=""
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
            error={firstNameError}
            required
          />
          <InputWithLabel
            label="Last Name:"
            id="lastName"
            placeholder=""
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
            error={lastNameError}
            required
          />
        </div>
        <div className="flex gap-2">
          <InputWithLabel
            label="Email:"
            id="email"
            placeholder=""
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            error={emailError}
            required
          />
          <InputWithLabel
            label="Contact Number:"
            id="contactNum"
            placeholder=""
            type="text"
            value={contactNum}
            onChange={(e) => setContactNum(e.target.value)}
            disabled={loading}
            error={contactNumError}
            required
          />
        </div>
        <TextareaWithLabel
          label="Address:"
          id="address"
          placeholder=""
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={loading}
          error={addressError}
          required
        />

        <div className="flex gap-2 items-center justify-end">
          <Button
            variant="default"
            className="w-40 mt-4"
            onClick={handleCreateCustomer}
            disabled={loading}
          >
            Create Customer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerEditor;
