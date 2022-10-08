// Hook
import { useState } from "react";

// Components
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";


const CheckList = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-dark-purple font-semibold mb-8">
                รายการตรวจเช็ค
              </h1>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-base px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                สร้างรายการตรวจเช็ค
              </button>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default CheckList;
