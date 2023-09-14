import { api } from "@/lib/axios";

interface ICreateStudentBody {
  name: string;
  login: string;
  email: string;
  room: string;
  password: string;
  profile_pic: string;
}

export async function requestCreateStudent(data: ICreateStudentBody) {
  return await api.post("/students", data);
}
