/* eslint-disable @next/next/no-img-element */
import { Container, Box } from "@radix-ui/themes";

const logos = [
  { name: "NVIDIA", url: "https://www.pngarts.com/files/10/Nvidia-Logo-PNG-Image-Transparent.png", h: 56, scale: 1.4 },
  { name: "Anthropic Claude", url: "/brand-logo/clude.png", h: 34 },
  { name: "Ollama", url: "/brand-logo/ollama-logo.png", h: 36 },
  { name: "Amazon Web Services", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/960px-Amazon_Web_Services_Logo.svg.png", h: 44 },
  { name: "Hugging Face", url: "/brand-logo/Hugging-face.png", h: 38 },
  { name: "ChatGPT", url: "https://www.edigitalagency.com.au/wp-content/uploads/new-ChatGPT-logo-black-png-large-size.png", h: 38 },
];

export default function UsedBy() {
  return (
    <Box style={{ background: "var(--bg-primary)", borderBottom: "1px solid #e4e3de" }} py="7">
      <Container style={{ maxWidth: 1280 }} px="5">
        <Box style={{ textAlign: "center" }} mb="5">
          <span className="j-eyebrow">Frontier Labs</span>
        </Box>
        <Box
          style={{
            maxWidth: 1100,
            marginInline: "auto",
            borderTop: "1px solid #e4e3de",
            borderLeft: "1px solid #e4e3de",
            background: "#fff",
            boxShadow: "6px 6px 0 0 #e4e3de",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
          className="j-logo-grid"
        >
          {logos.map((l) => (
            <Box
              key={l.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 120,
                padding: "2rem 1.5rem",
                borderRight: "1px solid #e4e3de",
                borderBottom: "1px solid #e4e3de",
              }}
            >
              <img
                src={l.url}
                alt={l.name}
                style={{ height: l.h, width: "auto", objectFit: "contain", transform: l.scale ? `scale(${l.scale})` : undefined }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
