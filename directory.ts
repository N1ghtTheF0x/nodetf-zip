import NBuffer from "@nodetf/buffer"
import { CompressionMethod, ZipHeader } from "./utils"

export class DirEntry extends ZipHeader
{
    signature: string = "\x50\x4b\x01\x02"
    version: number = NaN // ushort
    versionNeeded: number = NaN // ushort
    flags: number = NaN // ushort
    compression: CompressionMethod = CompressionMethod.None // ushort
    modTime: number = NaN // ushort
    modDate: number = NaN // ushort
    crc32: number = NaN // uint
    compressionSize: number = NaN // uint
    uncompressionSize: number = NaN // uint
    filenameLen: number = NaN // ushort
    extrafieldLen: number = NaN // ushort
    filecommentLen: number = NaN // ushort
    diskStart: number = NaN // ushort
    internalAttributes: number = NaN // ushort
    externalAttributes: number = NaN // uint
    offsetFileRecord: number = NaN // uint
    filename: string = String() // char[filenameLen]
    extrafield: string = String() // char[extrafieldLen]
    filecomment: string = String() // char[filecommentLen]
    parse(buffer: NBuffer)
    {
        buffer.endian = "little"
        this.signature = buffer.readString(4,"ascii")
        this.version = buffer.readUInt16()
        this.versionNeeded = buffer.readUInt16()
        this.flags = buffer.readUInt16()
        this.compression = buffer.readUInt16()
        this.modTime = buffer.readUInt16()
        this.modDate = buffer.readUInt16()
        this.crc32 = buffer.readUInt32()
        this.compressionSize = buffer.readUInt32()
        this.uncompressionSize = buffer.readUInt32()
        this.filenameLen = buffer.readUInt16()
        this.extrafieldLen = buffer.readUInt16()
        this.filecommentLen = buffer.readUInt16()
        this.diskStart = buffer.readUInt16()
        this.internalAttributes = buffer.readUInt16()
        this.externalAttributes = buffer.readUInt32()
        this.offsetFileRecord = buffer.readUInt32()
        if(this.filenameLen > 0) this.filename = buffer.readString(this.filenameLen,"ascii")
        if(this.extrafieldLen > 0) this.extrafield = buffer.readString(this.extrafieldLen,"ascii")
        if(this.filecommentLen > 0) this.filecomment = buffer.readString(this.filecommentLen,"ascii")
        return this
    }
    toBuffer()
    {
        const buffer = new NBuffer(4+2+2+2+2+2+2+4+4+4+2+2+2+2+2+4+4+this.filenameLen+this.extrafieldLen+this.filecommentLen)
        buffer.endian = "little"
        buffer.writeString(this.signature,"ascii")
        buffer.writeUInt16(this.version)
        buffer.writeUInt16(this.versionNeeded)
        buffer.writeUInt16(this.flags)
        buffer.writeUInt16(this.compression)
        buffer.writeUInt16(this.modTime)
        buffer.writeUInt16(this.modDate)
        buffer.writeUInt32(this.crc32)
        buffer.writeUInt32(this.compressionSize)
        buffer.writeUInt32(this.uncompressionSize)
        buffer.writeUInt16(this.filenameLen)
        buffer.writeUInt16(this.extrafieldLen)
        buffer.writeUInt16(this.filecommentLen)
        buffer.writeUInt16(this.diskStart)
        buffer.writeUInt16(this.internalAttributes)
        buffer.writeUInt32(this.externalAttributes)
        buffer.writeUInt32(this.offsetFileRecord)
        if(this.filenameLen > 0) buffer.writeString(this.filename,"ascii")
        if(this.extrafieldLen > 0) buffer.writeString(this.extrafield,"ascii")
        if(this.filecommentLen > 0) buffer.writeString(this.filecomment,"ascii")
        return buffer
    }
}