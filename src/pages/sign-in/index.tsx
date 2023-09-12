import { Key, useState } from "react";

import Head from "next/head";

import { Tabs, Tab, FILL } from "baseui/tabs-motion";

import { FormControl } from 'baseui/form-control';
import { Input } from "baseui/input";
import { Checkbox } from 'baseui/checkbox';
import Link from "next/link";
import { FileUploader } from "baseui/file-uploader";

import { NumberedStep, ProgressSteps } from "baseui/progress-steps";

import { Button, SHAPE } from "baseui/button";

import { Controller, FieldValues, useForm } from "react-hook-form";
import { Avatar } from "baseui/avatar";
import { FlexGrid } from "baseui/flex-grid";
import { HeadingSmall, HeadingXSmall } from "baseui/typography";
import { type } from "os";
import { requestCreateTeacher } from "@/api/createTeacher";
import { toaster } from "baseui/toast";
import router, { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm();

  const [step, setStep] = useState(0);
  const [activeKey, setActiveKey] = useState<Key>(0);
  const [agreeWithTerms, setAgreeWithTerms] = useState(false)

  const [teacherData, setTeacherData] = useState<{
    name: string;
    profile_pic: string;
  }>({
    name: "",
    profile_pic: "",
  })

  const [fileUploaderData, setFileUploaderData] = useState<{
    errorMessage?: string;
    progressMessage?: string;
  }>({
    errorMessage: undefined,
    progressMessage: undefined,
  })

  function getBase64(files: File[]) {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setTeacherData({
        ...teacherData,
        profile_pic: String(reader.result)
      })
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  function onSubmitName({ name }: FieldValues) {
    setTeacherData({...teacherData, name })
    setStep(step+1)
  }

  async function onSubmit() {
    try {
      console.log(agreeWithTerms)
      if(!agreeWithTerms) return toaster.negative('Você precisa concordar com os termos!')
      await requestCreateTeacher(teacherData)
      toaster.positive('Perfil criado!')
      router.push('/')
    } catch (e: any) {
      toaster.negative(e.message)
    }
  }

  return (
    <main style={{ width: '100%', maxWidth: '80vw' }}>
      <Head>
        <title>Conexão ECI | Sign In</title>
      </Head>

      <div>
        <Tabs
          activeKey={activeKey}
          onChange={({ activeKey }) => {
            setActiveKey(activeKey);
          }}
          fill={FILL.fixed}
          activateOnFocus
        >
          <Tab title="Professor">
            <ProgressSteps
              current={step}
            >
              <NumberedStep title="Preencher dados">
                <form onSubmit={handleSubmit(onSubmitName)}>
                  <FormControl
                    label="Nome"
                    htmlFor="name"
                  >
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={""}
                      rules={{
                        required: true
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="name"
                          placeholder="Seu nome"
                        />
                      )}
                    />
                  </FormControl>
                  <Button
                    size="compact"
                    type="submit"
                  >
                    Enviar
                  </Button>
                </form>
              </NumberedStep>
              <NumberedStep title="Foto de perfil">
                <FormControl>
                  <FileUploader
                    accept={".jpg, .jpeg, .png"}
                    name="profile_pic"
                    multiple={false}
                    progressMessage={fileUploaderData.progressMessage}
                    errorMessage={fileUploaderData.errorMessage}
                    onDrop={(files) => { getBase64(files); setStep(step+1) }}
                  />
                </FormControl>
                <Button
                  shape={SHAPE.pill}
                  kind="secondary"
                  type="button"
                  size="compact"
                  onClick={(e) => { e.preventDefault(); setStep(step - 1) }}
                >
                  Voltar
                </Button>
              </NumberedStep>
              <NumberedStep
                title="Conclusão"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FlexGrid
                    gridGap={"24px"}
                    alignItems={"center"}
                    style={{ marginBottom: "32px" }}
                  >
                    <Avatar
                      src={teacherData.profile_pic}
                      size="128px"
                    />
                    <HeadingSmall>{teacherData.name}</HeadingSmall>
                  </FlexGrid>
                  <FormControl
                    label="Termos e política de privacidade"
                  >
                    <Checkbox
                      checked={agreeWithTerms}
                      onChange={() => setAgreeWithTerms(!agreeWithTerms)}
                    >
                      Concordo com os
                      {" "} <Link passHref href="/terms-of-service">termos de serviço</Link>
                      {" "} e <Link passHref href="/privacy-policy">política de privacidade</Link>
                    </Checkbox>
                  </FormControl>
                  <FlexGrid
                    gridGap={"8px"}
                  >
                    <Button
                      shape={SHAPE.pill}
                      kind="secondary"
                      type="submit"
                      size="compact"
                    >
                      Cadastrar-se
                    </Button>
                    <Button
                      shape={SHAPE.pill}
                      kind="secondary"
                      type="button"
                      size="compact"
                      onClick={(e) => { e.preventDefault(); setStep(step - 1) }}
                    >
                      Voltar
                    </Button>
                  </FlexGrid>
                </form>
              </NumberedStep>
            </ProgressSteps>
          </Tab>
          <Tab title="Aluno" disabled>Em breve!</Tab>
        </Tabs>
      </div>
    </main>
  )
}