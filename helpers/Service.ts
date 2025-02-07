import { MobileData } from "@/model/MobileData";
import { ioSetting } from "@/model/Config";
import { EAuthType } from "@/model/Enums";
import { Exception } from "@/model/Exception";
import { Log } from "./Misc";
export function ApiService(vivstrMethod: string, viEAuthType: EAuthType, vivstrRoute: string, vivstrCredentials: string, vioPayload: any): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(
            `${ioSetting.coEndPoints.Base}/${(ioSetting.coEndPoints as any)[vivstrRoute]}`,
            vioPayload
                ?
                {
                    method: vivstrMethod,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': viEAuthType == EAuthType.Token ? `MaToken ${vivstrCredentials}` : `MaAuth ${btoa(vivstrCredentials)}`,
                    },
                    body: JSON.stringify(vioPayload)
                }
                :
                {
                    method: vivstrMethod,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': viEAuthType == EAuthType.Token ? `MaToken ${vivstrCredentials}` : `MaAuth ${btoa(vivstrCredentials)}`,
                    }
                }
        ).then((vioResponse) => {
            if (!vioResponse.ok) {
                reject(vioResponse.status);
            }
            vioResponse.json()
                .then((json) => {
                    resolve(json);
                })
                .catch((lioE) => {
                    resolve("OK");
                });
        }).catch((lioE) => {
            reject(lioE);
        });
    });
}