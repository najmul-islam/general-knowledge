import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";

const Subcategory = lazy(() => import("../../pages/public/SubcategoryPage"));

const SubcategoryRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Subcategory />
    </Suspense>
  );
};

export default SubcategoryRoute;
