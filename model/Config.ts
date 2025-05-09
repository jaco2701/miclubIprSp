import { Dimensions } from 'react-native'
export const ioSetting = {
    "coEndPoints": {
        "Base": "https://api.iprsportingclub.com/api",
        "Login": "login/1",
        "Action": "action",
        "Static": "statics"
    },
    "coResources": {
        "lioE_NoLoad": "No hemos podido cargar tus datos, intenta nuevamente en unos minutos...",
        "lioE_NoAuth": "Nro. de Socio, e-mail o contraseña incorrecto",
        "lioL_division": "Division...",
        "lioL_deporte": "Deporte...",
        "lioL_deportista": "Deportista...",
        "lioL_login": "INGRESAR",
        "lioL_loading": "Cargando...",
        "lioL_nombrejugador": "Jugador...",
        "lioL_pass": "contraseña     ",
        "lioL_pass2": "repita contraseña",
        "lioL_user": "nro. socio / e-mail      ",
        "lioE_Nodb": "Error en Recuperacion de informacion local     ",
    },
    "coMenu": [
        { "strTitle": "Incio", "strComponent": "Home", "blnDividerAfter": true },
        { "strTitle": "Mis Datos", "strComponent": "MisDatos", "blnDividerAfter": false },
        { "strTitle": "Mis Cuotas", "strComponent": "MisCuotas", "blnDividerAfter": false },
        { "strTitle": "Mis Mediciones", "strComponent": "MisMediciones", "blnDividerAfter": false },
        { "strTitle": "Estacionamiento", "strComponent": "MiEstacionamiento", "blnDividerAfter": false },
        { "strTitle": "Gimnasio", "strComponent": "MiGym", "blnDividerAfter": false },
        { "strTitle": "Manager / Entrenador", "strComponent": "Eventos", "blnDividerAfter": false },
        { "strTitle": "Preparador Fisico / Entrenador", "strComponent": "Mediciones", "blnDividerAfter": true },
        { "strTitle": "Salir", "strComponent": "Home", "blnDividerAfter": false },
    ],
    "ivnumClub": "1",
    "ioMockData": {
        "ioSocio": {
            "ioDcModel": {
                "numclub": 1,
                "numsocio": 2105,
                "nrotipo": 4,
                "pass": "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
                "strcorreo": "mgraziani@applet.com.ar",
                "strDNI": "21861169",
                "strnombre": "GRAZIANI FERNANDO MARTIN",
                "strdomicilio": " Los abedules 5802",
                "strtelefono": "01123162701",
                "strmovil": " 01123162701",
                "dtmnacimiento": "1971-01-27T00:00:00",
                "nrodeporte": 1,
                "blngym": false,
                "numsocioflia": 0,
                "nrotipopago": 1,
                "strnrotarjeta": "4548463000405689",
                "blnlogxmail": false,
                "nroescuela": 0,
                "dtmbaja": null,
                "dtmalta": "2024-07-01T00:00:00"
            },
            "ivblnmayor": true,
            "ivvalDeuda": 18941.61
        },
        "coCtaCte": null,
        "coListas": null,
        "coDeportistas": null,
        "coDivisiones": null,
        "coMediciones": null,
        "coEventosDivisiones": null,
        "coEventos": null,
        "coSocioEventos": null
    },
    "ivnumLogLevel": 1
}


export const coAssets = {
    imgLogo: require('../assets/logo.png'),
    imgLogo2: require('../assets/logo2.png'),
    imgHomeBackground: require('../assets/home.jpg'),
}
export const mivnumAdviceSize = Dimensions.get('window').height * .3;
export const mivnumFotoCarnetWidth = Dimensions.get('window').width * .4;
export const mivnumFotoCarnetHeight = Dimensions.get('window').width * .5;
export const mivnumQRSize = Dimensions.get('window').width * .3;
export const mivnumIconSize = Dimensions.get('window').height * .04;
export const mivnumIconSizeM = Dimensions.get('window').height * .08;
export const mivnumCmdSize = Dimensions.get('window').height * .06;
export const mivnumIconSizeMin = Dimensions.get('window').height * .01;
