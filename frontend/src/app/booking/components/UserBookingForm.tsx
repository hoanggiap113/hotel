"use client";
import { IBookingGuests } from "@/types/booking.type";
import { EPaymentMethod, PaymentMethodLabel } from "@/types/payment.type";
import { Button, Form, Input } from "antd";
// Thêm useEffect và useForm
import { useState, useEffect } from "react";

// Định nghĩa lại kiểu dữ liệu onFinish để bao gồm cả paymentMethod
type FormValues = IBookingGuests & {
  paymentMethod: EPaymentMethod;
};

export default function UserBookingForm({
  onFinish,
  handleBack,
}: {
  onFinish: (values: FormValues) => void;
  handleBack: () => void;
}) {
  const [form] = Form.useForm();

  const [selectedMethod, setSelectedMethod] = useState<EPaymentMethod>(
    EPaymentMethod.CASH
  );
  const paymentMethods = [
    EPaymentMethod.CASH,
    EPaymentMethod.CREDIT_CARD,
    EPaymentMethod.BANK_TRANSFER,
  ];

  useEffect(() => {
    form.setFieldsValue({
      paymentMethod: selectedMethod,
    });
  }, [selectedMethod, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{ paymentMethod: EPaymentMethod.CASH }}
    >
      <h3 className="text-xl font-semibold mb-4 text-blue-600">
        Thông tin người đặt phòng
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Form.Item
          label="Tên người đặt phòng"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên người đặt" }]}
        >
          <Input size="large" placeholder="Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input size="large" placeholder="0123456789" />
        </Form.Item>
      </div>

      <Form.Item
        label="Email liên hệ"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input size="large" placeholder="ten@email.com" />
      </Form.Item>

      <Form.Item label="Ghi chú (tuỳ chọn)" name="note">
        <Input.TextArea
          rows={3}
          placeholder="Yêu cầu giường thêm, gần cửa sổ..."
        />
      </Form.Item>

      <Form.Item name="paymentMethod" hidden>
        <Input />
      </Form.Item>

      {/* Payment Methods */}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-800">
        Chọn phương thức thanh toán
      </h3>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method}
            onClick={() => {
              setSelectedMethod(method);

            }}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedMethod === method
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-400"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-gray-800">
                {PaymentMethodLabel[method]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-10">
        <Button onClick={handleBack} size="large">
          Quay lại
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="bg-blue-600"
        >
          Tiếp tục đến xác nhận
        </Button>
      </div>
    </Form>
  );
}
