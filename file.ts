import NBuffer from "@nodetf/buffer"
import { CompressionMethod, ZipHeader } from "./utils"

export class FileRecord extends ZipHeader
{
    signature: string = "\x50\x4b\x03\x04" // char[4]
    version: number = NaN // ushort
    flags: number = NaN // ushort
    compression: CompressionMethod = CompressionMethod.None // ushort
    modTime: number = NaN // ushort
    modDate: number = NaN // ushort
    crc32: number = NaN // uint
    compressionSize: number = NaN // uint
    uncompressionSize: number = NaN // uint
    filenameLen: number = NaN // ushort
    extrafieldLen: number = NaN // ushort
    filename: string = String() // char[filenameLen]
    extrafield: string = String() // char[extrafieldLen]
    data: NBuffer = new NBuffer(0)
    parse(buffer: NBuffer)
    {
        buffer.endian = "little"
        this.signature = buffer.readString(4,"ascii")
        this.version = buffer.readUInt16()
        this.flags = buffer.readUInt16()
        this.compression = buffer.readUInt16()
        this.modTime = buffer.readUInt16()
        this.modDate = buffer.readUInt16()
        this.crc32 = buffer.readUInt32()
        this.compressionSize = buffer.readUInt32()
        this.uncompressionSize = buffer.readUInt32()
        this.filenameLen = buffer.readUInt16()
        this.extrafieldLen = buffer.readUInt16()
        if(this.filenameLen > 0) this.filename = buffer.readString(this.filenameLen,"ascii")
        if(this.extrafieldLen > 0) this.extrafield = buffer.readString(this.extrafieldLen,"ascii")
        if(this.compressionSize > 0) this.data = buffer.subarray(this.compressionSize)
        return this
    }
    toBuffer()
    {
        const buffer = new NBuffer(4+2+2+2+2+2+4+4+4+2+2+this.filenameLen+this.extrafieldLen+this.data.length)
        buffer.endian = "little"
        buffer.writeString(this.signature,"ascii")
        buffer.writeUInt16(this.version)
        buffer.writeUInt16(this.flags)
        buffer.writeUInt16(this.compression)
        buffer.writeUInt16(this.modTime)
        buffer.writeUInt16(this.modDate)
        buffer.writeUInt32(this.crc32)
        buffer.writeUInt32(this.compressionSize)
        buffer.writeUInt32(this.uncompressionSize)
        buffer.writeUInt16(this.filenameLen)
        buffer.writeUInt16(this.extrafieldLen)
        if(this.filenameLen > 0) buffer.writeString(this.filename,"ascii")
        if(this.extrafieldLen > 0) buffer.writeString(this.extrafield,"ascii")
        if(this.compressionSize > 0) buffer.write(this.data)
        return buffer
    }
}