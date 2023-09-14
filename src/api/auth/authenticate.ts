import { api } from "@/lib/axios";

interface IAuthenticateBody {
  login: string;
  password: string;
}

export async function requestAuthenticate(data: IAuthenticateBody) {
  return await api.post("/auth", data);
}
