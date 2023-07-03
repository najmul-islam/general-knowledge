import React, { lazy, Suspense } from "react";
import Loading from "../../components/public/others/Loading";
const SingleSubject = lazy(() =>
  import("../../pages/public/SingleSubjectPage")
);

const SingleSubjectRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SingleSubject />
    </Suspense>
  );
};

export default SingleSubjectRoute;
