import React from "react";
import styles from "./Spinner.module.sass";
import { FaSpinner } from "react-icons/fa6";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <FaSpinner className={styles.loading_spinner} />
    </div>
  );
}
