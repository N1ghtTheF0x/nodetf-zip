import NBuffer from "@nodetf/buffer"
import { ZipHeader } from "./utils"

export class DataDescriptor extends ZipHeader
{
    signature: string = "\x50\x4b\x07\x08" // char[4]
    crc: number = NaN // uint
    compressedSize: number = NaN // uint
    uncompressedSize: number = NaN // uint
    parse(buffer: NBuffer)
    {
        buffer.endian = "little"
        this.signature = buffer.readString(4,"ascii")
        this.crc = buffer.readUInt32()
        this.compressedSize = buffer.readUInt32()
        this.uncompressedSize = buffer.readUInt32()
        return this
    }
    toBuffer(): NBuffer
    {
        const buffer = new NBuffer(4+4+4+4)
        buffer.endian = "little"
        buffer.writeString(this.signature,"ascii")
        buffer.writeUInt32(this.crc)
        buffer.writeUInt32(this.compressedSize)
        buffer.writeUInt32(this.uncompressedSize)
        return buffer
    }
}