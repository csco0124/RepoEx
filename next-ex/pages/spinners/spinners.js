import React from "react";
import { FadeLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "#E50915",
  textAlign: "center",
};

const Spinner = ({ loading = true }) => {
  return (
    <div>
      <FadeLoader
        color="#000000"
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </div>
  );
};

export default Spinner;
