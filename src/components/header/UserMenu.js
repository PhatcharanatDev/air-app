import { Transition } from "@headlessui/react";
import { useState, useEffect, useRef } from "react";
import { BsFillPersonFill, BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        trigger.current.contains(target) ||
        dropdown.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex ml-3 items-center space-x-2 cursor-pointer  transition duration-150 pr-2">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        ref={trigger}
        className="flex items-center"
      >
        <div className="w-8 h-8 flex items-center justify-center ">
          <BsFillPersonFill className={`text-dark-purple text-base`} />
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <span>Admin</span>
          <BsChevronDown className={`text-dark-purple text-base`} />
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 -mr-48 sm:mr-0 w-48 max-h-96 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-y-auto mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100 "
        leaveTo="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">Admin</div>
            <div className="text-xs text-slate-500 italic">Administrator</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default UserMenu;
