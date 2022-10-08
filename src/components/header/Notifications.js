import { Transition } from "@headlessui/react";
import { useState, useEffect, useRef } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Notifications = () => {
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
    <div className="relative inline-flex ml-3">
      <button
        ref={trigger}
        className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <BsFillChatFill className={`text-dark-purple text-base`} />
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 -mr-40 sm:mr-0 w-80 max-h-96 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-y-auto mt-1"
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
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
          <ul>
            <li className="border-b border-slate-200 last:border-0">
              <Link className={`block py-2 px-4 hover:bg-slate-50`} to="#0">
                <span className="block text-sm mb-2">
                  📣{" "}
                  <span className="font-medium text-slate-800">
                    Edit your information in a swipe
                  </span>{" "}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-slate-400">
                  Feb 12, 2021
                </span>
              </Link>
            </li>
            <li className="border-b border-slate-200 last:border-0">
              <Link className="block py-2 px-4 hover:bg-slate-50" to="#0">
                <span className="block text-sm mb-2">
                  📣{" "}
                  <span className="font-medium text-slate-800">
                    Edit your information in a swipe
                  </span>{" "}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-slate-400">
                  Feb 9, 2021
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default Notifications;
