import React , { useState } from "react";
import { message } from "antd";
import AirDataService from "../../services/air.service";

import AirForm from "../../components/air/AirForm";

const AirCreate = () => {

  const initialState = {
    brand: "",
    model: "",
    btu: "",
    fla: "",
    placeId: "",
  };

  const [air, setAir] = useState(initialState);

  const saveAir = () => {
    // console.log(air);
    const { brand, model, btu, fla, placeId } = air;

    if (!brand || !model || !btu || !fla || !placeId) {
      message.warning("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    AirDataService.create({ brand, model, btu, fla, placeId })
      .then((response) => {
        setAir(initialState)
        message.success("บันทึกข้อมูลสำเร็จ");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1 className="text-2xl text-dark-purple font-semibold mb-8">
        สร้างข้อมูลแอร์
      </h1>

      <AirForm air={air} onAirDataChange={setAir} onSaveAir={saveAir} />
    </div>
  );
};

export default AirCreate;
