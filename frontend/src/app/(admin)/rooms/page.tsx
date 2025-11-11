"use client";
import Link from "next/link";
import {
  UndoOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import api from "@/lib/api";
import formatDate from "@/lib/format-date";
import formatLocation from "@/lib/format-address";
import { useEffect, useState } from "react";
import { Table, Button, App } from "antd";
import { IRoom, RoomFilter } from "@/types/room.type";
import { useRouter } from "next/navigation";
import RoomFilterModal from "../components/rooms/RoomFilterModel";
import RoomTable from "../components/rooms/RoomTable";
import { TRoomFormInput } from "@/types/room.type";
import { RoomFormModal } from "../components/rooms/RoomFormModel";
export default function UserPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { message } = App.useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (queryFilter?: RoomFilter) => {
    try {
      let apiParams = {};
      if (queryFilter && Object.keys(queryFilter).length > 0) {
        apiParams = {
        filter: JSON.stringify(queryFilter), 
      };
      }
      setLoading(true);
      const res = await api.get("/rooms", { params: apiParams });
      const formattedRoom = res.data.map((room: IRoom) => ({
        ...room,
        address: formatLocation(room.location),
        createdAt: formatDate(room.createdAt),
        updatedAt: formatDate(room.updatedAt),
      }));
      setRooms(formattedRoom);
    } catch (err) {
      console.log("Lỗi", err);
      message.error("Không thể tải danh sách phòng");
    } finally {
      setLoading(false);
    }
  };
  const handleCreateRoom = async (data: TRoomFormInput) => {
    try {
      const room = await api.post("/rooms", data);
      console.log(data, "room");
      if (room) {
        message.success("Thêm phòng thành công rồi nheee");
      }
      fetchRooms();
    } catch (err) {
      console.log("Error: ", err);
      message.error("Lỗi khi thêm sản phẩm");
    }
  };
  const handleDeleteRoom = async (roomId: string) => {
    try {
      const confirmed = confirm("Bạn có chắc muốn xóa phòng này?");
      if (!confirmed) return;
      setLoading(true);
      await api.delete(`/rooms/${roomId}`);
      message.success("Xóa phòng thành công");
      fetchRooms();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleOpenEditModal = (room: IRoom) => {
    setSelectedRoom(room);
    setIsEditModalOpen(true);
  };
  const handleEditRoom = async (data: TRoomFormInput) => {
    if (!selectedRoom) return;
    try {
      setLoading(true);
      const res = await api.patch(`/rooms/${selectedRoom.id}`, data);
      if (res.data) {
        message.success("Cập nhật phòng thành công!");
        setIsEditModalOpen(false);
        setSelectedRoom(null);
        console.log(fetchRooms());
        fetchRooms();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const columns = RoomTable(handleDeleteRoom, handleOpenEditModal);
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRoom(null);
  };
  const handleFilter = async (data: RoomFilter) => {
    console.log(data);
    await fetchRooms(data);
    setIsFilterModalOpen(false);
  };
  return (
    <>
      <main className="p-6 flex-1 overflow-y-auto">
        <h1 className="text-[30px] font-bold mb-4 text-blue-500">
          Danh sách phòng
        </h1>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-4">
          <button
            className="bg-gray-200 flex items-center gap-2 px-4 py-2 rounded-lg transition hover:bg-blue-500 cursor-pointer"
            onClick={() => setIsAddModalOpen(true)}
          >
            <PlusCircleOutlined />
            <span>Thêm sản phẩm</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              loading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            disabled={loading}
            onClick={() => fetchRooms()}
          >
            <UndoOutlined
              className={loading ? "animate-spin text-gray-400" : ""}
            />
            <span>{loading ? "Đang tải..." : "Refresh"}</span>
          </button>
          <Button
            type="default"
            onClick={() => setIsFilterModalOpen(true)}
            className="bg-blue-500 flex items-cemter gap-2 px-4 py-2 rounded-lg"
          >
            <FilterOutlined />
            Bộ lọc
          </Button>

          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 ml-auto w-64 shadow-sm">
            <SearchOutlined className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <Table
            columns={columns}
            dataSource={rooms}
            loading={loading}
            pagination={{ pageSize: 5 }}
            rowKey="id"
          />
        </div>
      </main>
      <RoomFilterModal
        open={isFilterModalOpen}
        onCancel={() => setIsFilterModalOpen(false)}
        onSubmit={handleFilter}
      />
      <RoomFormModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateRoom}

        //chế độ "Add"
      />
      <RoomFormModal
        visible={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEditRoom}
        roomData={selectedRoom} //chế độ "Edit"
      />
    </>
  );
}
