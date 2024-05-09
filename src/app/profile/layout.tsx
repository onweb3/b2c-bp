import React, { FC } from "react"; import ProfileSideBar from "./ProfileSideBar";
import MobileMainNav from "../(client-components)/(Header)/MobileMainNav";
;

export interface CommonLayoutProps {
    children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
    return (
        <div className={`nc-AuthorPage `}>
                <MobileMainNav />
            <main className="container md:mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
                <div className="block flex-grow mb-24 lg:mb-0">
                    <div className="lg:sticky lg:top-24 hidden md:block"><ProfileSideBar /></div>
                </div>
                <div className="w-full lg:w-3/5 xl:w-2/3 md:space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default CommonLayout;
