import { Button } from "baseui/button";
import { FlexGrid } from "baseui/flex-grid";
import { HeadingXSmall, ParagraphSmall } from "baseui/typography";
import Link from "next/link";

interface IChallenge {
  id: string;
  title: string;
  description?: string;
  authorId: string;
}

export default function Challenge({ challenge }: { challenge: IChallenge }) {
  return (
    <FlexGrid
      flexDirection={"column"}
      padding={"24px"}
      flex={1}
      minWidth={"350px"}
      style={{ border: "1px solid #333", borderRadius: ".5vw" }}
    >
      <HeadingXSmall>{challenge.title}</HeadingXSmall>
      <ParagraphSmall marginBottom={"14px"}>{challenge?.description}</ParagraphSmall>
      <Link
        href={`/challenges/${challenge.id}`}
      >
        <Button
          size="compact"
          kind="secondary"
          style={{ width: "100%" }}
        >
          Votar
        </Button>
      </Link>
    </FlexGrid>
  )
}