import { api } from "@/lib/axios";

export interface IChallenged {
  id: string; // uuid
  name: string;
  rating: number;
  profile_pic: string; // base64
  challengeId: string; // uuid
  challenge: IChallenge;
}

interface IChallenge {
  id: string;
  title: string;
  votes: number;
  active: boolean;
  created_at: Date;
  updated_at?: Date;
}

export async function requestGetDuel(id: string) {
  return await api.get<IChallenged[]>(`/challenges/${id}/duel`)
}