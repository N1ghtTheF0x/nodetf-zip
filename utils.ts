import NBuffer from "@nodetf/buffer";

export enum CompressionMethod
{
    None,
    Shrunk,
    Reduced1,
    Reduced2,
    Reduced3,
    Reduced4,
    Imploded,
    __Reserved1,
    Deflated,
    DeflatedPlus,
    ImplodedDCL,
    __Reserved2,
    BZip2,
    __Reserved3,
    LZMA,
    __Reserved4,
    __Reserved5,
    __Reserved6,
    TERSE,
    LZ77,
    PPMd = 98
}

export abstract class ZipHeader
{
    abstract signature: string // char[4] = "PK\x_\x_"
    abstract parse(buffer: NBuffer): this 
    abstract toBuffer(): NBuffer
}