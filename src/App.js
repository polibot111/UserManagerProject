import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AdminUser from "./pages/AdminUser";
import Role from "./pages/Role";
import Department from "./pages/Department";
import UpdateDepartment from "./pages/Department/UpdateDepartment";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/admin/">
        <Route path="users" element={<AdminUser />} />
        <Route path="roles" element={<Role />} />
        <Route path="departments" element={<Department />} />
        <Route path="departments/update/:id" element={<UpdateDepartment />} />
      </Route>
    </Routes>
  );
}

export default App;
