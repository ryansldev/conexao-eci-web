import { IChallenged, requestGetDuel } from "@/api/challenge/challenged/getDuel";
import { requestVoteDuel } from "@/api/challenge/challenged/voteDuel";
import { AxiosError } from "axios";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { toaster } from "baseui/toast";
import { HeadingLarge, HeadingSmall, ParagraphMedium, ParagraphSmall } from "baseui/typography";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"
import { useState } from "react";
import { useQuery } from "react-query";

export default function ChallengeVote() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [refreshDuel, setRefreshDuel] = useState(false);
  const [duel, setDuel] = useState<IChallenged[]>([])

  const { id } = router.query;

  useQuery(
    ['get-duel', refreshDuel===true],
    async () => {
      return await requestGetDuel(String(id))
    },
    {
      onSuccess({ data }) {
        if(data.length !== 2) {
          return
        }
        setDuel(data)
        setIsLoading(false)
        setRefreshDuel(false)
      },
      onError(e: AxiosError) {
        toaster.negative(e.message ?? "Erro desconhecido ocorreu")
        setIsLoading(true)
        setRefreshDuel(false)
      },
    }
  )

  async function handleVote(d: boolean) {
    if(!id) return;
    await requestVoteDuel({ challengeId: id, aid: duel[0].id, bid: duel[1].id, d })
    setRefreshDuel(true)
  }

  return (
    <main>
      <Head>
        <title>Conexão ECI | Desafio</title>
      </Head>
      <FlexGrid
        width="100%"
        alignItems={"center"}
        justifyContent={"center"}
      >
        { duel.length === 2 ?
          <>
            <FlexGridItem
              style={{ textAlign: "center" }}
            >
              <ParagraphSmall style={{ color: "#bbb"}}>NA SUA OPINIÃO</ParagraphSmall>
              <HeadingSmall>{duel[0].challenge.title}</HeadingSmall>
            </FlexGridItem>
            <FlexGridItem>
              <FlexGrid
                flexDirection={"row"}
                flexGridColumnCount={3}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                maxWidth={"580px"}
                padding={"0px 24px"}
                flexWrap
                margin="0 auto"
                marginTop="16px"
              >
                <FlexGridItem
                  padding={"12px 8px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  alignSelf={"center"}
                  minWidth="230px"
                  style={{ border: "1px solid #333", cursor: "pointer" }}
                  onClick={() => handleVote(true)}
                >
                  <Image src={duel[0].profile_pic} width={200} height={200} alt={duel[0].name} />
                  <ParagraphMedium>{duel[0].name}</ParagraphMedium>
                </FlexGridItem>
                <FlexGridItem
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{ textAlign: "center" }}
                  maxWidth="70px"
                >
                  <HeadingSmall>OU</HeadingSmall>
                </FlexGridItem>
                <FlexGridItem
                  padding={"12px 8px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  minWidth="230px"
                  onClick={() => handleVote(false)}
                  style={{ border: "1px solid #333", cursor: "pointer" }}
                >
                  <Image src={duel[1].profile_pic} width={200} height={200} alt={duel[1].name} />
                  <ParagraphMedium>{duel[1].name}</ParagraphMedium>
                </FlexGridItem>
              </FlexGrid>
            </FlexGridItem>
          </>
        :
          <>
            <FlexGridItem>
              <ParagraphMedium>
                Desafio com menos participantes do que o necessário!
              </ParagraphMedium>
              <Link passHref href="/challenges"><Button style={{ marginTop: 8 }}>Voltar</Button></Link>
            </FlexGridItem>
          </>
        }
      </FlexGrid>
    </main>
  )
}