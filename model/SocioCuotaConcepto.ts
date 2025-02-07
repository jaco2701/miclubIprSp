export class SocioCuotaConcepto {
    ivnumConcepto?:number ;
    ivnroSocioConceptOrden?:number ;
    ivvalConceptoImporte?:number ;
    ivstrConcepto?:string ;
    constructor(vivnumConcepto: number, vivnroSocioConceptOrden:number , vivvalConceptoImporte: number,vivstrConcepto:string) {
        this.ivnumConcepto=vivnumConcepto;
        this.ivnroSocioConceptOrden=vivnroSocioConceptOrden ;
        this.ivvalConceptoImporte = vivvalConceptoImporte ;
        this.ivstrConcepto=vivstrConcepto ;
    }
}


