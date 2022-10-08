import { BsCheckAll, BsFillGrid3X3GapFill, BsFillReplyAllFill } from "react-icons/bs";

const DashboardCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
      <div className="rounded  bg-white border-b-8 border-dark-purple  p-5 flex flex-col items-end drop-shadow-lg relative">
        <BsCheckAll
          size={60}
          className="absolute left-8 -top-4 bg-white text-dark-purple p-4 drop-shadow-md"
        />
        <h2 className="text-lg font-semibold mb-2">รายการวันนี้</h2>
        <span className="text-base ">0/20</span>
      </div>
      <div className="rounded  bg-white border-b-8 border-dark-purple  p-5 flex flex-col items-end drop-shadow-lg relative">
        <BsFillReplyAllFill
          size={60}
          className="absolute left-8 -top-4 bg-white text-dark-purple p-4 drop-shadow-md"
        />
        <h2 className="text-lg font-semibold mb-2">รายการตกค้าง</h2>
        <span className="text-base ">10</span>
      </div>
      <div className="rounded  bg-white border-b-8 border-dark-purple  p-5 flex flex-col items-end drop-shadow-lg relative">
        <BsFillGrid3X3GapFill
          size={60}
          className="absolute left-8 -top-4 bg-white text-dark-purple p-4 drop-shadow-md"
        />
        <h2 className="text-lg font-semibold mb-2">จำนวนแอร์ทั้งหมด</h2>
        <span className="text-base ">40</span>
      </div>
    </div>
  );
};

export default DashboardCard;
