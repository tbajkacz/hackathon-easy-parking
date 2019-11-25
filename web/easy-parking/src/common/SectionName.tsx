import React from "react";

interface SectionNameProps {
  children: React.ReactNode;
}

const SectionName: React.FC<SectionNameProps> = ({ children }) => {
  return <span className="title-parking-list">{children}</span>;
};
export default SectionName;
