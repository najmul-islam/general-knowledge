import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";

const Gk = lazy(() => import("../../pages/public/GkPage"));

const GkRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Gk />
    </Suspense>
  );
};

export default GkRoute;
