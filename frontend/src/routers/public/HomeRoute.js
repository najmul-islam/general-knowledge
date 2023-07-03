import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";

const Home = lazy(() => import("../../pages/public/HomePage"));

const HomeRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
};

export default HomeRoute;
