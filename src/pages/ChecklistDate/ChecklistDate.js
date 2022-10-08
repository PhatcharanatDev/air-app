import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Modal, Checkbox, message } from "antd";
import { BiEdit, BiListUl, BiTrash } from "react-icons/bi";
import moment from "moment";
import { Spin } from "antd";

// Service
import ChecklistDataService from "../../services/checklist.service";

const { confirm } = Modal;

const CheckListDate = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checklist, setChecklist] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    retrieveChecklists()
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const retrieveChecklists = () => {
    if (id) {
      setIsLoading(true);
      setTimeout(() => {
        ChecklistDataService.getAllByAir(id)
          .then((response) => {
            showData(response.data);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }, 1000);
    }
  };

  const getChecklist = (id) => {
    ChecklistDataService.get(id)
      .then((response) => {
        setChecklist(response.data);
        console.log(response.data);
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
            console.log(response.data);
            message.success("ลบรายการสำเร็จ");
            retrieveChecklists()
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
  };

  const showData = (checklists) => {
    let tb = (
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
              <td className="text-sm py-4 px-6 whitespace-nowrap">
                {index+1}
              </td>
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
                  onClick={() => getChecklist(checklist.id)}
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
                  onClick={() => deleteChecklist(checklist.id)}
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
    setData(tb);
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
          data
        )}
      </div>

      <Modal
        title={"ข้อมูลการตรวจเช็ค " + "(" + moment(checklist.createdAt).format("LL") + ")"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        width={600}
      >
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between">
                <p>fan_coil_filter</p>
                <Checkbox checked={checklist.fan_coil_filter}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>air_machine</p>
                <Checkbox checked={checklist.air_machine}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>cooling_coil</p>
                <Checkbox checked={checklist.cooling_coil}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>refrigerant_pressure_hside</p>
                <p>{checklist.refrigerant_pressure_hside}</p>
              </div>
              <div className="flex justify-between">
                <p>refrigerant_pressure_lside</p>
                <p>{checklist.refrigerant_pressure_lside}</p>
              </div>
              <div className="flex justify-between">
                <p>belt_cooling</p>
                <Checkbox checked={checklist.belt_cooling}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>cold_air_nozzle</p>
                <Checkbox checked={checklist.cold_air_nozzle}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>return_air_duct</p>
                <Checkbox checked={checklist.return_air_duct}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>reagent_pipe_system</p>
                <Checkbox checked={checklist.reagent_pipe_system}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>insulation_air_duct</p>
                <Checkbox checked={checklist.insulation_air_duct}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>electrical_wire</p>
                <Checkbox checked={checklist.electrical_wire}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>electrical_wire_clamp</p>
                <Checkbox checked={checklist.electrical_wire_clamp}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>electrical_connector</p>
                <Checkbox checked={checklist.electrical_connector}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>voltage</p>
                <p>1.1</p>
              </div>
              <div className="flex justify-between">
                <p>ampere</p>
                <p>1.1</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p>oil_pressure</p>
                <Checkbox checked={checklist.oil_pressure}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>air_body</p>
                <Checkbox checked={checklist.air_body}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>drip_tray</p>
                <Checkbox checked={checklist.drip_tray}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>sewer</p>
                <Checkbox checked={checklist.sewer}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>condersing_coil</p>
                <Checkbox checked={checklist.condersing_coil}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>mounting_bracket </p>
                <Checkbox checked={checklist.mounting_bracket}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>hl_pressure_switch</p>
                <Checkbox checked={checklist.hl_pressure_switch}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>magnetic_coil_contactor</p>
                <Checkbox
                  checked={checklist.magnetic_coil_contactor}
                ></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>overload_protection</p>
                <Checkbox checked={checklist.overload_protection}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>times_delay_relay</p>
                <Checkbox checked={checklist.times_delay_relay}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>control_tranformer</p>
                <Checkbox checked={checklist.control_tranformer}></Checkbox>
              </div>
              <div className="flex justify-between">
                <p>thermostat</p>
                <Checkbox checked={checklist.thermostat}></Checkbox>
              </div>
            </div>
          </div>
          <hr className="my-8" />
          <div className="grid grid-cols-1">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Remark
              </label>
              <textarea
                id="message"
                rows="4"
                defaultValue={checklist.remark}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              ></textarea>
            </div>
          </div>
          {/* <hr className="my-8" />
          <div className="flex justify-end">
            <div>
              <h1 className="text-xl text-red-500"> 3,000 THB </h1>
            </div>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default CheckListDate;
