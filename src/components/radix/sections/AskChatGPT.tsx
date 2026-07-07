import { Container, Flex, Text, Link } from "@radix-ui/themes";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

const url =
  "https://chatgpt.com/?q=How+can+Jashom+help+my+company+with+GPU+optimization+and+CUDA+development%3F";

export default function AskChatGPT() {
  return (
    <Container style={{ maxWidth: 1280 }} px="5" py="5">
      <Flex align="center" justify="center" gap="2" style={{ borderTop: "1px solid #e4e3de", borderBottom: "1px solid #e4e3de", paddingBlock: "1.25rem" }}>
        <ChatBubbleIcon color="#9b9994" />
        <Text size="2" color="gray">
          Not sure how this helps you? Ask{" "}
          <Link href={url} target="_blank" rel="noreferrer" color="gray" highContrast weight="medium">
            ChatGPT
          </Link>
        </Text>
      </Flex>
    </Container>
  );
}
