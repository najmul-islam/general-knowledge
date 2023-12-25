import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";
import UserLayout from "../layouts/UserLayout";
import ProfilePage from "../pages/ProfilePage";
import UserAllGkPage from "../pages/UserAllGkPage";
import UserAllSubjectPage from "../pages/UserAllSubjectPage";
import GkCreatePage from "../pages/GkCreatePage";
import GkEditPage from "../pages/GkEditPage";
import SubjectCreatePage from "../pages/SubjectCreatePage";
import SubjectEditPage from "../pages/SubjectEditPage";
import AllGkPage from "../pages/AllGkPage";
import AllSubjectPage from "../pages/AllSubjectPage";
import SingleSubjectPage from "../pages/SingleSubjectPage";
import BookmarkPage from "../pages/BookmarkPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-gk" element={<AllGkPage />} />
        <Route path="/all-subject" element={<AllSubjectPage />} />
        <Route path="/all-subject/:subjectId" element={<SingleSubjectPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/result" element={<SearchPage />} />
      </Route>

      <Route path="/user/*" element={<UserLayout roles={["user"]} />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="my-gk" element={<UserAllGkPage />} />
        <Route path="my-subject" element={<UserAllSubjectPage />} />
        <Route path="bookmark" element={<BookmarkPage />} />
        <Route path="gk/create" element={<GkCreatePage />} />
        <Route path="gk/edit" element={<GkEditPage />} />
        <Route path="subject/create" element={<SubjectCreatePage />} />
        <Route path="subject/edit" element={<SubjectEditPage />} />
      </Route>
    </Routes>
  );
};
export default Router;
