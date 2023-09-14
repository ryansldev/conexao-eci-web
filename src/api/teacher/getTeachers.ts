import { api } from "@/lib/axios";

export async function requestGetTeachers() {
  return await api.get<{
    id: string;
    name: string;
    profile_pic: string;
  }[]>('/teachers')
}