import { readFileSync } from "fs"
import { resolve } from "path"

import { SITE } from "@config"

const logoSrc = `data:image/png;base64,${readFileSync(
  resolve("public/logo.png"),
).toString("base64")}`

const SiteOgTemplate = () => {
  return (
    <div
      style={{
        background: "#fdf6e3",
        color: "#042f2e",
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "48px",
      }}
    >
      <div
        style={{
          border: "4px solid #042f2e",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontFamily: "Merriweather",
                fontSize: 72,
                fontWeight: 700,
                margin: 0,
              }}
            >
              {SITE.author}
            </p>
            <p
              style={{
                fontFamily: "Lato",
                fontSize: 52,
                margin: "28px 0 0",
              }}
            >
              Make ship happen
            </p>
          </div>
          <img
            src={logoSrc}
            alt=""
            width={168}
            height={168}
            style={{ flexShrink: 0 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontFamily: "Lato",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          {new URL(SITE.website).hostname}
        </div>
      </div>
    </div>
  )
}

export default SiteOgTemplate
