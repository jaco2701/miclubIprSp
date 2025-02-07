import { formatDateToYYYYMMDD } from "@/helpers/Misc";
import { EAction } from "./Enums";
export class Socio {
    ioDcModel?: SocioModel;
    ivblnmayor?: boolean;
    ivvalDeuda?: number;
    iEAction?: EAction;
    ivstrFoto?: string;
    strTitular?: string;
}
export class SocioModel {
    numclub?: number;
    numsocio?: number;
    nrotipo?: number;
    pass?: string;
    strcorreo?: string;
    strDNI?: string;
    strnombre?: string;
    strdomicilio?: string;
    strtelefono?: string;
    strmovil?: string;
    dtmnacimiento?: Date;
    nrodeporte?: number;
    blngym?: boolean;
    numsocioflia?: number;
    nrotipopago?: number;
    strnrotarjeta?: string;
    blnlogxmail?: boolean;
    nroescuela?: number;
    dtmbaja?: Date;
    dtmalta?: Date;
}
