import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingSmall } from "baseui/typography";
import Head from "next/head";
import { New } from "./components/New";
import {StyledDivider} from 'baseui/divider'

export default function Feed() {
  return (
    <main style={{ width: "100%", maxWidth: "640px" }}>
      <Head>
        <title>Conexão ECI | Feed</title>
      </Head>

      <FlexGrid>
        <FlexGridItem>
          <HeadingSmall marginBottom="24px">Conexão ECI</HeadingSmall>

          <New />

          <StyledDivider
            style={{ margin: "16px 0px" }}
          />

          <FlexGrid>
          </FlexGrid>
        </FlexGridItem>
      </FlexGrid>
    </main>
  )
}