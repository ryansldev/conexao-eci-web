import { api } from "@/lib/axios";

interface IRequestCreateChallenge {
  title: string;
  description?: string;
}

export async function requestCreateChallenge({ title, description }: IRequestCreateChallenge) {
  return await api.post('/challenges', {
    title,
    description
  })
}