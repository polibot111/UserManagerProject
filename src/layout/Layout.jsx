import { isAdmin } from "../config/isAdmin";
import AdminLayout from "./AdminLayout";
import LoginLayout from "./LoginLayout";

export const Layout = isAdmin ? AdminLayout : LoginLayout;
