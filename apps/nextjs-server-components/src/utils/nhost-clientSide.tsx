'use client'

import { NhostClient } from "@nhost/nhost-js"
import { getConfig} from "./nhost"

const nhost = new NhostClient({
  ...getConfig()
})

export { nhost }