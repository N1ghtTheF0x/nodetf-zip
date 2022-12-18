import NBuffer from "@nodetf/buffer";
import { DataDescriptor } from "./descriptor";
import { DigitalSignature } from "./digital";
import { DirEntry } from "./directory";
import { FileRecord } from "./file";
import { DirectoryEndLocator } from "./locator";
import { ZipHeader } from "./utils";

export function readZip(buffer: NBuffer)
{
    const tags: ZipHeader[] = []
    while(buffer.readOffset < buffer.length)
    {
        const tag = buffer.readString(4,"ascii")
        buffer.readOffset -= 4
        switch(tag)
        {
            case "\x50\x4b\x03\x04":
                tags.push(new FileRecord().parse(buffer))
                break
            case "\x50\x4b\x05\x05":
                tags.push(new DigitalSignature().parse(buffer))
                break
            case "\x50\x4b\x07\x08":
                tags.push(new DataDescriptor().parse(buffer))
                break
            case "\x50\x4b\x05\x06":
                tags.push(new DirectoryEndLocator().parse(buffer))
                break
            case "\x50\x4b\x01\x02":
                tags.push(new DirEntry().parse(buffer))
                break
            default:
                throw new Error(`Unknown Tag "${tag}"!`)
        }
    }
    return tags
}
export function writeZip(tags: ZipHeader[])
{
    var size = 0
    const buffers = tags.map((tag) => tag.toBuffer())
    for(const buffer of buffers) size += buffer.length
    const buffer = new NBuffer(size)
    for(const _buffer of buffers) buffer.write(_buffer)
    return buffer
}