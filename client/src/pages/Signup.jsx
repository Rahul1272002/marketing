import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupRoute } from "../utils/APIRoutes";
import OAuth from "../components/OAuth";
const Signup = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({});
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(err);
  const handelChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(signupRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      if (data.sucess === false) {
        setErr(data.message);
        console.log("Handle submit");
        setLoading(false);
        return;
      }
      setLoading(false);
      setErr(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setErr(error.message);
      console.log("error occoured");
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
          onChange={handelChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handelChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="focus:outline-none border p-3 rounded-lg"
          onChange={handelChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg hover:opacity-95 text-white disabled:opacity-80"
        >
          {loading ? "loadding" : "SIGN UP"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {err && <p className="text-red-500 mt-5">{err}</p>}
    </div>
  );
};

export default Signup;
