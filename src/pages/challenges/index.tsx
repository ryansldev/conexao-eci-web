import { FlexGrid } from "baseui/flex-grid";
import Challenge from "./components/Challenge";
import { HeadingXSmall } from "baseui/typography";
import { Button } from "baseui/button";
import Link from "next/link";

export default function Challenges({
  
}) {
  return (
    <div>
      <FlexGrid
        gridGap={"12px"}
        maxWidth={"90vw"}
        flexWrap={true}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Challenge
          challenge={{
            id: "123",
            title: "Quem é o melhor professor?",
            authorId: "123",
            description: "Uma breve pesquisa sobre sua opinião"
          }}
        />
      </FlexGrid>

      <Link
        href="/challenges/create"
        passHref
      >
        <Button style={{ marginTop: "16px" }}>Crie o seu</Button>
      </Link>
    </div>
  )
}