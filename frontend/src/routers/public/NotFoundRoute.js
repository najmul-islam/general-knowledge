import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";
const NotFound = lazy(() => import("../../pages/public/NotFoundPage"));
const NotFoundRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <NotFound />
    </Suspense>
  );
};

export default NotFoundRoute;
