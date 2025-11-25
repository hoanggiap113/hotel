"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HomeOutlined } from "@ant-design/icons";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import Image from "next/image";

import "leaflet/dist/leaflet.css";
import { IBuilding } from "@/types/building.type";

interface BuildingLocationMapProps {
  building: IBuilding;
}

// Tạo custom icon từ Ant Design HomeOutlined
const createCustomIcon = () => {
  const iconMarkup = renderToStaticMarkup(
    <div
      style={{
        background: "#2563eb",
        borderRadius: "50%",
        padding: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
      }}
    >
      <HomeOutlined style={{ fontSize: "24px", color: "white" }} />
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: "custom-marker-icon",
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
};

export default function BuildingLocationMap({
  building,
}: BuildingLocationMapProps) {
  const [mapReady, setMapReady] = useState(false);

  // Get coordinates from building data
  const position: [number, number] = [
    building.geo?.coordinates[1] || 21.0285, // latitude
    building.geo?.coordinates[0] || 105.8542, // longitude
  ];

  const customIcon = createCustomIcon();

  return (
    <div className="w-full relative shadow-xl rounded-xl overflow-hidden">
      <style jsx global>{`
        .custom-marker-icon {
          background: transparent;
          border: none;
        }

        .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .leaflet-popup-content {
          margin: 0;
          width: 320px !important;
        }

        .leaflet-popup-tip {
          background: white;
        }

        .leaflet-container {
          height: 450px;
          border-radius: 12px;
          z-index: 0;
        }
      `}</style>

      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "450px", width: "100%", borderRadius: "12px" }}
        whenReady={() => setMapReady(true)}
      >
        {/* OpenStreetMap Tile Layer - Hoàn toàn miễn phí */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Custom Marker with Home Icon */}
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="w-full bg-white">
              {/* Image */}
              {building.images?.[0] && (
                <div className="relative w-full h-40">
                  <Image
                    src={building.images[0]}
                    alt={building.name || "Building"}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {building.name}
                </h3>

                {/* Rating */}
                {building.rating && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-700">
                      {building.rating.average.toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({building.rating.reviewsCount} đánh giá)
                    </span>
                  </div>
                )}

                {/* Location */}
                {building.location && (
                  <p className="text-gray-600 text-sm mb-3">
                    {[
                      building.location.address,
                      building.location.ward,
                      building.location.city,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}

                {/* Price */}
                {building.price && (
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Giá từ:</span>
                    <span className="font-bold text-blue-600 text-lg">
                      {building.price.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
