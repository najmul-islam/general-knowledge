import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";

const SingleGk = lazy(() => import("../../pages/public/SingleGkPage"));

const SingleGkRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SingleGk />
    </Suspense>
  );
};

export default SingleGkRoute;
