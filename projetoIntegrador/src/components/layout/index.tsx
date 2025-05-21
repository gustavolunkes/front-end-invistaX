import { Outlet } from "react-router-dom";
import { Header } from "../header";
import Sidebar from "../Sidebar";

export function Layout() {
    return(
        <div className="flex">
        <Sidebar/>
        <Outlet/>
        </div>
    )
}