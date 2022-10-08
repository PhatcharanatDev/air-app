import { NavLink } from "react-router-dom";
import { BiHomeAlt, BiGridAlt } from "react-icons/bi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menu = [
    { name: "หน้าหลัก", icon: <BiHomeAlt />, link: "/" },
    { name: "รายการแอร์", icon: <BiGridAlt />, link: "/airs" },
  ];
  return (
    <div>
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`h-screen bg-white border-r border-slate-200 w-72 p-9 duration-300 absolute lg:static lg:translate-x-0 z-40 left-0 top-0  ${
          sidebarOpen ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        <div className="flex flex-row items-center mb-10">
          <div className="text-dark-purple ">ระบบบันทึกการตรวจเช็คแอร์</div>
        </div>
        <div>
          <div className="mb-4 text-dark-purple">Menu</div>
          <ul className="space-y-3">
            {menu.map((val, index) => {
              return (
                <NavLink key={index} to={val.link} end>
                  {({ isActive }) => (
                    <li
                      className={`flex flex-row items-center cursor-pointer text-dark-purple hover:bg-dark-purple hover:text-white text-sm rounded-md p-3 mb-1 ${
                        isActive ? "bg-dark-purple text-white" : undefined
                      }`}
                    >
                      <div className="mr-5">{val.icon}</div>
                      <div>{val.name}</div>
                    </li>
                  )}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default Sidebar;
