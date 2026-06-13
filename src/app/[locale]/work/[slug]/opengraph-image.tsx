import { ImageResponse } from "next/og";
import { getPortfolioBySlug } from "@/lib/api";

export const runtime = "edge";

export const alt = "Prambanan Digital Case Study";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface ImageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Helper to format category for the OG preview card
const formatCategory = (cat?: string) => {
  if (!cat) return "Case Study";
  if (cat === "web" || cat === "webapp") return "Web App";
  if (cat === "mobile") return "Mobile App";
  if (cat === "design") return "UI/UX Design";
  return cat;
};

export default async function Image({ params }: ImageProps) {
  const project = await getPortfolioBySlug(params.slug);
  const title = project?.title || "Case Study";
  const categoryName = formatCategory(project?.category);

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "24px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#ec4323",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            Prambanan Digital / Case Study
          </div>
          {/* Main Title */}
          <div
            style={{
              fontSize: "54px",
              color: "#ffffff",
              fontWeight: "extrabold",
              lineHeight: 1.25,
              maxHeight: "270px",
              overflow: "hidden",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "2px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "16px", color: "#94a3b8", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Project Type
            </div>
            <div style={{ fontSize: "24px", color: "#ffffff", fontWeight: "bold" }}>
              {categoryName}
            </div>
          </div>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(236, 67, 35, 0.1)",
              border: "1.5px solid rgba(236, 67, 35, 0.3)",
              padding: "12px 28px",
              borderRadius: "999px",
            }}
          >
            <div style={{ fontSize: "18px", color: "#ec4323", fontWeight: "bold" }}>
              prambanandigital.web.id
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
