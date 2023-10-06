import { api } from "@/lib/axios";

interface IRequestVote {
  challengeId: string | string[];
  aid: string;
  bid: string;
  d: boolean;
}

export async function requestVoteDuel({ challengeId, aid, bid, d }: IRequestVote) {
  return await api.patch(`/challenges/${challengeId}/duel`, {
    aid,
    bid,
    d,
  })
}