import { Routes, Route } from "react-router-dom";
// Hook
import { useState } from "react";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import Air from "./pages/Air/Air";
import NotFound from "./pages/NotFound";
import CheckListDate from "./pages/ChecklistDate/ChecklistDate";
import AirCreate from "./pages/Air/AirCreate";
import AirUpdate from "./pages/Air/AirUpdate";
import ChecklistCreate from "./pages/ChecklistDate/ChecklistDateCreate";

import moment from "moment";

import 'moment/locale/th'  // without this line it didn't work
moment.locale('th')

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} exact />
              <Route path="airs" element={<Air />} />
              <Route path="airs/create" element={<AirCreate/> } />
              <Route path="airs/update/:id" element={<AirUpdate/> } />
              
              <Route
                path="airs/checklistdate/:id"
                element={<CheckListDate />}
              />
              <Route path="checklistdate/create" element={<ChecklistCreate/> } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
