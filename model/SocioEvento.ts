import { EDcOper } from "./Enums";
export class SocioEvento {
    ioDcModel?: SocioEventoModel;
    ieDcOper?: EDcOper;
}
export class SocioEventoModel {
    numclub?: number;
    numsocio?: number;
    numevento?: number;
    blnpago?: boolean;
    numimputacion?: number;
}
