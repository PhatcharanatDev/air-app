import { BsList } from "react-icons/bs";

// Components
// import Notifications from "./header/Notifications";
import UserMenu from "./header/UserMenu";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <BsList
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-2xl cursor-pointer lg:hidden"
            />
          </div>

          {/* Header: Right side */}
          <div className="flex items-center relative">
            {/* <Notifications className="absolute top-0"/> */}

            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
