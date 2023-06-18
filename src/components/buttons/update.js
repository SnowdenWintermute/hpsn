import React from "react";

import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import styles from "../../styles//buttons//update-button.module.css";


export function Update({}) {
  return (
    <button type="button" className={styles.buttonUpdate}>
      <EditNoteSharpIcon />
    </button>
  );
}
