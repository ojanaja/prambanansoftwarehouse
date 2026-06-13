import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/api";

export const runtime = "edge";

export const alt = "Prambanan Digital Insights";
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

export default async function Image({ params }: ImageProps) {
  const post = await getArticleBySlug(params.slug);
  const title = post?.title || "Insights";
  const author = post?.author?.name || "Prambanan Editorial";

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
            Prambanan Digital / Insights
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
              Written by
            </div>
            <div style={{ fontSize: "24px", color: "#ffffff", fontWeight: "bold" }}>
              {author}
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
