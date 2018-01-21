import { SaveEditor, Stream, crc32 } from 'libvantage';
import { Quantum_Break_Save } from './save';
import { observable } from 'aurelia-framework';
export class Editor implements SaveEditor {
    private QBS: Quantum_Break_Save = null; private Current_Timeline_Image_URL: string = 'src\\images\\1.png'; private Current_Timeline_2 = 1; @observable private Current_Timeline = 1; 
    private Current_TimelineChanged(newValue, oldValue) { if(newValue !== oldValue) { this.Update(); } }
    public load(buffer: Buffer) { this.QBS = new Quantum_Break_Save(new Stream(buffer)); if(this.QBS.IsValid) { this.Current_Timeline = this.QBS.Time_Line; this.Update(); } }
    public Update() { if(this.Current_Timeline_2 !== this.Current_Timeline) { if(this.QBS !== null) { if(this.QBS.IsValid) { this.QBS.Time_Line = this.Current_Timeline; this.Current_Timeline_2 = this.Current_Timeline; this.Current_Timeline_Image_URL = "src\\images\\" + this.Current_Timeline + ".png"; } } } }
    public save(): Buffer  { if(this.QBS !== null) { if(this.QBS.IsValid) { return this.QBS.toBuffer(); } } }
}