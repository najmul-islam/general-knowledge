import React from "react";
import { useGetAllCategoryQuery } from "../../../redux/api/publicApi";
import { Accordion } from "react-bootstrap";
import Category from "./Category";
import NewCategory from "./NewCategory";
import Loading from "../others/Loading";

const AllCategory = () => {
  const { data: categorys, isLoading } = useGetAllCategoryQuery();

  if (isLoading) return <Loading />;

  return (
    <>
      {categorys.map((category) => (
        <Category key={category._id} category={category} />
        // <NewCategory key={category._id} category={category} />
      ))}
    </>
  );
};

export default AllCategory;
