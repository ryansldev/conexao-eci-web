import { requestCreateStudent } from "@/api/stundent/createStudent";
import { Avatar } from "baseui/avatar";
import { Button, SHAPE } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { FileUploader } from "baseui/file-uploader";
import { FlexGrid } from "baseui/flex-grid";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { NumberedStep, ProgressSteps } from "baseui/progress-steps";
import { toaster } from "baseui/toast";
import { LabelLarge } from "baseui/typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

export function StudentSignin() {
  const [step, setStep] = useState(0);
  const [studentData, setStudentData] = useState<{
    name: string;
    login: string;
    email: string;
    room: string;
    password: string;
    profile_pic: string;
  }>({
    name: "",
    login: "",
    email: "",
    room: "",
    password: "",
    profile_pic: "",
  });
  const [agreeWithTerms, setAgreeWithTerms] = useState(false);

  const { control, handleSubmit } = useForm();
  const router = useRouter();

  function onSubmitData({ name, login, email, room, password }: FieldValues) {
    console.log("AQUI");
    setStudentData({ ...studentData, name, login, email, room, password });
    setStep(step + 1);
  }

  async function onSubmit() {
    try {
      console.log(agreeWithTerms);
      if (!agreeWithTerms)
        return toaster.negative("Você precisa concordar com os termos!");
      await requestCreateStudent(studentData);
      toaster.positive("Perfil criado!");
      router.push("/");
    } catch (e: any) {
      toaster.negative(e.message);
    }
  }

  function getBase64(files: File[]) {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setStudentData({
        ...studentData,
        profile_pic: String(reader.result),
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  return (
    <ProgressSteps current={step}>
      <NumberedStep title="Preencher dados">
        <form onSubmit={handleSubmit(onSubmitData)}>
          <FormControl label="Nome" htmlFor="name">
            <Controller
              name="name"
              control={control}
              defaultValue={""}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input {...field} id="name" placeholder="Seu nome" />
              )}
            />
          </FormControl>
          <FormControl label="Login" htmlFor="login">
            <Controller
              name="login"
              control={control}
              defaultValue={""}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input {...field} id="login" placeholder="Seu login" />
              )}
            />
          </FormControl>
          <FormControl label="Email" htmlFor="email">
            <Controller
              name="email"
              control={control}
              defaultValue={""}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input {...field} id="email" placeholder="Seu email" />
              )}
            />
          </FormControl>
          <FormControl label="Sala" htmlFor="room">
            <Controller
              name="room"
              control={control}
              defaultValue={""}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input {...field} id="room" placeholder="Sua sala" />
              )}
            />
          </FormControl>
          <Button size="compact" type="submit">
            Proximo
          </Button>
        </form>
      </NumberedStep>
      <NumberedStep title="Defina sua senha">
        <form onSubmit={handleSubmit(onSubmitData)}>
          <FormControl label="Senha" htmlFor="password">
            <Controller
              name="password"
              control={control}
              defaultValue={""}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  required
                  placeholder="Sua senha"
                  type="password"
                />
              )}
            />
          </FormControl>
          <Button size="compact" type="submit">
            Proximo
          </Button>
        </form>
      </NumberedStep>
      <NumberedStep title="Foto do perfil">
        <FormControl>
          <FileUploader
            accept={".jpg, .jpeg, .png"}
            name="profile_pic"
            multiple={false}
            onDrop={(files) => {
              getBase64(files);
              setStep(step + 1);
            }}
          />
        </FormControl>
        <Button
          shape={SHAPE.pill}
          kind="secondary"
          type="button"
          size="compact"
          onClick={(e) => {
            e.preventDefault();
            setStep(step - 1);
          }}
        >
          Voltar
        </Button>
      </NumberedStep>
      <NumberedStep title="Conclusão">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexGrid
            gridGap={"24px"}
            alignItems={"center"}
            style={{ marginBottom: "32px" }}
          >
            <Avatar src={studentData.profile_pic} size="128px" />
            <FlexGrid flexDirection="column">
              <LabelLarge>
                <strong>Nome: </strong>
                {studentData.name}
              </LabelLarge>
              <LabelLarge>
                <strong>Login: </strong> {studentData.login}
              </LabelLarge>
              <LabelLarge>
                <strong>Email: </strong> {studentData.email}
              </LabelLarge>
              <LabelLarge>
                <strong>Sala: </strong> {studentData.room}
              </LabelLarge>
            </FlexGrid>
          </FlexGrid>
          <FormControl label="Termos e política de privacidade">
            <Checkbox
              checked={agreeWithTerms}
              onChange={() => setAgreeWithTerms(!agreeWithTerms)}
            >
              Concordo com os{" "}
              <Link passHref href="/terms-of-service">
                termos de serviço
              </Link>{" "}
              e{" "}
              <Link passHref href="/privacy-policy">
                política de privacidade
              </Link>
            </Checkbox>
          </FormControl>
          <FlexGrid gridGap={"8px"}>
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
              onClick={(e) => {
                e.preventDefault();
                setStep(step - 1);
              }}
            >
              Voltar
            </Button>
          </FlexGrid>
        </form>
      </NumberedStep>
    </ProgressSteps>
  );
}
