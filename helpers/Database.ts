
import { Lista } from '@/model/Lista';
import { Realm } from '@realm/react';
const MobileData = {
    name: "MobileData",
    properties: {
        ioData: "string",
    },
};
const Statics = {
    name: "Statics",
    properties: {
        ioData: "string",
    },
};

class realmDB {
    realmLocal: Realm;
    constructor() {
        this.realmLocal = new Realm({
            schemaVersion: 101, schema: [MobileData, Statics]
        });
        this.realmLocal.beginTransaction();
        this.realmLocal.create("MobileData", { ioData: ''});
        this.realmLocal.commitTransaction();
    }
    Save(vioData: any) {
        return new Promise<void>((resolve, reject) => {
            this.realmLocal.write(() => {
                this.realmLocal.delete(this.realmLocal.objects('MobileData'))
                this.realmLocal.create("MobileData", { ioData: JSON.stringify(vioData) });
                resolve();
            });
        });
    }
    Get(): Promise<string> {
        return new Promise((resolve, reject) => {
            let lioDbObj: any = this.realmLocal.objects('MobileData')[0];
            resolve(lioDbObj?.ioData ?? null);
        });
    }
    Statics(): Promise<string> {
        return new Promise((resolve, reject) => {
            let lioDbObj: any = this.realmLocal.objects('Statics')[0];
            resolve(lioDbObj?.ioData ?? null);
        });
    }
    SaveStatics(vioData: any) {
        return new Promise<void>((resolve, reject) => {
            this.realmLocal.write(() => {
                this.realmLocal.delete(this.realmLocal.objects('Statics'))
                this.realmLocal.create("Statics", { ioData: JSON.stringify(vioData) });
                resolve();
            });
        });
    }
}
export default realmDB;