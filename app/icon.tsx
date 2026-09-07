import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Generated placeholder favicon (navy shield, gold "MU") so the browser tab
// never shows a broken icon. Once /public/images/manassas-united-logo.png
// is added, you can delete this file and Next.js will fall back to the
// `icons` entry in app/layout.tsx metadata, which already points there.
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
          background: "#001A42",
          border: "2px solid #FDBD10",
          borderRadius: 6,
          color: "#FDBD10",
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        MU
      </div>
    ),
    size,
  );
}
