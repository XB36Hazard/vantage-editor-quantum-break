import { Stream, crc32 } from 'libvantage';
const Acts = ['act1_part1', 'act1_part2', 'act1_part3', 'act1junction', 'act2_part1', 'act2_part2', 'act2_part3', 'act2junction', 'act3_part1', 'act3_part2', 'act3junction', 'act3_part3', 'act4_part1_pool', 'act5_part2', 'act5_part2b', 'act4junction', 'act6_part1', 'act6_part2', 'act6_part3'];
export class Quantum_Break_Save {
    public Time_Line = -1;
    public IsValid = false;
    constructor(io: Stream) {
        if (io.readUInt32() !== (io.length - 4)) {
            this.show_message('Error: Invalid Data Length!'); throw new Error('Invalid Data Length!'); 
        }
        else {
            io.position = 0xC;
            const Hash_1 = io.readUInt32();
            const Hash_2 = crc32(io.readBytes(io.length - 0x10), 0, io.length - 0x10);
            if (Hash_1 !== Hash_2) { 
                this.show_message('Error: Invalid Hash!'); throw new Error('Invalid Hash!'); 
            }
            else {
                io.position = 0x10;
                io.readString('ascii',io.readUInt32());
                const TimeID: String = io.readString('ascii', io.readUInt32());
                for(let i = 0; i < Acts.length; i++) {
                    if(Acts[i] == TimeID) {
                        this.Time_Line = i + 1;
                        break;
                    }
                }
                if(this.Time_Line > 0) { if(this.Time_Line < 20) { this.IsValid = true; } }
                if(!this.IsValid) { this.show_message('Invalid Data!'); throw new Error('Invalid Data!');  }
            }
        }
    }
    private write_loop(io:Stream, count:number, value:number) { for(let x = 0; x < count; x++) { io.writeUInt32(value); } }
    public show_message(message:string) { alert(message); }
    public toBuffer(): Buffer {
        const Data_Length:number = 0xE7 + (Acts[this.Time_Line - 1].length * 2);
        const io = Stream.reserve(Data_Length);
        io.writeUInt32(Data_Length - 4);
        io.writeUInt32(0x7E);
        io.writeUInt32(0x7E);
        io.writeUInt32(0x0);
        for (let x = 0; x < 2; x++) {
            io.writeUInt32(0x9);
            io.writeString('gameworld');
            io.writeUInt32(Acts[this.Time_Line - 1].length); 
            io.writeString(Acts[this.Time_Line - 1]);
            if(x == 0) { io.writeByte(1); }
        }
        io.writeUInt32(0x0);
        io.writeUInt32(0x1);
        io.writeUInt32(0x20001);
        io.writeUInt32(0x50000);
        this.write_loop(io, 4, 0);
        this.write_loop(io, 2, 0x3F8000);
        this.write_loop(io, 2, 0);
        this.write_loop(io, 2, 0x3F8000);
        this.write_loop(io, 3, 0);
        this.write_loop(io, 2, 0x3F8000);
        this.write_loop(io, 2, 0);
        this.write_loop(io, 2, 0x3F8000);
        this.write_loop(io, 3, 0);
        io.writeUInt32(0x2000000);
        this.write_loop(io, 3, 0);
        io.writeUInt32(0xBF800000);
        this.write_loop(io, 2, 0);
        io.writeUInt32(0xFF0000);
        io.writeUInt32(0xFF000000);
        io.writeUInt32(0xFFFFFFFF);
        io.writeUInt32(0xFF);
        io.writeUInt32(0xFFFFFFFF);
        io.writeUInt32(0xFFFF);
        io.writeUInt32(0xFFFFFF00);
        io.writeUInt32(0xFFFFFF);
        this.write_loop(io, 4, 0);
        io.position = 0x10;
        const Hash = crc32(io.readBytes(Data_Length - 0x10));
        io.position = 0xC;
        io.writeUInt32(Hash);
        return io.getBuffer();
    }
}