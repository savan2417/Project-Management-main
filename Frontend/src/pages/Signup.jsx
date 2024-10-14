import { useState } from "react";
import InputGroup from "../components/InputGroup";
import { toast } from "react-toastify";
import usePost from "../hooks/usePost";
import { Link, Navigate } from "react-router-dom";

export default function Signup() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await usePost(register);
      toast.success(response.data.message);
      Navigate("");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setRegister({
        name: "",
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };

  return (
    <section className="section-sign-up bg-purple-300">
      <div className="grid place-items-center h-screen">
        <div className="sign-up bg-white p-4 rounded-md lg:w-1/3 w-1/2">
          <h2 className="text-center text-2xl font-semibold text-purple-600">
            SIGN UP
          </h2>
          <form onSubmit={handleSubmit}>
            <InputGroup
              label={"Enter Name"}
              name={"name"}
              type={"text"}
              placeholder={"Enter Your Name"}
              value={register.name}
              setValue={setRegister}
            />
            <InputGroup
              label={"Enter Email"}
              name={"email"}
              type={"email"}
              placeholder={"Enter Your Email"}
              value={register.email}
              setValue={setRegister}
            />
            <InputGroup
              label={"Enter Password"}
              name={"password"}
              type={"password"}
              placeholder={"Enter Your Password"}
              value={register.password}
              setValue={setRegister}
            />
            <button
              className="text-white w-full bg-purple-900 p-1 rounded-sm hover:bg-green-600 transition my-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Please wait" : "Register"}
            </button>
          </form>
          <div className="flex justify-center">
            <h3 className="text-lg text-gray-600">
              Already Registered ? {" "} 
              <Link to={"/"} className="text-lg text-green-500">
                Login
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
