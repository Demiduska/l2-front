import { AxiosInstance } from "axios";
import {
  CreateServerDto,
  CreateUserDto,
  ResponseServers,
  ResponseUser,
  SelectServer,
  ServerResponseType,
} from "./types";

export const ServerApi = (instance: AxiosInstance) => ({
  async create(dto: CreateServerDto) {
    const { data } = await instance.post<
      CreateUserDto,
      { data: ServerResponseType }
    >("/servers", dto);
    return data;
  },
  async update(dto: CreateServerDto) {
    const { data } = await instance.patch<
      CreateUserDto,
      { data: ServerResponseType }
    >(`/servers/${dto.id}`, dto);
    return data;
  },
  async getServersByDates(dto: SelectServer) {
    const { data } = await instance.get<
      SelectServer,
      { data: ResponseServers }
    >("/servers", { params: dto });
    return data;
  },
});
