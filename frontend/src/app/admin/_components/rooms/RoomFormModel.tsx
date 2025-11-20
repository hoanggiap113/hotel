/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Upload,
  App,
} from "antd";
import api from "@/lib/api";
import { AMENITY_OPTIONS, ROOMTYPE_OPTIONS, BEDTYPE_OPTIONS } from "./constant";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { TRoomFormInput, IRoom } from "@/types/room.type";
 

interface RoomFormModalProp {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: TRoomFormInput) => void;

  roomData?: IRoom | null; 
}

// 2. Đổi tên Component
export const RoomFormModal: React.FC<RoomFormModalProp> = ({
  visible,
  onClose,
  onSubmit,
  roomData, // Lấy prop
}) => {
  const [form] = Form.useForm<TRoomFormInput>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { message } = App.useApp();

  //Tạo biến xác định chế độ
  const isEditMode = !!roomData; 

  //kiểm tra (visible && roomData)
  // Nếu là chế độ "Thêm" (roomData=null), nó sẽ bỏ qua và chạy
  // phần `else` (resetFields), điều này là hoàn toàn chính xác!
  useEffect(() => {
    if (visible && roomData) {
    //Lấy data từ room r cho vào input
      form.setFieldsValue({
        name: roomData.name,
        description: roomData.description,
        roomType: roomData.roomType,
        bedType: roomData.bedType,
        price: roomData.price,
        capacity: roomData.capacity,
        location: {
          city: roomData.location?.city,
          ward: roomData.location?.ward,
          address: roomData.location?.address,
        },
        amenities: roomData.amenities,
      });

      //Biến đổi string url thành UploadFile
      const existingImages: UploadFile[] = (roomData.images || []).map(
        (url, index) => ({
          uid: `old-${index}-${url}`,
          name: url.split("/").pop() || "image.jpg",
          status: "done",
          url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
          response: url,
        })
      );
      setFileList(existingImages);
    } else {
      // Nếu roomData == null => Chế độ Add
      form.resetFields();
      setFileList([]);
    }
  }, [visible, roomData, form]);

  // 4. Gộp logic handleOk
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setUploading(true);

      let finalImageUrls: string[] = [];

      // Tách file: file mới (cần upload) và file cũ (đã có trên server)
      const newFiles = fileList.filter((file) => file.originFileObj);
      const oldFiles = fileList.filter((file) => !file.originFileObj && file.response);

      let newImageUrls: string[] = [];

      // Logic dùng chung cho cả Add  và Edit 
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => {
          if (file.originFileObj) {
            formData.append("files", file.originFileObj);
          }
        });

        try {
          const response = await api.post("/files", formData);
          if (response.data && response.data.files) {
            newImageUrls = response.data.files;
          } else {
            throw new Error("Lỗi không trả về url file");
          }
        } catch (uploadError) {
          console.error("File upload failed: ", uploadError);
          message.error("Tải ảnh mới lên thất bại!");
          setUploading(false);
          return;
        }
      }

      // Bước B: Xử lý file CŨ (Chỉ áp dụng Edit)
      if (isEditMode) {
        const keptImageUrls: string[] = oldFiles.map(
          (file) => file.response as string
        );
        finalImageUrls = [...keptImageUrls, ...newImageUrls];
      } else {
        // Chế độ Add: Chỉ có ảnh mới
        finalImageUrls = newImageUrls;
      }

      const finalData = {
        ...values,
        images: finalImageUrls,
      };

      // GỌI HÀM SUBMIT CỦA CHA
      onSubmit(finalData as TRoomFormInput);
      
      // Giữ nguyên logic đóng/reset từ file Add của bạn
      form.resetFields();
      setFileList([]);
      onClose();

    } catch (err) {
      console.log("Validate Failed:", err);
    } finally {
      setUploading(false); 
    }
  };

  const handleCancel = () => {
    // useEffect sẽ lo việc reset khi `visible` thay đổi
    onClose();
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <Modal
      title={isEditMode ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={isEditMode ? "Lưu thay đổi" : "Thêm"}
      cancelText="Hủy"
      forceRender 
      
    >
      <div className="max-h-[70vg] overflow-y-auto pr-2">
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên phòng"
          name="name"
          rules={[{ required: true, message: "Nhập tên phòng" }]}
        >
          <Input placeholder="Tên phòng VD:ABC XYZ" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} placeholder="Mô tả ngắn" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              className="flex-1"
              label="Loại phòng"
              name="roomType"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Chọn loại phòng"
                options={ROOMTYPE_OPTIONS}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="flex-1"
              label="Loại giường"
              name="bedType"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Chọn loại giường"
                options={BEDTYPE_OPTIONS}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Giá" name="price" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số người"
              name="capacity"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} max={10} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Thành phố"
              name={["location", "city"]}
              rules={[{ required: true }]}
            >
              <Input placeholder="VD: Hà Nội" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phường/xã"
              name={["location", "ward"]}
              rules={[{ required: true }]}
            >
              <Input placeholder="VD: Ba Đình" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Địa chỉ chi tiết"
          name={["location", "address"]}
          rules={[{ required: true }]}
        >
          <Input placeholder="VD: 123 Nguyễn Trãi" />
        </Form.Item>
        <Form.Item label="Tiện ích" name="amenities">
          <Select
            mode="multiple"
            allowClear
            placeholder="Chọn tiện ích"
            options={AMENITY_OPTIONS}
          />
        </Form.Item>
        <Form.Item label="Ảnh (Tối đa 5 ảnh)" name="images">
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            listType="picture-card"
            multiple={true}
            maxCount={5}
            accept="image/*"
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
      </div>
    </Modal>
  );
};