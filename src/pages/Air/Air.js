import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Service
import AirDataService from "../../services/air.service";

import { Spin, Modal, message } from "antd";
import AirTable from "../../components/air/AirTable";
const { confirm } = Modal;

const Air = () => {
  const [airs, setAirs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrieveSuccess, setIsRetrieveSuccess] = useState(false);

  useEffect(() => {
    retrieveAirs();
  }, [isRetrieveSuccess]);

  const retrieveAirs = () => {
    setIsRetrieveSuccess(false)
    setIsLoading(true);
    setTimeout(() => {
      AirDataService.getAll()
        .then((response) => {
          setAirs(response.data);
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
            message.success("ลบรายการสำเร็จ");
            setIsRetrieveSuccess(true)
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
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
          <AirTable airs={airs} onDeleteAir={deleteAir} />
        )}
      </div>
    </div>
  );
};

export default Air;
