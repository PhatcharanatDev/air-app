import React, { useState } from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { message, Checkbox, Input, Switch } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import ChecklistDataService from "../../services/checklist.service";
const { TextArea } = Input;

const ChecklistCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialChecklistState = {
    fan_coil_filter: 0,
    air_machine: 0,
    cooling_coil: 0,
    refrigerant_pressure_hside: 0,
    refrigerant_pressure_lside: 0,
    belt_cooling: 0,
    cold_air_nozzle: 0,
    return_air_duct: 0,
    reagent_pipe_system: 0,
    insulation_air_duct: 0,
    electrical_wire: 0,
    electrical_wire_clamp: 0,
    electrical_connector: 0,
    voltage: 0,
    ampere: 0,
    oil_pressure: 0,
    air_body: 0,
    drip_tray: 0,
    sewer: 0,
    condersing_coil: 0,
    mounting_bracket: 0,
    hl_pressure_switch: 0,
    magnetic_coil_contactor: 0,
    overload_protection: 0,
    times_delay_relay: 0,
    control_tranformer: 0,
    thermostat: 0,
    remark: "",
    prices: 0,
    status: 0,
    airId: location.state?.airId,
  };

  const [checklist, setChecklist] = useState(initialChecklistState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChecklist({ ...checklist, [name]: value });
  };

  const handleCheckChange = (event) => {
    const { checked, name } = event.target;
    setChecklist({ ...checklist, [name]: checked ? 1 : 0 });
  };

  const handleSwitchChange = (checked) => {
    setChecklist({...checklist, status: checked ? 1 : 0 });
  };

  const saveAir = () => {
    const { airId } = checklist;
    
    if (!airId) {
      message.warning("กรุณาเข้าหน้านี้โดยการกดปุ่มสร้างรายการตรวจเช็ค");
      return;
    }

    ChecklistDataService.create(checklist)
      .then((response) => {
        setChecklist(initialChecklistState);
        console.log(response.data);
        if(response.data.createStatus === 0){
          message.error("รายการตรวจเช็ควันนี้ถูกสร้างไว้แล้ว", 5);
          navigate(-1);
          return;
        }
        message.success("บันทึกข้อมูลสำเร็จ");
        navigate(-1); 
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1 className="text-2xl text-dark-purple font-semibold mb-8">
        สร้างรายการตรวจเช็ค AirId : {location.state?.airId}
      </h1>

      <div className="p-6 w-full bg-white rounded-lg border border-gray-200 shadow-md">
        <form className="p-3 md:p-8">
          <div className="grid grid-cols-1">
            <div className="flex justify-between">
              <h1 className=" text-lg text-gray-900 ">Status</h1>
              <Switch
                onChange={handleSwitchChange}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </div>
          </div>
          <hr className="mb-8" />
          <div className="grid grid-rows-27 md:grid-rows-15 grid-flow-col gap-4">
            <div className="flex justify-between">
              <p>fan_coil_filter</p>
              <Checkbox
                name="fan_coil_filter"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>air_machine</p>
              <Checkbox
                name="air_machine"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>cooling_coil</p>
              <Checkbox
                name="cooling_coil"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>refrigerant_pressure_hside</p>
              <Input
                name="refrigerant_pressure_hside"
                style={{
                  width: "18%",
                }}
                size="small"
                type="number"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between">
              <p>refrigerant_pressure_lside</p>
              <Input
                name="refrigerant_pressure_lside"
                style={{
                  width: "18%",
                }}
                size="small"
                type="number"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between">
              <p>belt_cooling</p>
              <Checkbox
                name="belt_cooling"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>cold_air_nozzle</p>
              <Checkbox
                name="cold_air_nozzle"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>return_air_duct</p>
              <Checkbox
                name="return_air_duct"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>reagent_pipe_system</p>
              <Checkbox
                name="reagent_pipe_system"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>insulation_air_duct</p>
              <Checkbox
                name="insulation_air_duct"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>electrical_wire</p>
              <Checkbox
                name="electrical_wire"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>electrical_wire_clamp</p>
              <Checkbox
                name="electrical_wire_clamp"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>electrical_connector</p>
              <Checkbox
                name="electrical_connector"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>voltage</p>
              <Input
                name="voltage"
                style={{
                  width: "18%",
                }}
                size="small"
                type="number"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between">
              <p>ampere</p>
              <Input
                name="ampere"
                style={{
                  width: "18%",
                }}
                size="small"
                type="number"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between">
              <p>oil_pressure</p>
              <Checkbox
                name="oil_pressure"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>air_body</p>
              <Checkbox
                name="air_body"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>drip_tray</p>
              <Checkbox
                name="drip_tray"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>sewer</p>
              <Checkbox name="sewer" onChange={handleCheckChange}></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>condersing_coil</p>
              <Checkbox
                name="condersing_coil"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>mounting_bracket </p>
              <Checkbox
                name="mounting_bracket"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>hl_pressure_switch</p>
              <Checkbox
                name="hl_pressure_switch"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>magnetic_coil_contactor</p>
              <Checkbox
                name="magnetic_coil_contactor"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>overload_protection</p>
              <Checkbox
                name="overload_protection"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>times_delay_relay</p>
              <Checkbox
                name="times_delay_relay"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>control_tranformer</p>
              <Checkbox
                name="control_tranformer"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
            <div className="flex justify-between">
              <p>thermostat</p>
              <Checkbox
                name="thermostat"
                onChange={handleCheckChange}
              ></Checkbox>
            </div>
          </div>
          <hr className="my-8" />
          <div className="grid grid-cols-1">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Remark
              </label>
              <TextArea
                showCount
                name="remark"
                maxLength={100}
                style={{
                  height: 120,
                }}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-center md:justify-end mt-5">
          <button
            type="button"
            onClick={saveAir}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-base px-3 py-1.5  focus:outline-none "
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistCreate;
