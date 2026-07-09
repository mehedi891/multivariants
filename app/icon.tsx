import { ImageResponse } from "next/og";

// Generated app icon (replaces the missing /icon.png the layout referenced).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 42,
          fontWeight: 800,
          fontFamily: "sans-serif",
          borderRadius: 14,
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
