"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import styles from "./page.module.css";

const SignInButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <button className={styles.button} onClick={() => signOut()}>
          Sign Out
        </button>
      ) : (
        <button className={styles.button} onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default SignInButton;
