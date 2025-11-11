"use client";
import {
  HomeOutlined,
  ShoppingOutlined,
  UsergroupDeleteOutlined,
  FilterOutlined,
  UndoOutlined,
} from "@ant-design/icons";
export default function Dashboard() {
  const stats = [
    {
      label: "Tổng số phòng",
      value: 3,
      icon: HomeOutlined,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Tổng số đơn hàng",
      value: 7,
      icon: ShoppingOutlined,
      color: "bg-gray-100 text-green-600",
    },
    {
      label: "Tổng số user",
      value: 6,
      icon: UsergroupDeleteOutlined,
      color: "bg-gray-100 text-blue-600",
    },
  ];
  return (
    <>
      <main className="p-6 space-y-6">
        {/* Cards thống kê */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}
              >
                <Icon className="text-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Biểu đồ & Thống kê doanh số */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thống kê doanh số */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-gray-700 mb-4">
              Thống kê doanh số
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="date"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100"
              />
              <input
                type="date"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100"
              />
              <button className="flex items-center gap-1 bg-blue-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-700 transition">
                <FilterOutlined size={17} />
                Lọc kết quả
              </button>
              <button className="flex items-center gap-1 bg-gray-100 text-gray-600 text-sm px-3 py-2 rounded-lg hover:bg-gray-200 transition">
                <UndoOutlined size={17} />
                Refresh
              </button>
            </div>
            <div className="border border-dashed border-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-400">
              (Biểu đồ doanh số hiển thị tại đây)
            </div>
          </div>

          {/* Biểu đồ sản phẩm */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-gray-700 mb-4">
              Số lượng sản phẩm được mua theo danh mục
            </h2>
            <div className="flex items-center justify-center h-64">
              <img
                src="https://quickchart.io/chart?c={type:'pie',data:{labels:['Giày Nam','Giày Nữ'],datasets:[{data:[50,50],backgroundColor:['#f472b6','#22d3ee']}]}}"
                alt="Pie chart"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
