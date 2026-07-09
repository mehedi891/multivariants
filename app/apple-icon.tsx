import { ImageResponse } from "next/og";

// Generated apple-touch icon (replaces the missing /apple-icon.png reference).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #5C6AC4 0%, #3f4eae 100%)",
          color: "white",
          fontSize: 118,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
