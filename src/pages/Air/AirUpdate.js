import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import { Spin } from "antd";

import AirDataService from "../../services/air.service";
import AirForm from "../../components/air/AirForm";

const AirUpdate = () => {
  const initialState = {
    brand: "",
    model: "",
    btu: "",
    fla: "",
    placeId: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [air, setAir] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    retrieveAirs(id);
  }, [id]);

  const retrieveAirs = (id) => {
    if (id) {
      setIsLoading(true);
      setTimeout(() => {
        AirDataService.get(id)
          .then((response) => {
            setAir(response.data);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }, 100);
    }
  };

  const saveAir = () => {
    // console.log(air);
    const { brand, model, btu, fla, placeId } = air;

    if (!brand || !model || !btu || !fla || !placeId) {
      message.warning("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    AirDataService.update(id, { brand, model, btu, fla, placeId })
      .then((response) => {
        setAir(initialState);
        message.success("แก้ไขข้อมูลสำเร็จ");
        navigate(-1);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1 className="text-2xl text-dark-purple font-semibold mb-8">
        แก้ไขข้อมูลแอร์
      </h1>

      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spin tip="กำลังโหลดข้อมูล..." size="large" />
        </div>
      ) : (
        <AirForm air={air} onAirDataChange={setAir} onSaveAir={saveAir} />
      )}
    </div>
  );
};

export default AirUpdate;
