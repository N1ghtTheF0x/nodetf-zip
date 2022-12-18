import NBuffer from "@nodetf/buffer";
import { ZipHeader } from "./utils";

export class DirectoryEndLocator extends ZipHeader
{
    signature: string = "\x50\x4b\x05\x06" // char[4]
    diskNumber: number = NaN // ushort
    diskStart: number = NaN // ushort
    diskEntries: number = NaN // ushort
    totalEntries: number = NaN // ushort
    centralDirSize: number = NaN // uint
    offsetCentralDir: number = NaN // uint
    commentLen: number = NaN // ushort
    comment: string = String() // char[commentLen]
    parse(buffer: NBuffer): this 
    {
        buffer.endian = "little"
        this.signature = buffer.readString(4,"ascii")
        this.diskNumber = buffer.readUInt16()
        this.diskStart = buffer.readUInt16()
        this.diskEntries = buffer.readUInt16()
        this.totalEntries = buffer.readUInt16()
        this.centralDirSize = buffer.readUInt32()
        this.offsetCentralDir = buffer.readUInt32()
        this.commentLen = buffer.readUInt16()
        if(this.commentLen > 0) this.comment = buffer.readString(this.commentLen,"ascii")    
        return this
    }
    toBuffer(): NBuffer 
    {
        const buffer = new NBuffer(4+2+2+2+2+4+4+2+this.commentLen)
        buffer.endian = "little"
        buffer.writeString(this.signature,"ascii")
        buffer.writeUInt16(this.diskNumber)
        buffer.writeUInt16(this.diskStart)
        buffer.writeUInt16(this.diskEntries)
        buffer.writeUInt16(this.totalEntries)
        buffer.writeUInt32(this.centralDirSize)
        buffer.writeUInt32(this.offsetCentralDir)
        buffer.writeUInt16(this.commentLen)
        if(this.commentLen > 0) buffer.writeString(this.comment,"ascii")
        return buffer
    }
}