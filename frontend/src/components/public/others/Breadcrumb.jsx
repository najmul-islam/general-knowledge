import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //split pathname without empty string
  const pathnames = pathname.split("/").filter(Boolean);

  //capitalize each word first latter
  const capitalizeFirstLetter = (string) => {
    const str = string.split("-");
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return (string = str.join(" "));
  };

  return (
    <Breadcrumb className="pt-3">
      {/* static home route */}
      <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Breadcrumb.Item active key={name}>
            {capitalizeFirstLetter(name)}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={name} onClick={() => navigate(routeTo)}>
            {capitalizeFirstLetter(name)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
