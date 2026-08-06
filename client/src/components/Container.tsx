import React from "react";
interface ContainerProp {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProp) => {
  return <div className="w-full max-w-350 px-5  py-8 mx-auto">{children}</div>;
};

export default Container;
