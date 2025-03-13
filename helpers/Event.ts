import { MobileData } from "@/model/MobileData";
import { EEventType, EAuthType, EAction } from "@/model/Enums";
import realmDB from "./Database";
import { ApiService } from "./Service";
import { ioSetting } from '@/model/Config';
import { Lista } from "@/model/Lista";
import { Log } from "./Misc";
import { ToData, ToSts, Clr } from '@/components/redux/Reducer';

export function DoEvent(vieAppEventType: EEventType, vioParams: any, vioDispatch: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        //Log('DoEvent', vieAppEventType.toString())
        switch (vieAppEventType) {
            case EEventType.ChangePass:
                {
                    ApiService('GET', EAuthType.UserPass, "login", `${vioParams[0]}:${vioParams[1]}:${vioParams[2]}`, null)
                        .then((lioMobileData: MobileData) => {
                            if (lioMobileData == undefined || lioMobileData.ioSocio == undefined)
                                reject("2Login");
                            else {
                                let lioDB: realmDB = new realmDB();
                                lioDB.Save(lioMobileData)
                                    .then(() => {
                                        vioDispatch(ToData(lioMobileData));
                                        resolve(lioMobileData);
                                    })
                                    .catch((rioE) => {
                                        reject(rioE);
                                    })
                            }
                        })
                        .catch((rioE) => {
                            reject(rioE);
                        });
                    break;
                }
            case EEventType.Load:
                {
                    let lioDB: realmDB = new realmDB();
                    lioDB.Get()
                        .then((vivstrMobileData) => {
                            const lioData: MobileData = {
                                ...JSON.parse(vivstrMobileData),
                                ioSocio: {
                                    ...JSON.parse(vivstrMobileData).ioSocio,
                                    iEAction : EAction.GetMobileData
                                }
                            };
                            if (lioData == undefined || lioData.ioSocio == undefined)
                                reject("2Login");
                            else {
                                vioDispatch(ToData(lioData));
                                resolve("OK");
                                ApiService('POST', EAuthType.Token, "Action", lioData?.ivstrToken ?? '', { ivnumclub: ioSetting.ivnumClub, ivstrEntityName: "Socio", ioBrObject: lioData.ioSocio })
                                    .then((vioMobileData: MobileData) => {
                                        vioMobileData.ivstrToken = lioData.ivstrToken;
                                        lioDB.Save(vioMobileData);
                                        vioDispatch(ToData(vioMobileData));
                                        if (lioData.ivnroStaticVersion == vioMobileData.ivnroStaticVersion) {
                                            lioDB.Statics()
                                                .then((vivstrStatics) => {
                                                    let lcoListas: Lista[] = JSON.parse(vivstrStatics);
                                                    vioDispatch(ToSts(lcoListas));
                                                })
                                                .catch((rioE) => {
                                                    Log('ErrorSTS2', rioE);
                                                });
                                        }
                                        else {
                                            ApiService('POST', EAuthType.Token, "Static", lioData?.ivstrToken ?? '', { ivnumclub: ioSetting.ivnumClub, ivstrTipo: 'App' })
                                                .then((vcoListas: Lista[]) => {
                                                    lioDB.SaveStatics(vcoListas);
                                                    vioDispatch(ToSts(vcoListas));
                                                })
                                                .catch((rioE) => {
                                                    Log('ErrorSTS1', rioE);
                                                });
                                        }
                                    })
                                    .catch((rioE) => {
                                        Log('Api', rioE);
                                    })
                            }
                        })
                        .catch((rioE) => {
                            Log('DbGet', rioE);
                            reject("2Login");
                        })
                    break;
                }
            case EEventType.Login:
                {
                    ApiService('GET', EAuthType.UserPass, "Login", `${vioParams[0]}:${vioParams[1]}`, null)
                        .then((lioMobileData: MobileData) => {
                            if (lioMobileData == undefined || lioMobileData.ioSocio == undefined)
                                reject(ioSetting.coResources['lioE_NoLoad']);
                            else {
                                let lioDB: realmDB = new realmDB();
                                lioDB.Save(lioMobileData)
                                    .then(() => {
                                        vioDispatch(ToData(lioMobileData));
                                        resolve(lioMobileData);
                                        ApiService('POST', EAuthType.Token, "Static", lioMobileData?.ivstrToken ?? '', { ivnumclub: ioSetting.ivnumClub, ivstrTipo: 'App' })
                                            .then((vcoListas: Lista[]) => {
                                                lioDB.SaveStatics(vcoListas);
                                                vioDispatch(ToSts(vcoListas));
                                            })
                                            .catch((rioE) => {
                                                Log('ErrorSTS1', rioE);
                                            });
                                    })
                                    .catch((rioE) => {
                                        reject(ioSetting.coResources['lioE_Nodb']);
                                    })
                            }
                        })
                        .catch((lioE: any) => {
                            Log('Login', JSON.stringify(lioE));
                            if (lioE == '527') {
                                reject(ioSetting.coResources['lioE_NoAuth']);
                            } else {
                                reject(ioSetting.coResources['lioE_NoLoad']);
                            }
                        });
                    break;
                }
            case EEventType.SaveSocio:
                {
                    let lioDB: realmDB = new realmDB();
                    var lioToSaveData: MobileData = vioParams[0];
                    if (lioToSaveData == undefined || lioToSaveData.ioSocio == undefined) {
                        reject("2Login");
                    }
                    //Log('sava', lioMobileData?.ivstrToken);
                    if (lioToSaveData == undefined || lioToSaveData.ioSocio == undefined)
                        reject(ioSetting.coResources['lioE_NoLoad']);
                    else {
                        lioToSaveData.ioSocio.iEAction = EAction.Save;
                        ApiService('POST', EAuthType.Token, "Action", lioToSaveData?.ivstrToken ?? '', { ivnumclub: ioSetting.ivnumClub, ivstrEntityName: "Socio", ioBrObject: lioToSaveData.ioSocio })
                            .then(() => {
                                lioDB.Save(lioToSaveData).then(() => {
                                    vioDispatch(ToData(lioToSaveData));
                                    resolve("OK");
                                })
                            })
                            .catch((rioE) => {
                                Log('ErrorApi', rioE);
                                reject("rioE");
                            });
                    }
                    break;
                }
            case EEventType.Logout:
                {
                    let lioDB: realmDB = new realmDB();
                    lioDB.Save(null)
                        .then(() => {
                            vioDispatch(Clr());
                            resolve(new MobileData());
                        })
                        .catch((rioE) => {
                            reject(ioSetting.coResources['lioE_Nodb']);
                        })
                    break;
                }
        }
    });
}