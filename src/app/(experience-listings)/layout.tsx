
import BgGlassmorphism from "@/components/BgGlassmorphism";
import React, { ReactNode } from "react";



const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism />

      {/* SECTION HERO */}


      {children}
      <div className=" relative  space-y-24 lg:space-y-28 mt-10 lg:mt-28">

        <div className="container overflow-hidden">
          {/* SECTION 1 */}
          {/* <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderNewCategories
              heading="Explore by types of stays"
              subHeading="Explore houses based on 10 types of stays"
              categoryCardType="card5"
              itemPerRow={5}
              sliderStyle="style2"
            />
          </div> */}

          {/* SECTION */}
          {/* <SectionSubscribe2 className="py-24 lg:py-28" /> */}

          {/* SECTION */}
          {/* <div className="relative py-16 mb-24 lg:mb-28">
            <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
            <SectionGridAuthorBox />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
