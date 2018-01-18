import { Stream, crc32 } from 'libvantage';

const TL_1 = 'act1_part1';
const TL_2 = 'act1_part2';
const TL_3 = 'act1_part3';
const TL_4 = 'act1junction';
const TL_5 = 'act2_part1';
const TL_6 = 'act2_part1';
const TL_7 = 'act2_part3';
const TL_8 = 'act2junction';
const TL_9 = 'act3_part1';
const TL_10 = 'act3_part2';
const TL_11 = 'act3junction';
const TL_12 = 'act3_part3';
const TL_13 = 'act4_part1_pool';
const TL_14 = 'act5_part2';
const TL_15 = 'act5_part2b';
const TL_16 = 'act4junction';
const TL_17 = 'act6_part1';
const TL_18 = 'act6_part2';
const TL_19 = 'act6_part3';

export class Quantum_Break_Save 
{
    public Time_Line = 0;
    public IsValid = false;
    private TimeLineID = '';
    private Hash_1;
    private Hash_2;
    constructor(io: Stream)
    {
        if (io.readUInt32() !== (io.length - 4)) { throw new Error('Invalid data length.');  }
        io.position = 0xC;
        this.Hash_1 = io.readUInt32();
        this.Hash_2 = crc32(io.readBytes(io.length - 0x10), 0, io.length - 0x10);
        if (this.Hash_1 !== this.Hash_2)  { throw new Error('Invalid hash.'); }
        io.position = 0x10;
        io.readString('ascii',io.readUInt32());
        this.TimeLineID = io.readString('ascii', io.readUInt32());
        if(this.TimeLineID == TL_1) { this.Time_Line = 1; }
        else if(this.TimeLineID == TL_2) { this.Time_Line = 2; }
        else if(this.TimeLineID == TL_3) { this.Time_Line = 3; }
        else if(this.TimeLineID == TL_4) { this.Time_Line = 4; }
        else if(this.TimeLineID == TL_5) { this.Time_Line = 5; }
        else if(this.TimeLineID == TL_6) { this.Time_Line = 6; }
        else if(this.TimeLineID == TL_7) { this.Time_Line = 7; }
        else if(this.TimeLineID == TL_8) { this.Time_Line = 8; }
        else if(this.TimeLineID == TL_9) { this.Time_Line = 9; }
        else if(this.TimeLineID == TL_10) { this.Time_Line = 10; }
        else if(this.TimeLineID == TL_11) { this.Time_Line = 11; }
        else if(this.TimeLineID == TL_12) { this.Time_Line = 12; }
        else if(this.TimeLineID == TL_13) { this.Time_Line = 13; }
        else if(this.TimeLineID == TL_14) { this.Time_Line = 14; }
        else if(this.TimeLineID == TL_15) { this.Time_Line = 15; }
        else if(this.TimeLineID == TL_16) { this.Time_Line = 16; }
        else if(this.TimeLineID == TL_17) { this.Time_Line = 17; }
        else if(this.TimeLineID == TL_18) { this.Time_Line = 18; }
        else if(this.TimeLineID == TL_19) { this.Time_Line = 19; }
        else { throw new Error('Invalid TimeLineID.'); }
        if(this.Time_Line > 0) { if(this.Time_Line < 20) { this.IsValid = true; } }
    }
    public toBuffer(): Buffer
    {
        const io = Stream.reserve(0x300);
        io.writeUInt32(0x101);
        io.writeUInt32(0x7E);
        io.writeUInt32(0x7E);
        io.writeUInt32(0x99);
        for (let x = 0; x < 2; x++)
        {
            io.writeUInt32(0x9);
            io.writeString('gameworld');
            if(this.Time_Line == 1) { io.writeUInt32(TL_1.length); io.writeString(TL_1); }
            else if(this.Time_Line == 2) { io.writeUInt32(TL_2.length); io.writeString(TL_2); }
            else if(this.Time_Line == 3) { io.writeUInt32(TL_3.length); io.writeString(TL_3); }
            else if(this.Time_Line == 4) { io.writeUInt32(TL_4.length); io.writeString(TL_4); }
            else if(this.Time_Line == 5) { io.writeUInt32(TL_5.length); io.writeString(TL_5); }
            else if(this.Time_Line == 6) { io.writeUInt32(TL_6.length); io.writeString(TL_6); }
            else if(this.Time_Line == 7) { io.writeUInt32(TL_7.length); io.writeString(TL_7); }
            else if(this.Time_Line == 8) { io.writeUInt32(TL_8.length); io.writeString(TL_8); }
            else if(this.Time_Line == 9) { io.writeUInt32(TL_9.length); io.writeString(TL_9); }
            else if(this.Time_Line == 10) { io.writeUInt32(TL_10.length); io.writeString(TL_10); }
            else if(this.Time_Line == 11) { io.writeUInt32(TL_11.length); io.writeString(TL_11); }
            else if(this.Time_Line == 12) { io.writeUInt32(TL_12.length); io.writeString(TL_12); }
            else if(this.Time_Line == 13) { io.writeUInt32(TL_13.length); io.writeString(TL_13); }
            else if(this.Time_Line == 14) { io.writeUInt32(TL_14.length); io.writeString(TL_14); }
            else if(this.Time_Line == 15) { io.writeUInt32(TL_15.length); io.writeString(TL_15); }
            else if(this.Time_Line == 16) { io.writeUInt32(TL_16.length); io.writeString(TL_16); }
            else if(this.Time_Line == 17) { io.writeUInt32(TL_17.length); io.writeString(TL_17); }
            else if(this.Time_Line == 18) { io.writeUInt32(TL_18.length); io.writeString(TL_18); }
            else if(this.Time_Line == 19) { io.writeUInt32(TL_19.length); io.writeString(TL_19); }
            if(x == 0) { io.writeByte(1); }
        }
        io.writeUInt32(0x0);
        io.writeUInt32(0x01);
        io.writeUInt32(0x20001);
        io.writeUInt32(0x50000);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x3F8000);
        io.writeUInt32(0x3F8000);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x3F8000);
        io.writeUInt32(0x3F8000);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x3F8000);
        io.writeUInt32(0x3F8000);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x3F8000);
        io.writeUInt32(0x3F8000);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x2000000);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0xBF800000);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0xFF0000);
        io.writeUInt32(0xFF000000);
        io.writeUInt32(0xFFFFFFFF);
        io.writeUInt32(0xFF);
        io.writeUInt32(0xFFFFFFFF);
        io.writeUInt32(0xFFFF);
        io.writeUInt32(0xFFFFFF00);
        io.writeUInt32(0xFFFFFF);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        io.writeUInt32(0x0);
        const Len = io.position;
        io.position = 0;
        const io2 = Stream.reserve(Len);
        io2.writeBytes(io.readBytes(Len));

        io2.position = 0x0;
        io2.writeUInt32(Len - 4);
        io2.position = 0x10;
        this.Hash_2 = crc32(io2.readBytes(Len - 0x10));
        io2.position = 0xC;
        io2.writeUInt32(this.Hash_2);
        return io2.getBuffer();
    }
}