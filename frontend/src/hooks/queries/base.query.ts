/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IBaseService } from "@/services/base.service";

export function createBaseQuery<T>(key: string, service: IBaseService<T>) {
  return {
    useList: (params?: any) =>
      useQuery({
        queryKey: [key, params],
        queryFn: () => service.getList(params),
      }),

    
    useDetail: (id?: string) =>
      useQuery({
        queryKey: [key, "detail", id],
        queryFn: () => service.getById(id!),
        enabled: !!id,
      }),

    useCreate: () => {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: service.create,
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: [key] });
        },
      });
    },

    useUpdate: () => {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
          service.update(id, data),
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: [key] });
        },
      });
    },

    // DELETE
    useDelete: () => {
      const qc = useQueryClient();
      return useMutation({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: [key] });
        },
      });
    },
  };
}
