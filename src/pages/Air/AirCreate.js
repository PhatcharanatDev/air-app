// import AirForm from "../../components/air/AirForm";
import React, { useState, useEffect } from "react";
import { message, Select } from "antd";
import AirDataService from "../../services/air.service";
import PlaceDataService from "../../services/place.service";
const { Option } = Select;

const AirCreate = () => {
  const initialAirState = {
    brand: "",
    model: "",
    btu: "",
    fla: "",
    placeId: "",
  };

  const [air, setAir] = useState(initialAirState);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    retrievePlaces();
  }, []);

  const retrievePlaces = () => {
    PlaceDataService.getAll()
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Set initialAirState
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAir({ ...air, [name]: value });
  };

  const handleSelectChange = (value, event) => {
    setAir({ ...air, ["placeId"]: value });
  };

  const saveAir = () => {
    const { brand, model, btu, fla, placeId } = air;

    if (!brand || !model || !btu || !fla || !placeId) {
      message.warning("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    AirDataService.create({ brand, model, btu, fla, placeId })
      .then((response) => {
        setAir(initialAirState);
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

      <div className="p-6 w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="brand"
                id="brand"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={air.brand}
                onChange={handleInputChange}
              />
              <label
                htmlFor="model"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Brand
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="model"
                id="model"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={air.model}
                onChange={handleInputChange}
              />
              <label
                htmlFor="model"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Model
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="btu"
                id="btu"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={air.btu}
                onChange={handleInputChange}
              />
              <label
                htmlFor="btu"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Btu
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="fla"
                id="fla"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={air.fla}
                onChange={handleInputChange}
              />
              <label
                htmlFor="fla"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Fla
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                เลือกสถานที่
              </label>
              <Select
                allowClear
                showSearch
                placeholder="อาคาร 00 | ชั้น 0 | ห้อง 000"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                className="w-full"
                value={air.placeId}
                onChange={handleSelectChange}
              >
                {places.map((place, index) => (
                  <Option key={index} value={place.id}>{place.name}</Option>
                ))}
              </Select>
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

export default AirCreate;
