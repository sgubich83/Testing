import React from "react";
import { CircularProgress } from "@material-ui/core";
import styles from "./styles.module.scss";

const Spinner = () => (
    <div className={styles.spinner}>
        <CircularProgress className={styles.spinnerPosition} />
    </div>
);

export default Spinner;
