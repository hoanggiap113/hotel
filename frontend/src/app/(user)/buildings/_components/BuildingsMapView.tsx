"use client";
import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HomeOutlined } from "@ant-design/icons";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import Image from "next/image";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { IBuilding } from "@/types/building.type";

interface BuildingsMapViewProps {
  buildings: IBuilding[];
  checkIn?: string;
  checkOut?: string;
}

// Tạo custom icon cho marker
const createCustomIcon = (isSelected: boolean = false) => {
  const iconMarkup = renderToStaticMarkup(
    <div
      style={{
        background: isSelected ? "#dc2626" : "#2563eb",
        borderRadius: "50%",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        border: isSelected ? "3px solid white" : "none",
      }}
    >
      <HomeOutlined style={{ fontSize: "20px", color: "white" }} />
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: "custom-marker-icon",
    iconSize: isSelected ? [44, 44] : [40, 40],
    iconAnchor: isSelected ? [22, 44] : [20, 40],
    popupAnchor: [0, isSelected ? -44 : -40],
  });
};

export default function BuildingsMapView({
  buildings,
  checkIn,
  checkOut,
}: BuildingsMapViewProps) {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);

  // Tính toán center và bounds của map dựa trên tất cả buildings
  const mapConfig = useMemo(() => {
    if (buildings.length === 0) {
      return {
        center: [21.0285, 105.8542] as [number, number], // Hà Nội mặc định
        zoom: 12,
      };
    }

    // Tính trung bình tọa độ
    const latSum = buildings.reduce(
      (sum, b) => sum + (b.geo?.coordinates[1] || 0),
      0
    );
    const lngSum = buildings.reduce(
      (sum, b) => sum + (b.geo?.coordinates[0] || 0),
      0
    );

    return {
      center: [
        latSum / buildings.length,
        lngSum / buildings.length,
      ] as [number, number],
      zoom: 13,
    };
  }, [buildings]);

  // Tạo query string cho link
  const createBuildingLink = (buildingId: string) => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    return `/buildings/${buildingId}?${params.toString()}`;
  };

  return (
    <div className="w-full h-full relative">
      <style jsx global>{`
        .custom-marker-icon {
          background: transparent;
          border: none;
          transition: all 0.2s ease;
        }
        
        .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .leaflet-popup-content {
          margin: 0;
          width: 280px !important;
        }
        
        .leaflet-popup-tip {
          background: white;
        }
        
        .leaflet-container {
          height: 100%;
          border-radius: 12px;
          z-index: 0;
        }

        .leaflet-popup-close-button {
          font-size: 20px !important;
          padding: 8px !important;
        }
      `}</style>

      <MapContainer
        center={mapConfig.center}
        zoom={mapConfig.zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {buildings.map((building) => {
          if (!building.geo?.coordinates) return null;

          const position: [number, number] = [
            building.geo.coordinates[1], // latitude
            building.geo.coordinates[0], // longitude
          ];

          const isSelected = selectedBuildingId === building.id;

          return (
            <Marker
              key={building.id}
              position={position}
              icon={createCustomIcon(isSelected)}
              eventHandlers={{
                click: () => setSelectedBuildingId(building.id || null),
              }}
            >
              <Popup>
                <div className="w-full bg-white">
                  {/* Image */}
                  {building.images?.[0] && (
                    <div className="relative w-full h-36">
                      <Image
                        src={building.images[0]}
                        alt={building.name || "Building"}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2">
                      {building.name}
                    </h3>

                    {/* Rating */}
                    {building.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="font-semibold text-gray-700 text-sm">
                          {building.rating.average.toFixed(1)}
                        </span>
                        <span className="text-gray-500 text-xs">
                          ({building.rating.reviewsCount})
                        </span>
                      </div>
                    )}

                    {/* Location */}
                    {building.location && (
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
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
                      <div className="flex items-center justify-between mb-3 pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-600">Giá từ:</span>
                        <span className="font-bold text-blue-600 text-base">
                          {building.price.toLocaleString("vi-VN")} VNĐ
                        </span>
                      </div>
                    )}

                    {/* View Details Button */}
                    <Link
                      href={createBuildingLink(building.id || "")}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}