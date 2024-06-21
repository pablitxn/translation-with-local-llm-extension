// import Logger from "pino"
import { config } from "dotenv"
import path from "path"
import fs from "fs"

config()

async function updateManifesJSON() {
  const manifestPath = path.resolve(__dirname, "../dist/manifest.json")
  const env = process.env.NODE_ENV

  const extensionName =
    env === "production" ? "Computress" : `Computress (${env})`

  const varsToReplace = {
    name: `${extensionName}`,
    action: {
      default_title: `${extensionName}`,
      default_popup: "popup.html",
      // default_icon: "favicon.png"
    },
    host_permissions: [`${process.env.HOST_PERMISSIONS}`]
  }

  const currentManifest = JSON.parse(fs.readFileSync(manifestPath).toString())
  const newManifest = JSON.stringify({ ...currentManifest, ...varsToReplace }, null, 2)
  fs.writeFileSync(manifestPath, newManifest)
}

;(async () => {
  console.log("Updating manifest.json...")
  await updateManifesJSON()
  console.log("manifest.json updated!")
})()
