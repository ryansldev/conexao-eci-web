import { Avatar } from "baseui/avatar";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Textarea } from "baseui/textarea";
import { ParagraphSmall } from "baseui/typography";
import {StatefulPopover} from 'baseui/popover';
import {StatefulMenu} from 'baseui/menu';
import { ChevronDown } from "baseui/icon";

const ITEMS = [
  { label: "Comentário", action: console.log },
  { label: "Enquete", action: console.log }
]

export function New() {  
  return (
    <>
      <FlexGrid
        flexDirection={"row"}
      >
        <FlexGridItem flex={1} style={{ maxWidth: "70px" }}>
          <Avatar />
        </FlexGridItem>
        <FlexGridItem
          flex={1}
        >
          <FlexGrid
            alignItems="center"
            justifyContent={"flex-end"}
            gridGap={"16px"}
          >
            <Textarea
              placeholder="O que está acontecendo?"
              maxLength={150}
            />

            <ParagraphSmall color={"#ddd"}>1/150</ParagraphSmall>
            
            <StatefulPopover
              focusLock
              placement="bottomLeft"
              content={({close}) => (
                <StatefulMenu
                  items={ITEMS}
                  onItemSelect={({item}) => item.action(item.label) && close()}
                  overrides={{
                    List: {style: {height: '90px', width: '138px'}},
                  }}
                />
              )}
              accessibilityType={'tooltip'}
              renderAll
            >
              <Button size="compact" endEnhancer={() => <ChevronDown size={24} />}>
                Publicar
              </Button>
            </StatefulPopover>
          </FlexGrid>
        </FlexGridItem>
      </FlexGrid>
    </>
  )
}