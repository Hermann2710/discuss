import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import User from "../../types/User";
import useLogin from "../../hooks/useLogin";

export default function Login() {
  const { loading, login } = useLogin();

  const [inputs, setInputs] = useState<User>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await login(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login&nbsp;
          <span className="text-blue-500">Discuss</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              className="w-full input input-bordered h-10"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              className="w-full input input-bordered h-10"
              placeholder="Enter password"
            />
          </div>
          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/signup"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button
              disabled={loading}
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
