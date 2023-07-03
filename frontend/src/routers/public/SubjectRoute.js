import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";

const Subject = lazy(() => import("../../pages/public/SubjectPage"));

const SubjectRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Subject />
    </Suspense>
  );
};

export default SubjectRoute;
