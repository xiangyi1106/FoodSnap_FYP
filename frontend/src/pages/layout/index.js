import { useState } from "react";
import Header from "../../components/header";
import LeftMenu from "../../components/home/LeftMenu";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CreatePostPopUp from "../../components/createPostPopup";

export default function Layout({user}) {
    const location = useLocation();
    const width481 = useMediaQuery({
        query: "(max-width: 481px)"
    });

    // Extract the current path to determine the active page
    const currentPath = location.pathname;
    const [visible, setVisible] = useState(false);
    const [isPostLoading, setIsPostLoading] = useState(false);

    return (
        <div className="home">
            <Header currentPath={currentPath} setVisible={setVisible} visible={visible}/>
            <LeftMenu />
            {visible && <CreatePostPopUp setVisible={setVisible} setIsPostLoading={setIsPostLoading} user={user} />}
            <Outlet />
        </div>
    );
}
