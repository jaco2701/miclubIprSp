import { EAction } from "./Enums";
export class DeportistaMedicion {
    ioDcModel?: DeportistaMedicionModel;
    iEAction?: EAction;
    coTomas?: DeportistaMedicionTomasModel[];
    ivstrNombre?: string;
    ivstrKey?: string;
}
export class DeportistaMedicionModel {
    numclub?: number;
    numsocio?: number;
    nummedicion?: number;
    dtmfecha?: Date;
    numtipomedicion?: number;
    strfilename?: string;
}

export class DeportistaMedicionTomasModel {
    numclub?: number;
    numsocio?: number;
    nummedicion?: number;
    nromediciontoma?: number;
    strvalormedicion?: string;
}

