import { requestAuthenticate } from "@/api/auth/authenticate";
import { useAuth } from "@/hook/useAuth";
import { Button } from "baseui/button";
import { FlexGrid } from "baseui/flex-grid";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { toaster } from "baseui/toast";
import Head from "next/head";
import { useRouter } from "next/router";
import { Controller, FieldValues, useForm } from "react-hook-form";

export default function SiginIn() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const { signin } = useAuth();

  async function onSubmit({ login, password }: FieldValues) {
    try {
      const { data } = await requestAuthenticate({ login, password });

      signin(data.token);

      toaster.positive("Bem vindo!");
      router.push("/");
    } catch (error: any) {
      toaster.negative(error.message);
    }
  }

  return (
    <main style={{ width: "100%", maxWidth: "80vw" }}>
      <Head>
        <title>Conexão ECI | Sign In</title>
      </Head>

      <FlexGrid alignItems={"center"} justifyContent={"center"}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  type="password"
                  placeholder="Sua senha"
                />
              )}
            />
          </FormControl>
          <Button size="compact" type="submit">
            Entrar
          </Button>
        </form>
      </FlexGrid>
    </main>
  );
}
