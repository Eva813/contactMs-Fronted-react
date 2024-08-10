import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 flex justify-center items-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div>
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800">
                Sorry about that! Please visit our homepage to get where you
                need to go.
              </p>
              <Link
                to="/"
                className="inline-block sm:w-full lg:w-auto my-2 border rounded-md py-4 px-8 text-center bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-opacity-50"
              >
                Take me Home!
              </Link>
            </div>
          </div>
          <h2 className="mb-8 ml-24 font-extrabold text-[10rem] text-teal-100 dark:text-gray-400 w-[516px] h-[190px]">
            <span className="sr-only">Error</span>
          </h2>
        </div>
      </div>
      <div>
        <img src="/src/assets/404.png" alt="Background Illustration" />
      </div>
    </div>
  );
};

export default NotFound;
