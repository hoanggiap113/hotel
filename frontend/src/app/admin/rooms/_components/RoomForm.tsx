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
  Button,
} from "antd";
import api from "@/lib/util/api";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import {
  TRoomFormInput,
  IRoom,
  ROOMTYPE_OPTIONS,
  BEDTYPE_OPTIONS,
  AMENITY_OPTIONS,
} from "@/types/room.type";

interface RoomFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TRoomFormInput) => Promise<void>;
  roomData?: IRoom | null;
  loading?: boolean;
}

export const RoomFormModal: React.FC<RoomFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  roomData,
  loading = false,
}) => {
  const [form] = Form.useForm<TRoomFormInput>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { message } = App.useApp();
  const isEditMode = !!roomData;

  useEffect(() => {
    if (open && roomData) {
      //EDIT Mode
      form.setFieldsValue({
        name: roomData.name,
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

      // Convert image URLs sang UploadFile
      const existingImages: UploadFile[] = (roomData.images || []).map(
        (url, index) => ({
          uid: `old-${index}-${url}`,
          name: url.split("/").pop() || "image.jpg",
          status: "done" as const,
          url: `${url}`,
          response: url,
        })
      );
      setFileList(existingImages);
    } else if (open && !roomData) {
      // Chế độ ADD
      form.resetFields();
      setFileList([]);
    }
  }, [open, roomData, form]);

  // XỬ LÝ SUBMIT với logic upload ảnh
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setUploading(true);

      let finalImageUrls: string[] = [];

      const newFiles = fileList.filter((file) => file.originFileObj);
      const oldFiles = fileList.filter(
        (file) => !file.originFileObj && file.response
      );

      let newImageUrls: string[] = [];
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => {
          if (file.originFileObj) {
            formData.append("files", file.originFileObj);
          }
        });

        try {
          const response = await api.post("/files", formData);
          console.log(response);
          if (response.data && response.data.urls) {
            newImageUrls = response.data.urls; 
          } else {
            throw new Error("Server không trả về URL file");
          }
        } catch (uploadError) {
          console.error("File upload failed:", uploadError);
          message.error("Tải ảnh mới lên thất bại!");
          setUploading(false);
          return;
        }
      }

      if (isEditMode) {
        const keptImageUrls: string[] = oldFiles.map(
          (file) => file.response as string
        );
        finalImageUrls = [...keptImageUrls, ...newImageUrls];
      } else {
        finalImageUrls = newImageUrls;
      }
      console.log(finalImageUrls);
      const finalData: TRoomFormInput = {
        ...values,
        images: finalImageUrls,
      };
      await onSubmit(finalData);
      form.resetFields();
      setFileList([]);
      onClose();
    } catch (err) {
      console.log("Validation Failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
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
      open={open}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={uploading || loading}
          onClick={handleOk}
        >
          {isEditMode ? "Lưu thay đổi" : "Thêm"}
        </Button>,
      ]}
    >
      <div className="max-h-[70vh] overflow-y-auto pr-2">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên phòng"
            name="name"
            rules={[{ required: true, message: "Nhập tên phòng" }]}
          >
            <Input placeholder="Tên phòng VD: ABC XYZ" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} placeholder="Mô tả ngắn" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Loại phòng"
                name="roomType"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Chọn loại phòng"
                  options={ROOMTYPE_OPTIONS}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
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
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
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

          <Form.Item label="Ảnh (Tối đa 5 ảnh)">
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              listType="picture-card"
              multiple
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
