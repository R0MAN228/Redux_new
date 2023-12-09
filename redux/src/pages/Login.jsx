import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/user/action";
import { selectUserError, selectUserId } from "../redux/user/selectors";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const id = useSelector(selectUserId);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate("/");
    }
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-auto w-2/3">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2 mb-2"
      />
      {error?.message && <div className="text-red-500 mb-2">{error?.message}</div>}
      <div className="flex justify-between">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <Link
          to="/signup"
          className="underline py-2"
          onClick={() =>
            dispatch({
              type: "SET/USER/ERROR",
              payload: null,
            })
          }
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default Login;