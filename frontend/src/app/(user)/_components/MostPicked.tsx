import { Tabs } from "antd";
import Image from "next/image";
export default function MostPicked() {
    
  
    return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Tiêu đề */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Những chỗ nghỉ nổi bật được đề xuất cho quý khách:
            </h2>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Xem thêm các chỗ nghỉ (Hồ Chí Minh) →
            </a>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-200 mb-8">
            {["Hồ Chí Minh", "Hà Nội", "Vũng Tàu", "Đà Nẵng", "Đà Lạt"].map(
              (city, i) => (
                <button
                  key={i}
                  className={`pb-2 text-gray-700 font-medium ${
                    i === 0
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  {city}
                </button>
              )
            )}
          </div>

          {/* Grid sản phẩm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group flex flex-col rounded-xl bg-white shadow overflow-hidden"
              >
                {/* Ảnh */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/example2.jpg"
                    alt="Ảnh phòng"
                    fill
                    className="object-cover "
                  />
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded">
                    8.{item}
                  </span>
                </div>

                {/* Nội dung */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-base leading-snug">
                      Khách sạn Pynt 2 (Pynt Hotel 2)
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <span className="text-orange-400 mr-1">★★★★★</span>
                      <span className="text-blue-600 ml-1">
                        Gò Vấp, Hồ Chí Minh
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      Giá mỗi đêm chưa gồm thuế và phí
                    </p>
                  </div>

                  <p className="text-red-600 font-bold text-lg mt-3">
                    VND 430,526
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
