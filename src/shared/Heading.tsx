import React, { HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "Discover the most outstanding articles in all topics of life. ",
  className = "mb-10 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  ...args
}) => {
  return (
    <div className={`nc-Section-Heading relative  ${className}`}>
      <div
        className={
          isCenter ? "text-center w-full  mx-auto mb-4" : ""
        }
      >
        <h2 className={`text-xl sm:text-2xl md:text-[28px] font-semibold`} {...args}>
          {children || `Section Heading`}
        </h2>
        {desc && (
          <span className="block mt-2 md:mt-3 font-normal whitespace-no-wrap text-base sm:text-sm text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
   
        )}
      </div>
    </div>
  );
};

export default Heading;
