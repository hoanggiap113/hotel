/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/util/api";

export interface IBaseService<T> {
  getList: (params?: any) => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (data: any) => Promise<T>;
  update: (id: string, data: any) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

export function createBaseService<T>(resource: string): IBaseService<T> {
  return {
    getList: async (params?) => {
      const res = await api.get(`/${resource}`, { params });
      return res.data;
    },

    getById: async (id: string) => {
      const res = await api.get(`/${resource}/${id}`);
      return res.data;
    },

    create: async (data: any) => {
      const res = await api.post(`/${resource}`, data);
      return res.data;
    },

    update: async (id: string, data: any) => {
      const res = await api.patch(`/${resource}/${id}`, data);
      return res.data;
    },

    delete: async (id: string) => {
      await api.delete(`/${resource}/${id}`);
    },
  };
}
