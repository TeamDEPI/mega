import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { API_BASE_URL } from "../config.json";
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = API_BASE_URL + "/auth";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const init = async () => {
      const refresh = localStorage.getItem("refreshtoken");
      if (!token || !refresh) {
        setLoading(false);
        return;
      }
      let res = await fetch(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": "en",
        },
      });
      if (res.status === 401) {
        const refreshedData = await Refreshtoken();
        setUser(refreshedData.user);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setLoading(false);
        setUser(data);
      }
      // if (!user && tempUser) {
      //   setUser(JSON.parse(tempUser));
      // }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const Refreshtoken = async () => {
    try {
      const res = await fetch(`${BASE_URL}/token/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: JSON.stringify({
          refreshtoken: localStorage.getItem("refreshtoken"),
          useragent: navigator.userAgent,
          ip: "::1",
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.auth.token);
        localStorage.setItem("refreshtoken", data.auth.refreshtoken);
        localStorage.setItem("user", JSON.stringify(data.user));

        return data;
      } else {
        logout();
        setLoading(false);
      }

      return null;
    } catch (e) {
      return e.message;
    }
  };

  const register = async (fullname, email, password, phonenumber) => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept-Language": "en" },
      body: JSON.stringify({ fullname, email, password, phonenumber }),
    });

    const data = await res.json();
    if (res.status !== 201) throw new Error(data.message);
    return data.message;
  };
  const verifyEmail = async (email, otp) => {
    const res = await fetch(`${BASE_URL}/email/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept-Language": "en" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (data.statusCode !== 200) throw new Error(data.message);
    return { success: true, message: data.message };
  };

  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data?.success) throw new Error(data.message);
    if (
      (!data.auth || !data.user) &&
      data.verification.emailconfirmed === false
    )
      return { message: data.message, emailconfirmed: false };
    if ((!data.auth || !data.user) && data.verification.requiresotpverification)
      return { message: data.message, requiresotpverification: true };
    localStorage.setItem("token", data.auth.token);
    localStorage.setItem("refreshtoken", data.auth.refreshtoken);
    localStorage.setItem("verification", JSON.stringify(data.verification));
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  // Resend OTP for register, login, 2FA, or forgot password
  const sendOtp = async (email, type, token) => {
    let headers = {
      "Content-Type": "application/json",
      "Accept-Language": "en",
    };
    headers = token
      ? {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      : headers;
    const res = await fetch(
      `${BASE_URL}/${type}/resend-otp?email=${encodeURIComponent(email)}`,
      {
        method: "POST",
        headers,
      }
    );
    const data = await res.json();
    return data.message;
  };

  const verifyLogin = async (email, otp) => {
    const res = await fetch(`${BASE_URL}/login/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept-Language": "en" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (data?.success && data?.auth.token) {
      localStorage.setItem("token", data.auth.token);
      localStorage.setItem("refreshtoken", data.auth.refreshtoken);
      localStorage.setItem("verification", JSON.stringify(data.verification));
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } else {
      throw new Error(data.message);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("verification");
    localStorage.removeItem("user");
    setUser(null);
    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const forgotPassword = async (email) => {
    const res = await fetch(
      `${BASE_URL}/password/forgot?email=${encodeURIComponent(email)}`,
      {
        method: "POST",
        headers: {
          "Accept-Language": "en",
        },
      }
    );

    const data = await res.json();
    if (data.errorCode === "RESEND_COOLDOWN") {
      throw new Error(data.message);
    }

    if (data.success) {
      return {
        message: data.message,
        requiresVerification: data.requiresverification,
        otpExpiresAt: data.otpexpiresat,
        remainingResends: data.remainingresends,
      };
    }

    throw new Error(data.message);
  };
  const verifyForgetOtp = async (email, otp) => {
    const res = await fetch(`${BASE_URL}/password/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (data.success && data.resettoken) {
      return {
        message: data.message,
        resettoken: data.resettoken,
        expiresAt: data.expiresat,
        success: data.success,
      };
    }

    throw new Error(data.message);
  };

  const resetPassword = async (email, token, newPassword) => {
    const res = await fetch(`${BASE_URL}/password/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify({
        email,
        token,
        newPassword,
      }),
    });

    const data = await res.json();

    if (data.success) {
      return {
        message: data.message,
        changedAt: data.passwordchangedat,
      };
    }

    throw new Error(data.message);
  };

  const changePassword = async (
    currentPassword,
    newPassword,
    confirmnewpassword
  ) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/password/change`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmnewpassword,
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        register,
        verifyEmail,
        login,
        verifyLogin,
        logout,
        sendOtp,
        forgotPassword,
        verifyForgetOtp,
        resetPassword,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
