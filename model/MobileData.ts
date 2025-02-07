import { Socio } from "./Socio";
import { SocioCtaCte } from "./SocioCtaCte";
import { Lista } from "./Lista";
import { Deportista } from "./Deportista";
import { Division } from "./Division";
import { DeportistaMedicion } from "./DeportistaMedicion";
import { EventoDivision } from "./EventoDivision";
import { SocioEvento } from "./SocioEvento";
import { Evento } from "./Evento";

export class MobileData {
    ioSocio?: Socio;
    coCtaCte?: SocioCtaCte[];
    coDeportistas?: Deportista[];
    coDivisiones?: Division[];
    coMediciones?: DeportistaMedicion[];
    coEventosDivisiones?: EventoDivision[];
    coEventos?: Evento[];
    coSocioEventos?: SocioEvento[];
    ivstrToken?: string;
    ivnroStaticVersion?: number;
}
