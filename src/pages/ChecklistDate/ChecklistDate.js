import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal, message } from "antd";
import { Spin } from "antd";

// Service
import ChecklistDataService from "../../services/checklist.service";
import ChecklistDateTable from "../../components/checklistDate/ChecklistDateTable";
import ChecklistDateModal from "../../components/checklistDate/ChecklistDateModal";

const { confirm } = Modal;

const CheckListDate = () => {
  const { id } = useParams();
  const [checklist, setChecklist] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    retrieveChecklists();
  }, []);

  const retrieveChecklists = () => {
    if (id) {
      setIsLoading(true);
      setTimeout(() => {
        ChecklistDataService.getAllByAir(id)
          .then((response) => {
            setChecklists(response.data);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }, 500);
    }
  };

  const getChecklist = (id) => {
    ChecklistDataService.get(id)
      .then((response) => {
        setChecklist(response.data);
        setIsModalOpen(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteChecklist = (id) => {
    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะลบรายการนี้",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        ChecklistDataService.delete(id)
          .then((response) => {
            message.success("ลบรายการสำเร็จ");
            retrieveChecklists();
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
          รายการตรวจเช็ค
        </h1>
        <Link to="/checklistdate/create" state={{ airId: id }}>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-xs md:text-base px-3 py-1.5  focus:outline-none "
          >
            สร้างรายการตรวจเช็ค
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
        {isLoading ? (
          <div className="flex justify-center p-10">
            <Spin tip="กำลังโหลดข้อมูล..." size="large" />
          </div>
        ) : (
          <ChecklistDateTable
            checklists={checklists}
            onGetChecklist={getChecklist}
            onDeleteChecklist={deleteChecklist}
          />
        )}
      </div>

      <ChecklistDateModal
        checklist={checklist}
        isModalOpen={isModalOpen}
        onModalChange={setIsModalOpen}
      />
    </div>
  );
};

export default CheckListDate;
