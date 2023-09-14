import { Key, useState } from "react";

import Head from "next/head";

import { Tabs, Tab, FILL } from "baseui/tabs-motion";
import { TeacherSignin } from "./components/TeacherSignin";
import { StudentSignin } from "./components/StudentSignin";

export default function SignIn() {
  const [activeKey, setActiveKey] = useState<Key>(0);

  return (
    <main style={{ width: "100%", maxWidth: "80vw" }}>
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
            <TeacherSignin />
          </Tab>
          <Tab title="Aluno">
            <StudentSignin />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
