import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserError, selectUserId } from "../redux/user/selectors";
import { signupUser } from "../redux/user/action";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../utils/validation";
import { z } from "zod";

const SignUp = () => {
  const error = useSelector(selectUserError);
  const id = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });

  useEffect(() => {
    if (id) {
      navigate("/");
    }
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newUser = User.parse({ ...form, createdAt: Date.now() });
      dispatch(signupUser(newUser));
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch({
          type: "SET/USER/ERROR",
          payload: error.format(),
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-2/3 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Sign up</h1>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2 mb-2"
      />
      {error?.email && (
        <div className="text-red-500 mb-2">{error?.email._errors}</div>
      )}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2 mb-2"
      />
      {error?.password && (
        <div className="text-red-500 mb-2">{error?.password._errors}</div>
      )}
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmedPassword"
        value={form.confirmedPassword}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2 mb-2"
      />
      {error?.confirmedPassword && (
        <div className="text-red-500 mb-2">{error?.confirmedPassword._errors}</div>
      )}
      <div className="flex justify-between">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <Link
          to="/login"
          className="underline py-2"
          onClick={() =>
            dispatch({
              type: "SET/USER/ERROR",
              payload: null,
            })
          }
        >
          Login
        </Link>
      </div>
      {error?.message && <div className="text-red-500 mt-2">{error?.message}</div>}
    </form>
  );
};

export default SignUp;