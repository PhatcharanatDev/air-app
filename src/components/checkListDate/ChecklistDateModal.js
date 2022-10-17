import { Button, Modal, Checkbox } from "antd";
import moment from "moment";

const ChecklistDateModal = ({ checklist, isModalOpen, onModalChange }) => {
  const handleCancel = () => {
    onModalChange(false);
  };

  return (
    <Modal
      title={
        "ข้อมูลการตรวจเช็ค " +
        "(" +
        moment(checklist.createdAt).format("LL") +
        ")"
      }
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
      width={1000}
    >
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
          <div>
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
              <p>{checklist.voltage}</p>
            </div>
            <div className="flex justify-between">
              <p>ampere</p>
              <p>{checklist.ampere}</p>
            </div>
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
          </div>
          <div>
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
              <Checkbox checked={checklist.magnetic_coil_contactor}></Checkbox>
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
  );
};

export default ChecklistDateModal;
