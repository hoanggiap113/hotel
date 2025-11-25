import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useDestinations } from "@/hooks/queries/rooms/use-room";

export default function PlaceSection() {
  const {data: destinations} = useDestinations();
  return (
    <>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-2xl font-bold text-black mb-6">
            Các điểm đến của chúng tôi
          </h2>

          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={4}
            navigation
            breakpoints={{
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 4.5 },
            }}
          >
            {destinations?.map((item) => (
              <SwiperSlide key={item.name}>
                <div className="group">
                  <div className="relative h-48 w-full rounded-xl overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover"
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
    </>
  );
}
