import { resolve } from "node:path";
import { inspect, InspectOptions } from "node:util"
import NBuffer from "@nodetf/buffer";

import { readZip } from "./index"

const buffer = NBuffer.read(resolve(process.cwd(),process.argv[2]))

const tags = readZip(buffer)

const options: InspectOptions = {
    maxArrayLength: Infinity
}

console.dir(tags,options)