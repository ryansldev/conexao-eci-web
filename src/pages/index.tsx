import { requestGetTeachers } from "@/api/getTeachers"
import { AxiosError } from "axios"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useQuery } from "react-query"

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
    <main className="flex h-screen items-center justify-center gap-32">
      <Head>
        <title>Conexão ECI</title>
      </Head>
      <div>
        <span className="text-[#bbb] leading-relaxed">Areial, PB</span>
        <h1 className="text-4xl font-bold mb-8">Conexão ECI</h1>
        <div className="flex gap-4 max-w-[500px] flex-wrap">
          {teachers && teachers.map((teacher) => (
            <div key={teacher.id} className="h-[80px] w-[80px] relative">
              <Image src={teacher.profile_pic} alt={teacher.name} fill className="rounded-full" />
            </div>
          ))}
          <span className="mt-4 text-[#bbb]">
            {teachers.length} professores <br />
            +100 alunos<br/>
          </span>
        </div>
        <Link
          passHref
          href="/sign-in"
        >
          <button
            type="button"
            className="py-2 px-4 rounded bg-[#333] mt-4 font-bold text-[#bbb]"
          >
            Entrar
          </button>
        </Link>
      </div>
    </main>
  )
}