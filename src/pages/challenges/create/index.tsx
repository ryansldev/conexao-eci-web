import { requestGetTeachers } from "@/api/teacher/getTeachers";
import { AxiosError } from "axios";
import { Button } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { FormControl } from "baseui/form-control";
import { Spinner } from "baseui/icon";
import { Input } from "baseui/input";
import { toaster } from "baseui/toast";
import { HeadingLarge, HeadingXSmall, ParagraphMedium } from "baseui/typography";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";

export default function CreateChallenge() {
  const [step, setStep] = useState(0)
  const [isEnvolved, setIsEnvolved] = useState<{
    teachers: boolean;
    students: boolean;
  }>({
    teachers: false,
    students: false,
  })

  const [challengedOptions, setChallengedOptions] = useState<{
    teachers: any[];
    students: any[];
  }>()
  const [challenged, setChallenged] = useState<{
    id: string;
    name: string;
    profile_pic: string;
  }[]>([])

  useQuery(
    'get-challenged',
    async () => {
      if(!isEnvolved.students && !isEnvolved.teachers) return { teachers: [] };

      let teachers: {
        id: string;
        name: string;
        profile_pic: string;
      }[] = [];

      let students: {
        id: string;
        name: string;
        profile_pic: string;
      }[] = [];

      if(isEnvolved.teachers) {
        const { data } = await requestGetTeachers()
        teachers = data;
      }

      // if(isEnvolved.students) {
      //   const { data } = await requestGetStudents()
      //   students = data;
      // }

      return { teachers, students }
    },
    {
      enabled: (!!isEnvolved.students || !!isEnvolved.teachers) && step === 1,
      onSuccess({ teachers, students }) {
        setChallengedOptions({
          teachers,
          students: students ?? [],
        })
      },
      onError(e: AxiosError) {
        toaster.negative(e.message ?? "Erro desconhecido")
      }
    }
  )

  return (
    <FlexGrid
      flexDirection={"column"}
      width="100%"
      padding={"0 32px"}
    >
      {step === 0 &&
        <>
          <FormControl
            label={() => "Título"}
            caption={() => "Pergunta do desafio"}
            htmlFor="title"
          >
            <Input
              id="title"
              placeholder="Ex: quem é o seu favorito?" required
            />
          </FormControl>

          <HeadingXSmall>Envolvidos</HeadingXSmall>

          <FlexGrid
            gridGap={"8px"}
          >
            <FlexGrid
              flexDirection={"column"}
              padding={"24px"}
              flex={1}
              minWidth={"350px"}
              style={{ border: "1px solid #333", borderRadius: ".5vw" }}
            >
              <Checkbox
                checked={isEnvolved.teachers}
                onChange={e => setIsEnvolved({ ...isEnvolved, teachers: e.target.checked })}
              >
                Professores
              </Checkbox>
            </FlexGrid>
            <FlexGrid
              flexDirection={"column"}
              padding={"24px"}
              flex={1}
              minWidth={"350px"}
              style={{ border: "1px solid #333", borderRadius: ".5vw" }}
            >
              <Checkbox
                disabled
                checked={isEnvolved.students}
                onChange={e => setIsEnvolved({ ...isEnvolved, students: e.target.checked })}
              >
                Alunos
              </Checkbox>
            </FlexGrid>
          </FlexGrid>

          <Button
            style={{ marginTop: "16px" }}
            disabled={!isEnvolved.teachers && !isEnvolved.students}
            onClick={() => setStep(1)}
          >
            Próximo
          </Button>
        </>
      }

      {step === 1 && (
        <>
          {challengedOptions ? (
            <>
              <HeadingLarge>Professores</HeadingLarge>
              <FlexGrid
                gridGap={"8px"}
                flexGridColumnCount={5}
                width="100%"
                alignItems={"center"}
                justifyContent={"center"}
                flexWrap
              >
                {challengedOptions && challengedOptions.teachers.map((teacher, key) => {
                  return (
                    <FlexGridItem key={key} flexDirection={"column"}>
                      <Checkbox
                        checked={!!challenged.find((data) => data.id === teacher.id)}
                        onChange={e => {
                          e.target.checked ?
                            setChallenged([...challenged, teacher])
                            : setChallenged(challenged.filter((challenged) => challenged.id !== teacher.id))
                        }}
                      >
                        <Image src={teacher.profile_pic} alt={teacher.name} width={150} height={150} />
                        <ParagraphMedium>{teacher.name}</ParagraphMedium>
                      </Checkbox>
                    </FlexGridItem>
                  )
                })}
              </FlexGrid>
            </>
          ) : <Spinner />}
          
        </>
      )}
    </FlexGrid>
  )
}