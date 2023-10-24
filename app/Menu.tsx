import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";

import styles from "./page.module.css";

const Menu: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Logo</h1>
      <ul className={styles.navList}>
        <Link className={styles.navListItem} href="/" passHref>
          Home
        </Link>
        <Link className={styles.navListItem} href="/dashboard" passHref>
          Dashboard
        </Link>
      </ul>
      <SignInButton />
    </header>
  );
};

export default Menu;
