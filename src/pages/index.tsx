import { useState } from "react";
import { useQuery } from "react-query";

import Head from "next/head";
import Link from "next/link";

import { requestGetTeachers } from "@/api/teacher/getTeachers";
import { AxiosError } from "axios";

import { DisplayMedium, HeadingSmall, ParagraphLarge } from "baseui/typography";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Button, KIND } from "baseui/button";
import { Avatar } from "baseui/avatar";

export default function Teachers() {
  const [isLoading, setIsLoading] = useState(false);
  const [teachers, setTeachers] = useState<
    {
      id: string;
      name: string;
      profile_pic: string;
    }[]
  >([]);

  useQuery(
    "get-teachers",
    async () => {
      setIsLoading(true);
      return await requestGetTeachers();
    },
    {
      onSuccess: ({ data }) => {
        setIsLoading(false);
        setTeachers(data);
      },
      onError: (e: AxiosError) => {
        setIsLoading(false);
        alert(e.message);
      },
    }
  );

  return (
    <FlexGrid justifyContent="center" alignItems="center" minHeight={"98vh"}>
      <Head>
        <title>Conexão ECI</title>
      </Head>

      <FlexGridItem maxWidth="30vw">
        <FlexGrid>
          <FlexGridItem>
            <HeadingSmall>Areial, PB</HeadingSmall>
          </FlexGridItem>
          <FlexGridItem>
            <DisplayMedium style={{ marginTop: 0 }}>Conexão ECI</DisplayMedium>
          </FlexGridItem>
          <FlexGridItem>
            <FlexGrid gridGap={"0.5em"}>
              {teachers &&
                teachers.map((teacher) => (
                  <Avatar
                    name={teacher.name}
                    size={"scale1400"}
                    src={teacher.profile_pic}
                    key={teacher.id}
                  />
                ))}
            </FlexGrid>
          </FlexGridItem>
          <FlexGridItem style={{ marginTop: "1em" }}>
            <ParagraphLarge>{teachers.length} professores</ParagraphLarge>
          </FlexGridItem>
          <FlexGridItem>
            <ParagraphLarge>+100 alunos</ParagraphLarge>
          </FlexGridItem>
          <FlexGridItem>
            <Link passHref href="/sign-up">
              <Button
                type="button"
                kind={KIND.secondary}
                style={{ marginTop: "2em" }}
              >
                Cadastrar-se
              </Button>
            </Link>
          </FlexGridItem>
        </FlexGrid>
      </FlexGridItem>
    </FlexGrid>
  );
}
