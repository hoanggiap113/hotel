/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Modal, Form, Button } from "antd";
import { ReactNode, useEffect } from "react";

interface BaseModalProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  loading?: boolean;
  initialValues?: any;
  children: ReactNode;
  width?: number;
  okText?: string;
  cancelText?: string;
}

export default function BaseModal({
  title,
  open,
  onCancel,
  onSubmit,
  loading = false,
  initialValues,
  children,
  width = 600,
  okText = "Xác nhận",
  cancelText = "Hủy",
}: BaseModalProps) {
  const [form] = Form.useForm();

  // Set initial values khi modal mở hoặc initialValues thay đổi
  useEffect(() => {
    if (open) {
      if (initialValues) {
        // Chế độ EDIT: set giá trị từ data cần sửa
        form.setFieldsValue(initialValues);
      } else {
        // Chế độ ADD: reset form về trống
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      width={width}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {cancelText}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {okText}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {children}
      </Form>
    </Modal>
  );
}
