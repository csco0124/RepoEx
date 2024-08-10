import React from "react";
import { NodeModel } from "./types";
import styles from "./Placeholder.module.css";

type Props = {
  node: NodeModel;
  depth: number;
};

export const Placeholder: React.FC<Props> = (props) => {
  const left = props.depth * 24;
  console.log('props.depth!!!! : ',props.depth);
  return <div className={styles.root} style={{ left }}></div>;
};
