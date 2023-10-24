"use client";
import React, { FormEventHandler } from "react";
import { signIn } from "next-auth/react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import styles from "./signin.module.css";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Name is required")
    .min(2, "Username should be at least 2 characters long")
    .max(150, "Username should not be more than 150 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(2, "Password should be at least 2 characters long")
    .max(128, "Password should not be more than 128 characters long"),
});

const LoginPage: React.FC = () => {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
    other: "",
  });
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setErrors({ username: "", password: "", other: "" });

    validationSchema
      .validate(user, { abortEarly: false })
      .then(() => {
        signIn("credentials", {
          username: user.username,
          password: user.password,
          redirect: false,
        }).then(({ ok, error }: any) => {
          if (ok) {
            router.push("/dashboard");
          } else {
            setErrors({
              username: "",
              password: "",
              other: "Invalid credentials",
            });
          }
        });
      })
      .catch((validationErrors) => {
        const newErrors: any = {};
        validationErrors.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <section className={styles.loginPage}>
      <div className={styles.modalOverlay}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {errors.other && <p className={styles.errorOther}>{errors.other}</p>}

          <div className={styles.inputBox}>
            <input
              className={styles.input}
              value={user.username}
              onChange={({ target }) =>
                setUser({ ...user, username: target.value })
              }
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
          </div>

          <div className={styles.inputBox}>
            <input
              className={styles.input}
              value={user.password}
              onChange={({ target }) =>
                setUser({ ...user, password: target.value })
              }
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <input type="submit" className={styles.button} value="Login" />
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
