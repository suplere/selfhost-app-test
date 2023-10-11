import { NhostClient } from "@nhost/nhost-js"
import { getNhostConfig } from "./helpers"

const nhost = new NhostClient({
  ...getNhostConfig()
})

export { nhost }