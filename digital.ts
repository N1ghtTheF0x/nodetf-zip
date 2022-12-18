import NBuffer from "@nodetf/buffer"
import { ZipHeader } from "./utils"

export class DigitalSignature extends ZipHeader
{
    signature: string = "\x50\x4b\x05\x05" // char[4]
    extrafieldLen: number = NaN // uint
    extrafield: NBuffer = new NBuffer(0)
    parse(buffer: NBuffer)
    {
        buffer.endian = "little"
        this.signature = buffer.readString(4,"ascii")
        this.extrafieldLen = buffer.readUInt32()
        if(this.extrafieldLen > 0) this.extrafield = buffer.subarray(this.extrafieldLen)
        return this
    }
    toBuffer()
    {
        const buffer = new NBuffer(4+4+this.extrafieldLen)
        buffer.endian = "little"
        buffer.writeString(this.signature,"ascii")
        buffer.writeUInt32(this.extrafieldLen)
        if(this.extrafieldLen > 0) buffer.write(this.extrafield)
        return buffer
    }
}