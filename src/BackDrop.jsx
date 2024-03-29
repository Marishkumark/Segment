import React from "react";

const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed w-[100%] h-[100%] bg-black opacity-30 z-[100] top-0 right-0"
    ></div>
  );
};

export default BackDrop;
