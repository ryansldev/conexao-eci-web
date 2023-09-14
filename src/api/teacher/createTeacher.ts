import { api } from "@/lib/axios";

interface ICreateTeacherBody {
  name: string;
  profile_pic: string;
}

export async function requestCreateTeacher(data: ICreateTeacherBody) {
  return await api.post("/teachers", data);
}
