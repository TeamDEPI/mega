import { useEffect, useState } from "react";

export default function OtpModal({
  visible,
  email,
  resendTime = 60,
  onConfirm,
  onClose,
  onResend,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(resendTime);
  const [error, setError] = useState("");

  useEffect(() => {
    if (visible) {
      setOtp(["", "", "", "", "", ""]);
      setTimer(resendTime);
      setError("");
      setTimeout(() => {
        document.getElementById("otp-input-0")?.focus();
      }, 100);
    }
  }, [visible, resendTime]);

  useEffect(() => {
    let interval;
    if (visible && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [visible, timer]);

  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        const lastIndex = [...otp]
          .map((d, i) => (d ? i : -1))
          .filter((i) => i >= 0)
          .pop();

        if (lastIndex !== undefined) {
          const newOtp = [...otp];
          if (lastIndex >= 0) {
            newOtp[lastIndex] = "";
            setOtp(newOtp);
            setTimeout(() => {
              document.getElementById(`otp-input-${lastIndex}`)?.focus();
            }, 10);
          }
        }
      } else if (e.key === "Enter") {
        const code = otp.join("");
        if (code.length === 6 && /^\d+$/.test(code)) {
          handleConfirm();
        } else {
          showError("Please enter the full 6-digit code");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, otp]);

  const handleOtpChange = (value, index) => {
    const clean = value.replace(/\D/g, "");
    if (clean.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = clean;
    setOtp(newOtp);

    if (clean && index < 5) {
      const next = document.getElementById(`otp-input-${index + 1}`);
      next?.focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const newOtp = [...otp];
    let cursor = index;

    for (let i = 0; i < pasted.length && cursor < 6; i++) {
      newOtp[cursor] = pasted[i];
      cursor++;
    }

    setOtp(newOtp);

    const nextIndex = Math.min(cursor, 5);
    setTimeout(() => {
      document.getElementById(`otp-input-${nextIndex}`)?.focus();
    }, 10);
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 2000);
  };

  const handleConfirm = async () => {
    const code = otp.join("");
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      showError("Please enter the full 6-digit code");
      return;
    }
    try {
      await onConfirm(code);
    } catch (err) {
      showError(err.message);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <h4 className="text-xl font-bold text-center mb-2">Enter OTP</h4>
        <p className="text-center text-gray-600 mb-4">
          We sent a 6-digit code to:{" "}
          <span className="font-semibold">{email}</span>
        </p>

        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              className="w-12 h-14 border border-gray-300 rounded-lg text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onPaste={(e) => handlePaste(e, index)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[index] && index > 0) {
                  const prev = document.getElementById(
                    `otp-input-${index - 1}`
                  );
                  prev?.focus();
                }
              }}
            />
          ))}
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          onClick={handleConfirm}
        >
          Verify Code
        </button>

        <div className="text-center mt-4">
          {timer > 0 ? (
            <span className="text-gray-500">Resend code in {timer}s</span>
          ) : (
            <button
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => {
                onResend(email);
                setTimer(resendTime);
              }}
            >
              Resend Code
            </button>
          )}
        </div>

        {error && (
          <div className="text-center mt-3">
            <small className="text-red-600 font-medium">{error}</small>
          </div>
        )}

        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg mt-4 font-semibold transition"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
