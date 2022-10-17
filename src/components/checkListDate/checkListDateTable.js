import React from "react";
import { Link } from "react-router-dom";
import { BiEdit, BiListUl, BiTrash } from "react-icons/bi";
import moment from "moment";

const ChecklistDateTable = ({
  checklists,
  onGetChecklist,
  onDeleteChecklist,
}) => {
  return (
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
        {checklists.map((checklist, index) => (
          <tr
            key={index}
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
          >
            <td className="text-sm py-4 px-6 whitespace-nowrap">{index + 1}</td>
            <td className="text-sm py-4 px-6 whitespace-nowrap">
              {checklist.createdAt === null
                ? "ไม่มีการตรวจเช็ค"
                : moment(checklist.createdAt).format("LL")}
            </td>

            <td className="text-sm py-4 px-6  whitespace-nowrap">
              <span
                className={
                  checklist.status === 1
                    ? "bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                    : "bg-red-100 text-red-800  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                }
              >
                {checklist.status === 1 ? "เสร็จสิ้น" : "ไม่เสร็จสิ้น"}
              </span>
            </td>
            <td className="text-sm py-4 px-6  whitespace-nowrap">
              <button
                onClick={() => onGetChecklist(checklist.id)}
                type="button"
                className="text-dark-purple bg-slate-200 hover:bg-slate-300  rounded-lg text-sm px-3 py-1.5 text-center mr-2 "
              >
                <BiListUl className="text-xl" />
              </button>

              <Link to={"/checklistdate/update/" + checklist.id}>
                <button
                  type="button"
                  className="text-dark-purple bg-slate-200 hover:bg-slate-300  rounded-lg text-sm px-3 py-1.5 text-center mr-2 "
                >
                  <BiEdit className="text-xl" />
                </button>
              </Link>
              <button
                onClick={() => onDeleteChecklist(checklist.id)}
                type="button"
                className="text-dark-purple bg-slate-200 hover:bg-slate-300  rounded-lg text-sm px-3 py-1.5 text-center mr-2"
              >
                <BiTrash className="text-xl" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ChecklistDateTable;
