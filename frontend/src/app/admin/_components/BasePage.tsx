/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  PlusCircleOutlined,
  UndoOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import { ReactNode } from "react";
interface BasePageProps {
  title: string;
  data: any[];
  columns: any[];
  loading: boolean;
  onAdd?: () => void;
  onRefresh?: () => void;
  onFilter?: () => void;
  onSearch?: (value: string) => void;

  children?: ReactNode;
}

export default function BasePage({
  title,
  data,
  columns,
  loading,
  onAdd,
  onRefresh,
  onFilter,
  onSearch,
  children,
}: BasePageProps) {
  return (
    <>
      <main className="p-6 flex-1 overflow-y-auto">
        {/* Title */}
        <h1 className="text-[28px] font-bold mb-4 text-blue-500">{title}</h1>

        {/* Action bar */}
        <div className="flex items-center gap-3 mb-4">
          {onAdd && (
            <button
              className="bg-gray-200 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
              onClick={onAdd}
            >
              <PlusCircleOutlined />
              <span>Thêm</span>
            </button>
          )}

          {onRefresh && (
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={onRefresh}
              disabled={loading}
            >
              <UndoOutlined
                className={loading ? "animate-spin text-gray-400" : ""}
              />
              <span>{loading ? "Đang tải..." : "Refresh"}</span>
            </button>
          )}

          {onFilter && (
            <Button
              type="default"
              className="bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg"
              onClick={onFilter}
            >
              <FilterOutlined />
              Bộ lọc
            </Button>
          )}

          {/* Search */}
          {onSearch && (
            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 ml-auto w-64 shadow-sm">
              <SearchOutlined className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full outline-none bg-transparent text-sm"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{ pageSize: 5 }}
            rowKey="id"
          />
        </div>

        {/* Modals */}
        {children}
      </main>
    </>
  );
}
