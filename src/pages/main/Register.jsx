import React, { use, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useEmailVerificationMutation,
  useOtpVerificationMutation,
  useRegisterUserMutation,
} from "../../services/public/authApi";
import Toast from "../../components/Toast";
import SuccessModal from "./components/SuccessModal";

// Default form values
const DEFAULT_FORM_VAL = {
  name: "",
  username: "",
  password: "",
  password_confirmation: "",
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState(DEFAULT_FORM_VAL);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [toast, setToast] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [emailVerification, { isLoading: isVerifyingEmail }] =
    useEmailVerificationMutation();
  const [otpVerification, { isLoading: isVerifyingOtp }] =
    useOtpVerificationMutation();
  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();

  // useEffect to handle API errors and show toast
  useEffect(() => {
    if (!apiError) return;

    showToast(apiError, "error");
  }, [apiError]);

  // useEffect to handle OTP sent info and show toast
  useEffect(() => {
    if (step !== 2) return;
    showToast(
      <>
        An OTP has been sent to <strong>{email}</strong>
      </>,
      "info"
    );
  }, [step]);

  // Function to show toast notifications
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };
 // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateUsername = (username) => {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  };

  // Handlers for each step
  const handleEmailVerification = async () => {
    setApiError("");
    setErrors({});

    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    try {
      const res = await emailVerification(email).unwrap();
      // This console log is to get OTP verification code and can be removed in production
      console.log(res);
      setStep(2);
    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Failed to send verification code. Please try again.";
      setApiError(errorMessage);
      console.error("Email verification failed:", err);
    }
  };

  const handleOtpVerification = async () => {
    setApiError("");
    setErrors({});

    if (otp.length < 6) {
      setErrors({ otp: "Please enter a valid OTP code" });
      return;
    }

    try {
      const res = await otpVerification({ otp, email }).unwrap();
      setStep(3);
    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Invalid verification code. Please try again.";
      setApiError(errorMessage);
      console.error("OTP verification failed:", err);
    }
  };

  const handleRegistration = async () => {
    setApiError("");
    const newErrors = {};

    if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!validateUsername(form.username)) {
      newErrors.username =
        "Username must be at least 3 characters and contain only letters, numbers, and underscores";
    }
    if (!validatePassword(form.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!isPasswordMatch) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userData = { ...form, email };
      const {refresh_token, access_token} = await registerUser(userData).unwrap();
      console.log(`Registration successful:`, {refresh_token, access_token});
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      // setShowSuccessModal(true);
    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      setApiError(errorMessage);
      console.error("Registration failed:", err);
    }
  };

  const handlePasswordVerificationChange = (e) => {
    const value = e.target.value;
    setIsPasswordMatch(value === form.password);
    setForm({ ...form, password_confirmation: value });
    if (errors.password_confirmation) {
      setErrors({ ...errors, password_confirmation: "" });
    }
  };

  const handleBack = () => {
    setApiError("");
    setErrors({});
    if (step === 2) {
      setOtp("");
      setStep(1);
    } else if (step === 3) {
      setForm(DEFAULT_FORM_VAL);
      setStep(2);
    }
  };

  const handleResendCode = async () => {
    setApiError("");
    try {
      await emailVerification(email).unwrap();
      showToast("Verification code resent successfully!", "info");
    } catch (err) {
      const errorMessage =
        err?.data?.message || "Failed to resend code. Please try again.";
      setApiError(errorMessage);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} header={"Welcome to UniHub!"} message={"Your account has been created successfully. Redirecting you to home..."} />
      )}

      <main className="px-4 py-16 max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black text-neutral-900 mb-2">
            Join UniHub
          </h1>
          <p className="text-neutral-700">
            Create your account and start learning, sharing, and vibing.
          </p>
        </header>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Bar Background */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

            {/* Active Progress Bar */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-primary-yellow transition-all duration-500 ease-out -z-10"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />

            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step >= 1
                    ? "bg-primary-yellow text-neutral-900 shadow-md"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > 1 ? <FaCheck className="w-5 h-5" /> : "1"}
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-colors ${
                  step === 1 ? "text-neutral-900" : "text-gray-500"
                }`}
              >
                Verify Email
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step >= 2
                    ? "bg-primary-yellow text-neutral-900 shadow-md"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > 2 ? <FaCheck className="w-5 h-5" /> : "2"}
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-colors ${
                  step === 2 ? "text-neutral-900" : "text-gray-500"
                }`}
              >
                Enter Code
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step >= 3
                    ? "bg-primary-yellow text-neutral-900 shadow-md"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-colors ${
                  step === 3 ? "text-neutral-900" : "text-gray-500"
                }`}
              >
                Create Account
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Email Verification */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEmailVerification();
            }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow"
          >
            <div className="grid gap-6">
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`px-2 pt-1 pb-1.5 focus:outline-1 text-primary-blue rounded-md border ${
                    errors.email
                      ? "border-red-300 focus:outline-red-500"
                      : "border-gray-200 focus:outline-primary-yellow"
                  }`}
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </label>

              <button
                type="submit"
                disabled={isVerifyingEmail}
                className="btn-cta bg-primary-yellow text-neutral-900 font-semibold hover:bg-primary-yellow/90 w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all"
              >
                {isVerifyingEmail && (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                )}
                {isVerifyingEmail ? "Sending Code..." : "Verify Email"}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOtpVerification();
            }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow"
          >
            <div className="grid gap-6">
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  Verification Code
                </span>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (errors.otp) setErrors({ ...errors, otp: "" });
                  }}
                  maxLength={6}
                  className={`px-2 pt-1 pb-1.5 focus:outline-1 text-primary-blue rounded-md border ${
                    errors.otp
                      ? "border-red-300 focus:outline-red-500"
                      : "border-gray-200 focus:outline-primary-yellow"
                  }`}
                  required
                />
                {errors.otp && (
                  <span className="text-red-500 text-sm">{errors.otp}</span>
                )}
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 text-neutral-700 hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isVerifyingOtp}
                  className="btn-cta bg-primary-yellow text-neutral-900 font-semibold hover:bg-primary-yellow/90 w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all"
                >
                  {isVerifyingOtp && (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  )}
                  {isVerifyingOtp ? "Verifying..." : "Verify Code"}
                </button>
              </div>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={isVerifyingEmail}
                className="text-sm text-primary-blue underline hover:no-underline disabled:opacity-50"
              >
                {isVerifyingEmail ? "Sending..." : "Resend Code"}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Registration Form */}
        {step === 3 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegistration();
            }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow"
          >
            <div className="grid gap-6">

              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">Name</span>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`px-2 pt-1 pb-1.5 focus:outline-1 text-primary-blue rounded-md border ${
                    errors.name
                      ? "border-red-300 focus:outline-red-500"
                      : "border-gray-200 focus:outline-primary-yellow"
                  }`}
                  required
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">Username</span>
                <input
                  type="text"
                  placeholder="john_doe"
                  value={form.username}
                  onChange={(e) => {
                    setForm({ ...form, username: e.target.value });
                    if (errors.username) setErrors({ ...errors, username: "" });
                  }}
                  className={`px-2 pt-1 pb-1.5 focus:outline-1 text-primary-blue rounded-md border ${
                    errors.username
                      ? "border-red-300 focus:outline-red-500"
                      : "border-gray-200 focus:outline-primary-yellow"
                  }`}
                  required
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  className={`px-2 pt-1 pb-1.5 focus:outline-1 text-primary-blue rounded-md border ${
                    errors.password
                      ? "border-red-300 focus:outline-red-500"
                      : "border-gray-200 focus:outline-primary-yellow"
                  }`}
                  required
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  Confirm Password
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password_confirmation}
                  onChange={handlePasswordVerificationChange}
                  className={`px-2 pt-1 pb-1.5 focus:outline-1 text-primary-blue rounded-md border ${
                    !isPasswordMatch || errors.password_confirmation
                      ? "border-red-300 focus:outline-red-500"
                      : "border-gray-200 focus:outline-primary-yellow"
                  }`}
                  required
                />
                {!isPasswordMatch && (
                  <span className="text-red-500 text-sm">
                    Passwords do not match
                  </span>
                )}
                {errors.password_confirmation && (
                  <span className="text-red-500 text-sm">
                    {errors.password_confirmation}
                  </span>
                )}
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 text-neutral-700 hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isRegistering || !isPasswordMatch}
                  className="btn-cta bg-primary-yellow text-neutral-900 font-semibold hover:bg-primary-yellow/90 w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all"
                >
                  {isRegistering && (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  )}
                  {isRegistering ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </div>
          </form>
        )}

        <p className="text-center text-neutral-700 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary-blue underline hover:no-underline"
          >
            Login
          </a>
        </p>
      </main>
    </>
  );
};

export default Register;
