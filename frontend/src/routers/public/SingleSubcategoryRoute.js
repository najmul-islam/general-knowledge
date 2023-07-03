import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";

const SingleSubcategory = lazy(() =>
  import("../../pages/public/SingleSubcategoryPage")
);

const SingleSubcategoryRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SingleSubcategory />
    </Suspense>
  );
};

export default SingleSubcategoryRoute;
