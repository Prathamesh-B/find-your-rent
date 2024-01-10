import React from "react";
import { Loader } from "@mantine/core";

const Spinner = () => {
  return (
    <div className="flex justify-center overflow-hidden p-4">
      <Loader className="" color="rgba(238, 147, 34, 1)" size={30} />
    </div>
  );
};

export default Spinner;
