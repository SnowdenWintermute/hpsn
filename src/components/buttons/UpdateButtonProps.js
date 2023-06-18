import React from "react";

import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import styles from "../../styles//buttons//update-button.module.css";


export function Update({onClick}) {
  return (
    <button type="button" onClick={onClick} className={styles.buttonUpdate}>
      <EditNoteSharpIcon />
    </button>
  );
}
