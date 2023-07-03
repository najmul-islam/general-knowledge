import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";

const Category = lazy(() => import("../../pages/public/CategoryPage"));

const CategoryRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Category />
    </Suspense>
  );
};

export default CategoryRoute;
