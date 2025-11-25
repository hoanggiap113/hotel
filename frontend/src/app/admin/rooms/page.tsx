/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useRooms,
  useCreateRoom,
  useUpdateRoom,
  useDeleteRoom,
} from "@/hooks/queries/rooms/use-room";
import BasePage from "../_components/BasePage";
import { RoomFormModal } from "./_components/RoomForm";
import { useState } from "react";
import { Modal, message } from "antd";
import RoomTable from "./_components/RoomTable";
import { IRoom, TRoomFormInput } from "@/types/room.type";

export default function RoomPage() {
  const roomsQuery = useRooms();
  const createRoom = useCreateRoom();
  const updateRoom = useUpdateRoom();
  const deleteRoom = useDeleteRoom();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<IRoom | null>(null);

  // Xử lý thêm - nhận data đã xử lý từ RoomFormModal
  const handleAdd = async (data: TRoomFormInput) => {
    try {
      await createRoom.mutateAsync(data);
      message.success("Thêm phòng thành công!");
    } catch (error) {
      message.error("Thêm phòng thất bại!");
      throw error;
    }
  };

  // Xử lý sửa - nhận data đã xử lý từ RoomFormModal
  const handleEdit = async (data: TRoomFormInput) => {
    try {
      await updateRoom.mutateAsync({
        id: editingRoom!.id,
        data,
      });
      message.success("Cập nhật phòng thành công!");
    } catch (error) {
      message.error("Cập nhật phòng thất bại!");
      throw error;
    }
  };

  // Xử lý xóa
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa phòng này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteRoom.mutateAsync(id);
          message.success("Xóa phòng thành công!");
        } catch (error) {
          message.error("Xóa phòng thất bại!");
        }
      },
    });
  };

  // Mở modal ADD
  const openAddModal = () => {
    setEditingRoom(null);
    setIsModalOpen(true);
  };

  // Mở modal EDIT
  const openEditModal = (room: IRoom) => {
    setEditingRoom(room);
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
  };
  const columns = RoomTable(handleDelete, openEditModal);
  return (
    <BasePage
      title="Danh sách phòng"
      data={roomsQuery.data || []}
      columns={columns}
      loading={roomsQuery.isLoading}
      onAdd={openAddModal}
      onRefresh={() => roomsQuery.refetch()}
    >
      <RoomFormModal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={editingRoom ? handleEdit : handleAdd}
        roomData={editingRoom}
        loading={editingRoom ? updateRoom.isPending : createRoom.isPending}
      />
    </BasePage>
  );
}
