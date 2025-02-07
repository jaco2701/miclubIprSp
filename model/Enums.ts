export enum EAction {
        Me = 1,
        Save = 2,
        Delete = 3,
        List = 4,
        Get = 6,
        Build = 7,
        Process = 8,
        UnProcess = 9,
        CtaCte = 10,
        Division = 11,
        Acceso = 12,
        GetMobileData = 13,
        SendCuota = 14,
        GetFilters = 15,
        OrderSocioConcepto = 16
}
export enum EEventType {
    ChangePass,
    GetSocio,
    GetCtaCte,
    ListaDesc,
    Load,
    Login,
    Logout,
    SaveSocio,
}
export enum EAuthType {
    UserPass,
    Token,
}
