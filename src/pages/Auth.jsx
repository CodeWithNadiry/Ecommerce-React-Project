/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import useAuthStore from "../store/AuthStore";
import Input from "../components/Input";
import { useInput } from "../hooks/useInput";
import { isEmail, isEmpty, hasMinLength } from "../utils/validation";

const Auth = () => {
  const { signup, login } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode") || "login";
  const isLogin = mode !== "signup";

  const {
    enteredValue: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameHasError,
  } = useInput("", (v) => !isEmpty(v));

  const {
    enteredValue: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (v) => !isEmpty(v) && isEmail(v));

  const {
    enteredValue: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (v) => hasMinLength(v, 5));

  const inputs = [
    {
      type: "text",
      placeholder: "Full Name",
      value: nameValue,
      onChange: handleNameChange,
      onBlur: handleNameBlur,
      error: nameHasError && "Name cannot be empty",
      show: !isLogin,
    },
    {
      type: "email",
      placeholder: "Email",
      value: emailValue,
      onChange: handleEmailChange,
      onBlur: handleEmailBlur,
      error: emailHasError && "Please enter a valid email",
      show: true,
    },
    {
      type: "password",
      placeholder: "Password",
      value: passwordValue,
      onChange: handlePasswordChange,
      onBlur: handlePasswordBlur,
      error: passwordHasError && "Password must be at least 5 characters",
      show: true,
    },
  ];

  const title = isLogin
    ? "Welcome to Skyware Shop"
    : "Create Your Account";
  const subtitle = isLogin
    ? "Log in to continue"
    : "Sign up to get started";
  const buttonText = isLogin ? "Login" : "Sign up";

  function handleSubmit(e) {
    e.preventDefault();

    if (isLogin) {
      if (emailHasError || passwordHasError) return;

      const role = login({
        email: emailValue,
        password: passwordValue,
      });

      if (role === "admin") navigate("/admin/dashboard");
      if (role === "user") navigate("/user/home");
    } else {
      if (nameHasError || emailHasError || passwordHasError) return;

      const success = signup({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      });

      if (success) navigate("/auth?mode=login");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0A6085] to-[#084d6b] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.jpg" alt="Skyware Logo" className="w-14 mb-2" />
            <h2 className="text-2xl font-bold text-[#0A6085]">
              Skyware
            </h2>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            {inputs
              .filter((i) => i.show)
              .map(({ type, show, ...props }) => (
                <Input key={type} type={type} {...props} />
              ))}
          </div>

          <Button>{buttonText}</Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              className="text-[#0A6085] font-medium cursor-pointer hover:underline ml-1"
              onClick={() =>
                navigate(`/auth?mode=${isLogin ? "signup" : "login"}`)
              }
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;