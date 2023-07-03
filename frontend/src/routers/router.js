import React from "react";
import { Routes, Route } from "react-router-dom";

// layouts
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// public pages
import Home from "./public/HomeRoute";
import Category from "./public/CategoryRoute";
import SingleCategory from "./public/SingleCategoryRoute";
import Subcategory from "./public/SubcategoryRoute";
import SingleSubcategory from "./public/SingleSubcategoryRoute";
import Subject from "./public/SubjectRoute";
import SingleSubject from "./public/SingleSubjectRoute";
import Gk from "./public/GkRoute";
import SingleGk from "./public/SingleGkRoute";
import NotFound from "./public/NotFoundRoute";

// private route
import Login from "../pages/public/LoginPage";
import Dashboard from "../pages/admin/DashboardPage";
import CategoryPage from "../pages/admin/CategoryPage";
import SubcategoryPage from "../pages/admin/SubcategoryPage";
import SubjectPage from "../pages/admin/SubjectPages";
import GkPage from "../pages/admin/GkPage";
import UsersPage from "../pages/admin/UsersPage";

// import RoleAccess from "./public/RoleAccess";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:id" element={<SingleCategory />} />
        <Route
          path="/category/subcategory/:id"
          element={<SingleSubcategory />}
        />
        <Route
          path="/category/subcategory/subject/:id"
          element={<SingleSubject />}
        />
        <Route path="/category/subject/:id" element={<SingleSubject />} />

        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/subcategory/:id" element={<SingleSubcategory />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/subject/:id" element={<SingleSubject />} />
        {/* <Route path="/gk" element={<Gk />} /> */}
        <Route path="/gk/:id" element={<SingleGk />} />

        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/admin" element={<PrivateLayout roles={["ADMIN"]} />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/category" element={<CategoryPage />} />
        <Route path="/admin/subcategory" element={<SubcategoryPage />} />
        <Route path="/admin/subject" element={<SubjectPage />} />
        <Route path="/admin/gk" element={<GkPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
