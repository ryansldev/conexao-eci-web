import { useState } from "react"
import { useQuery } from "react-query"

import Head from "next/head"
import Link from "next/link"

import { requestGetTeachers } from "@/api/getTeachers"
import { AxiosError } from "axios"

import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Button, KIND } from "baseui/button"
import { Avatar } from "baseui/avatar"

export default function Teachers() {
  const [isLoading, setIsLoading] = useState(false)
  const [teachers, setTeachers] = useState<{
    id: string;
    name: string;
    profile_pic: string;
  }[]>([])

  useQuery(
    'get-teachers',
    async () => {
      setIsLoading(true)
      return await requestGetTeachers()
    },
    {
      onSuccess: ({ data }) => {
        setIsLoading(false)
        setTeachers(data)
      },
      onError: (e: AxiosError) => {
        setIsLoading(false)
        alert(e.message)
      }
    }
  )

  return (
    <FlexGrid
      justifyContent="center"
      alignItems="center"
      minHeight={"98vh"}
    >
      <Head>
        <title>Conexão ECI</title>
      </Head>
      
      <FlexGridItem
        maxWidth="30vw"
      >
        <FlexGrid>
          <FlexGridItem><span>Areial, PB</span></FlexGridItem>
          <FlexGridItem><h1 style={{ marginTop: 0 }}>Conexão ECI</h1></FlexGridItem>
          <FlexGridItem>
            <FlexGrid
              gridGap={"0.5em"}
            >
              {teachers && teachers.map((teacher) => (
                <Avatar
                  name={teacher.name}
                  size="scale1600"
                  src={teacher.profile_pic}
                  key={teacher.id}
                />
              ))}
            </FlexGrid>
          </FlexGridItem>
          <FlexGridItem
            style={{ marginTop: "1em"}}
          >
            <span>
              {teachers.length} professores
            </span>
          </FlexGridItem>
          <FlexGridItem>
            <span>
              +100 alunos
            </span>
          </FlexGridItem>
          <FlexGridItem>
            <Link
              passHref
              href="/sign-in"
            >
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
  )
}