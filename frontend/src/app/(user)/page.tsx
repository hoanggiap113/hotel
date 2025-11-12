/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import SearchBar from "./component/SearchBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
export default function HomePage() {
  const information = [
    { label: "Bed", total: 3500 },
    { label: "Hotels", total: 200 },
    { label: "Cities", total: 5 },
  ];
  const destinations = [
    { name: "Hà Nội", img: "/hanoi.jpg", stays: "15,546 chỗ ở" },
    { name: "Đà Nẵng", img: "/danang.jpg", stays: "9,321 chỗ ở" },
    { name: "TP. Hồ Chí Minh", img: "/hcm.png", stays: "21,785 chỗ ở" },
    { name: "Nha Trang", img: "/nhatrang.jpg", stays: "7,234 chỗ ở" },
    { name: "Vũng Tàu", img: "/vungtau.jpg", stays: "4,856 chỗ ở" },
  ];

  return (
    <>
      <section className="mt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-16">
          {/* Left side */}
          <div className="flex flex-col max-w-xl space-y-6 ml-5">
            <h1 className="font-bold text-5xl leading-tight text-gray-900">
              Forget busy work, <br />
              <span className="text-blue-600">start your next vacation</span>
            </h1>

            <p className="text-gray-600 text-lg">
              We provide everything you need to enjoy your trip — from cozy
              hotels to relaxing destinations.
            </p>

            <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg w-fit shadow hover:bg-blue-700 transition">
              Show Me Now
            </button>

            {/* Info section */}
            <div className="flex flex-row justify-between md:justify-start md:gap-16 mt-10">
              {information.map((info) => (
                <div
                  key={info.label}
                  className="flex flex-col items-center text-center min-w-[80px]"
                >
                  <span className="text-3xl font-bold text-gray-900 leading-none">
                    {info.total.toLocaleString()}+
                  </span>
                  <span className="text-gray-500 text-sm mt-1 tracking-wide uppercase">
                    {info.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side image */}
          <div className="mt-10 md:mt-0 mr-5 relative w-full md:w-[480px] h-[320px] rounded-2xl overflow-hidden shadow-lg">
            <Image src="/hero.jpg" alt="Hotel Logo" fill priority />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </section>
      {/* Search */}
      <SearchBar />

      {/* Thu hút section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-black mb-6">
            Các điểm đến của chúng tôi
          </h2>

          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={2.5} // Số phần tử hiển thị cùng lúc
            navigation // sẽ tự thêm nút trái/phải
            breakpoints={{
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 4.5 },
            }}
          >
            {destinations.map((item) => (
              <SwiperSlide key={item.name}>
                <div className="group cursor-pointer">
                  <div className="relative h-48 w-full rounded-xl overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col items-center pt-2">
                    <h3 className="font-bold text-lg text-gray-800">
                      {item.name}
                    </h3>
                    <span className="text-gray-500 text-sm">{item.stays}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* Most Picked Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
                className="group flex flex-col rounded-xl bg-white shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Ảnh */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/example2.jpg"
                    alt="Ảnh phòng"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
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
