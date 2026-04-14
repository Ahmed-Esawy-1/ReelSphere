"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const users = [
  {
    userName: "Movies World",
    email: "moviesWorld@gmail.com",
    password: "12345678",
  },
];

const page = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleFormSubmit(e: any) {
    e.preventDefault();

    if (inputValue.email === "") {
      setErrors({
        email:
          "The email address or mobile number you entered isn't connected to an account",
        password: "",
      });
      return;
    }

    if (inputValue.password === "") {
      setErrors({
        email: "",
        password: "The password you've entered is incorrect.",
      });
      return;
    }

    const exist = users.find(
      (user) =>
        inputValue.email === user.email &&
        inputValue.password === user.password,
    );

    if (exist) {
      router.push("/");
    } else {
      setErrors({
        email: "",
        password: "The password you've entered is incorrect.",
      });
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="relative w-full md:min-w-125 md:w-1/2 lg:w-150">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-surface/40 via-surface-container-low/80 to-surface"></div>
          <img
            className="w-full h-full object-cover grayscale opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoQwDjhLj_aWTOxudG7fKGEoizCDizd8n_L4tagQTEYaCTc83cktQBan5eC24f0ooCtdsHEW2RNdIV3HnA25MqdmZiY4iPgP_wFfj6vUtFXtkI6jfsOBAvGXsK6eZLLD9Y0jZUfCdw_VllvLko9ik-nO0aX-_WTp_5BsKNdRx3A4PIWu5XhRj79T1nfqRY-nFtGEOws7_s1ys5OnnqLp3XNj291Jg78QmtKIsO8mBuBVCMrI1qPI6dX3Fm5kwsY87RVjBKdwpAEpQ"
          />
        </div>
        <div className="relative z-20 w-full  px-4 py-24 md:py-32">
          <div className="w-full p-8 md:p-12 bg-[#31363399] border border-outline-variant/20 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-md">
            <h1 className="text-on-surface text-2xl md:text-5xl text-center leading-tight tracking-tight mb-2">
              Welcome Back
            </h1>
            <div className="text-2xl text-center mb-12">
              <p className="mb-2">Email: moviesWorld@gmail.com</p>
              <p>Password: 12345678</p>
            </div>

            <form className="space-y-8" onSubmit={handleFormSubmit}>
              <div className="relative group">
                <label
                  className="block text-xs uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="w-full py-4 px-0 text-on-surface outline-none border-0 border-b-2 border-outline-variant/40 focus:border-primary placeholder-on-surface-variant/40 transition-all"
                  id="email"
                  placeholder="example@heritage.com"
                  type="email"
                  value={inputValue.email}
                  onChange={(e) => {
                    setInputValue((prev) => {
                      return { ...prev, email: e.target.value };
                    });
                  }}
                />
                {errors.email && (
                  <div className="text-sm text-red-600">{errors.email}</div>
                )}
              </div>
              <div className="relative group">
                <label
                  className="block text-xs uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full py-4 px-0 text-on-surface outline-none border-0 border-b-2 border-outline-variant/40 focus:border-primary placeholder-on-surface-variant/40 transition-all"
                    id="password"
                    placeholder="••••••••"
                    type={visible ? "text" : "password"}
                    value={inputValue.password}
                    onChange={(e) => {
                      setInputValue((prev) => {
                        return { ...prev, password: e.target.value };
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    onClick={() => {
                      setVisible(!visible);
                    }}
                  >
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </button>
                  {errors.password && (
                    <div className="text-sm text-red-600">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>
              <button
                className="block pt-4 w-full bg-gradient-to-r from-primary to-primary-container text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
                type="submit"
              >
                Sign in
              </button>
            </form>
            <div className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
              <p className="text-on-surface-variant text-sm">
                Create new account?
                <Link
                  href="/signup"
                  className="text-primary font-bold hover:text-primary-fixed ml-2 rtl:mr-2 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
