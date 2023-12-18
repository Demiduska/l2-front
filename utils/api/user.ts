import {
  AvatarType,
  ConfirmEmailDto,
  CreateUserDto,
  FileType,
  ForgotPasswordDto,
  LoginDto,
  ResponseServices,
  ResponseUser,
  SetNewPasswordDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from "./types";
import { AxiosInstance } from "axios";

export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<ResponseUser[]>("/users");
    return data;
  },
  async register(dto: CreateUserDto) {
    const { data } = await instance.post<CreateUserDto, { data: ResponseUser }>(
      "/auth/register",
      dto
    );
    return data;
  },
  async update(dto: UpdateUserDto) {
    const { data } = await instance.patch<
      UpdateUserDto,
      { data: ResponseUser }
    >("/users", dto);
    return data;
  },
  async uploadAvatar(files: File[]) {
    const formData = new FormData();
    formData.append("file", files[0]);
    const { data } = await instance.post<File, { data: ResponseUser }>(
      "/users/avatar",
      formData
    );
    return data;
  },
  async deleteAvatar(id: number) {
    const { data } = await instance.delete<number>(`/users/avatar/${id}`);
    return data;
  },
  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: ResponseUser }>(
      "/auth/login",
      dto
    );
    return data;
  },
  async getMe() {
    const { data } = await instance.get<ResponseUser>("/auth");
    return data;
  },
  async confirmEmail(dto: { token: string | string[] }) {
    const { data } = await instance.post<ConfirmEmailDto, { data: string }>(
      "/email-confirmation/confirm",
      dto
    );
    return data;
  },
  async forgotPassword(dto: ForgotPasswordDto) {
    const { data } = await instance.post<ForgotPasswordDto>(
      "/auth/forgot-password",
      dto
    );
    return data;
  },
  async setNewPassword(dto: SetNewPasswordDto) {
    const { data } = await instance.post<SetNewPasswordDto>(
      "/auth/new-password",
      dto
    );
    return data;
  },
  async updatePassword(dto: UpdatePasswordDto) {
    const { data } = await instance.post<
      UpdatePasswordDto,
      { data: ResponseUser }
    >("/auth/update-password", dto);
    return data;
  },
  async getFile(id: number) {
    const { data } = await instance.get<FileType>(`/local-files/${id}`);
    return data;
  },
  // async getOne(id: number) {
  //   const { data } = await instance.get<PostItem>(`/posts/${id}`);
  //   return data;
  // },
});
