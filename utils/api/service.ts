import { AxiosInstance } from "axios";
import { ResponseServices, SelectServiceType, ServiceType } from "./types";

export const ServiceApi = (instance: AxiosInstance) => ({
  // async create(dto: CreateServerDto) {
  //   const { data } = await instance.post<
  //     CreateUserDto,
  //     { data: ServerResponseType }
  //   >("/servers", dto);
  //   return data;
  // },
  // async update(dto: CreateServerDto) {
  //   const { data } = await instance.patch<
  //     CreateUserDto,
  //     { data: ServerResponseType }
  //   >(`/servers/${dto.id}`, dto);
  //   return data;
  // },
  async getServices(dto: string) {
    const { data } = await instance.get<string, { data: ResponseServices }>(
      "/services",
      {
        params: dto,
      }
    );
    return data;
  },
  async getService(dto: SelectServiceType) {
    const { data } = await instance.get<
      SelectServiceType,
      { data: ServiceType | null }
    >(`/services/${dto.id}`, {
      params: { date: dto.date },
    });
    return data;
  },
});
