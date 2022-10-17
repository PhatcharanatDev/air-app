import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ChecklistDataService from "../../services/checklist.service";
import CheckListDateForm from "../../components/checklistDate/ChecklistDateForm";

const ChecklistUpdate = () => {
    const { id } = useParams();
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

  useEffect(() => {
    retrieveChecklist(id);
  }, [id]);

  const retrieveChecklist = (id) => {
    if (id) {
      setTimeout(() => {
        ChecklistDataService.get(id)
          .then((response) => {
            setChecklist(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }, 100);
    }
  };

  const saveChecklist = () => {
    const { airId } = checklist;

    if (!airId) {
      message.warning("กรุณาเข้าหน้านี้โดยการกดปุ่มสร้างรายการตรวจเช็ค");
      return;
    }

    ChecklistDataService.update(airId, checklist)
      .then((response) => {
        setChecklist(initialChecklistState);
        console.log(response.data);
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
        แก้ไขรายการตรวจเช็ค AirId : {location.state?.airId}
      </h1>

      <CheckListDateForm
        checklist={checklist}
        onChecklistDataChange={setChecklist}
        onSaveChecklist={saveChecklist}
      />
    </div>
  );
};

export default ChecklistUpdate;
