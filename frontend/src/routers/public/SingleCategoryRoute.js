import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";

const SingleCategory = lazy(() =>
  import("../../pages/public/SingleCategoryPage")
);

const SingleCategoryRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SingleCategory />
    </Suspense>
  );
};

export default SingleCategoryRoute;
