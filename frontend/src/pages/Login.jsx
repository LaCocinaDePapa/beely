import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EyeButton } from "../components/EyeButton";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) <Navigate to="/dashboard" />;
  }, [isAuthenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fields = Object.fromEntries(new FormData(event.target));
    const { email, password } = fields;

    await signin({ email, password });
  };

  return (
    <section className="flex justify-center px-4 mt-28 min-h-min sm:px-6 lg:px-8 lg:mt-40">
      <div className="w-full max-w-md">
        <div>
          <img src="/bee.svg" alt="logo" className="mx-auto size-12" />
          <h2 className="mt-2 text-3xl font-extrabold text-center text-blue-600 dark:text-white">
            Login into your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-16">
          <input type="hidden" name="remember" value="true" />
          <div className="flex flex-col gap-4">
            <div className="relative">
              <label
                htmlFor="email-address"
                className="text-black dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email-address"
                autoComplete="email"
                required
                className="block w-full px-3 py-3 bg-transparent border rounded-md appearance-none border-neutral-300 placeholder:text-neutral-700 dark:placeholder:text-neutral-300 dark:border-neutral-800 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-black dark:text-white">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full px-3 py-3 bg-transparent border rounded-md appearance-none border-neutral-300 placeholder:text-neutral-700 dark:placeholder:text-neutral-300 dark:border-neutral-800 sm:text-sm"
                placeholder="Password"
              />

              <EyeButton
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-700 dark:text-white"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/#"
                className="form-medium text-sky-600 hover:text-sky-700 dark:text-slate-300 dark:hover:text-slate-400"
              >
                Forgot your password ?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" variant="secondary" size="lg">
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-8">
          <Link
            className="text-sky-600 hover:text-sky-700 dark:text-slate-300 dark:hover:text-slate-400"
            to="/signup"
          >
            Don't have an account ?
          </Link>
        </p>
      </div>
    </section>
  );
};
