"use client";
import React from "react";
import { useSession } from "next-auth/react";

import styles from "./dashboard.module.css";
import CustomTable from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTable } from "../redux/slices/table";

const Dashboard: React.FC = () => {
  const { table } = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSession();

  React.useLayoutEffect(() => {
    dispatch(fetchTable());
  }, []);

  if (status === "loading") {
    return (
      <section className={styles.dashboard}>
        <p>Loading...</p>
      </section>
    );
  }

  if (status === "unauthenticated") {
    return (
      <section className={styles.dashboard}>
        <p>Access denied, you have to sign in</p>
      </section>
    );
  }

  return (
    <section className={styles.dashboard}>
      {table.results && <CustomTable data={table.results} />}
    </section>
  );
};

export default Dashboard;
