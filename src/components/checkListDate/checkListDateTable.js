
import { BiEdit, BiListUl, BiTrash } from "react-icons/bi";

const checkListTable = () => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
      <table className="w-full text-sm text-left text-dark-purple dark:text-gray-400">
        <thead className="text-xs text-dark-purple bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="text-base py-3 px-6 whitespace-nowrap">
              #
            </th>
            <th
              scope="col"
              className="text-base text-base py-3 px-6 whitespace-nowrap"
            >
              วันที่ตรวจเช็ค
            </th>

            <th scope="col" className="text-base py-3 px-6 whitespace-nowrap">
              สถานะ
            </th>

            <th
              scope="col"
              className="text-base py-3 px-6 whitespace-nowrap"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td className="text-sm py-4 px-6 whitespace-nowrap">CL00001</td>
            <td className="text-sm py-4 px-6 whitespace-nowrap">2565/12/10</td>

            <td className="text-sm py-4 px-6  whitespace-nowrap">
              <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                เสร็จสิ้น
              </span>
            </td>
            <td className="text-sm py-4 px-6  whitespace-nowrap">
              <button
                type="button"
                className="text-dark-purple bg-slate-200 hover:bg-slate-300  rounded-lg text-sm px-3 py-1.5 text-center mr-2 "
              >
                <BiListUl className="text-xl" />
              </button>
              <button
                type="button"
                className="text-dark-purple bg-slate-200 hover:bg-slate-300  rounded-lg text-sm px-3 py-1.5 text-center mr-2 "
              >
                <BiEdit className="text-xl" />
              </button>
              <button
                type="button"
                className="text-dark-purple bg-slate-200 hover:bg-slate-300  rounded-lg text-sm px-3 py-1.5 text-center mr-2"
              >
                <BiTrash className="text-xl" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default checkListTable;
