import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Service
import AirDataService from "../../services/air.service";

import moment from "moment";
import QRCode from "react-qr-code";
import { BiEdit, BiListUl, BiTrash } from "react-icons/bi";
import { Spin, Modal, message } from "antd";
const { confirm } = Modal;

const Air = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    retrieveAirs();
  }, []);

  const retrieveAirs = () => {
    setIsLoading(true);
    setTimeout(() => {
      AirDataService.getAll()
        .then((response) => {
          showData(response.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 1000);
  };

  const deleteAir = (id) => {
    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะลบรายการนี้",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        AirDataService.delete(id)
          .then((response) => {
            console.log(response.data);
            message.success("ลบรายการสำเร็จ");
            retrieveAirs();
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
  };

  const showData = (airs) => {
    let tb = (
      <table className="w-full text-sm text-left ">
        <thead className="text-xs text-dark-purple bg-gray-50 ">
          <tr>
            <th
              scope="col"
              className="text-sm md:text-base py-3 px-6 whitespace-nowrap"
            >
              อาคาร/ชั้น/ห้อง
            </th>
            <th
              scope="col"
              className="text-sm md:text-base py-3 px-6 whitespace-nowrap"
            >
              รหัสแอร์
            </th>
            <th
              scope="col"
              className="text-sm md:text-base py-3 px-6 whitespace-nowrap"
            >
              ตรวจครั้งถัดไป
            </th>

            <th
              scope="col"
              className="text-sm md:text-base py-3 px-6 whitespace-nowrap"
            >
              ตรวจล่าสุด
            </th>

            <th
              scope="col"
              className="text-sm md:text-base py-3 px-6 whitespace-nowrap"
            >
              QR Code
            </th>
            <th
              scope="col"
              className="text-sm md:text-base py-3 px-6 whitespace-nowrap"
            ></th>
          </tr>
        </thead>
        <tbody>
          {airs.map((air, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="text-sm py-4 px-6 whitespace-nowrap">
                {air.place.name}
              </td>
              <td className="text-sm py-4 px-6"> {air.no}</td>
              <td className="text-sm py-4 px-6">
                {air.next_check === null
                  ? "ไม่มีการตรวจเช็ค"
                  : moment(air.next_check).format("LL")}
              </td>
              <td className=" py-4 px-6 whitespace-nowrap">
                {air.checklists.length > 0 ? (
                  air.checklists.map((checklist, index) => (
                    <div key={index}>
                      <span className="text-sm mr-2">
                        {moment(checklist.createdAt).format("LL")}
                      </span>
                      <span
                        className={
                          checklist.status === 1
                            ? "bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                            : "bg-red-100 text-red-800  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                        }
                      >
                        {checklist.status === 1 ? "เสร็จสิ้น" : "ไม่เสร็จสิ้น"}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-sm py-4 px-6">ไม่มีการตรวจเช็ค</span>
                )}
              </td>

              <td className="text-sm py-4 px-6">
                <div className="flex flex-col items-center p-3 bg-slate-200 rounded-lg">
                  <QRCode
                    value="https://flowbite.com/docs/components/buttons/"
                    size={60}
                    className="mb-1"
                  />
                  <span className="text-sm">{air.no}</span>
                </div>
              </td>
              <td className="text-sm py-4 px-6 ">
                <Link to={"/airs/checklistdate/" + air.id}>
                  <button
                    type="button"
                    className="text-dark-purple bg-slate-200 hover:bg-slate-300  rounded-lg text-sm px-3 py-1.5 text-center mr-2 mb-2"
                  >
                    <BiListUl className="text-xl" />
                  </button>
                </Link>
                <button
                  type="button"
                  className="text-dark-purple bg-slate-200 hover:bg-slate-300  rounded-lg text-sm px-3 py-1.5 text-center mr-2 mb-2"
                >
                  <BiEdit className="text-xl" />
                </button>
                <button
                  onClick={() => deleteAir(air.id)}
                  type="button"
                  className="text-dark-purple bg-slate-200 hover:bg-slate-300  rounded-lg text-sm px-3 py-1.5 text-center mr-2 mb-2"
                >
                  <BiTrash className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    setData(tb);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-base md:text-2xl text-dark-purple font-semibold mb-0">
          รายการแอร์
        </h1>
        <Link to="/airs/create">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-xs md:text-base px-3 py-1.5  focus:outline-none "
          >
            สร้างข้อมูลแอร์
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
        {isLoading ? (
          <div className="flex justify-center p-10">
            <Spin tip="กำลังโหลดข้อมูล..." size="large" />
          </div>
        ) : (
          data
        )}
      </div>

    </div>
  );
};

export default Air;
