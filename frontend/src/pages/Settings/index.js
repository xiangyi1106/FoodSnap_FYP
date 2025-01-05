import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import CustomBreadcrumbs from "../../components/BreadCrumbs";
import Header from "../../components/header";
import SidebarNav from "./SidebarNav";
import "./style.css";
import { generateBreadcrumbs } from "../../functions/generateBreadCrumbs";
import SettingsPage from "./SettingsPage";
import PasswordSettingsPage from "./Password/PasswordSettingsPage";

const sidebarNavItems = [
    {
        title: "Account",
        href: "/settings",
    },
    // {
    //     title: "Password",
    //     href: "/settings/password",
    // },
    // {
    //     title: "Notifications",
    //     href: "/examples/forms/notifications",
    // },
    // {
    //     title: "Display",
    //     href: "/examples/forms/display",
    // },
];


export default function Settings() {
    const location = useLocation();

    // Generate breadcrumbs using the reusable function
    const breadcrumbs = generateBreadcrumbs(location);
    return (
        <>
            <div className="profile">
                <Header />
                <div className="settings_layout hidden">
                    <div style={{padding: 0}}>
                    <CustomBreadcrumbs breadcrumbs={breadcrumbs} setting />
                    </div>
                    <div className="settings_header">
                        <h2 className="settings_title">Settings</h2>
                        <p className="settings_description">
                            Manage your account settings and set e-mail preferences.
                        </p>
                    </div>
                    <div className="settings_separator"></div>
                    <div className="settings_container lg_flex_row">
                        <aside className="settings_sidebar">
                            <SidebarNav items={sidebarNavItems}/>
                        </aside>
                        <div className="settings_content">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
