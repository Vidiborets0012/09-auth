"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { getMe, register, RegisterRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: RegisterRequest = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      await register(formValues);

      const user = await getMe();

      setUser(user);

      router.push("/profile");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
