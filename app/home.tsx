import { useNavigation } from 'expo-router';
import { useEffect, useState } from "react"
import {
    Text,
    View,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { ioStyles } from '@/constants/Styles';
import { DoEvent } from '@/helpers/Event';
import { EEventType } from '@/model/Enums';
import LoginScreen from './login';
import { AntDesign } from '@expo/vector-icons';
import { mivnumAdviceSize, ioSetting, mivnumIconSize } from '@/model/Config';
import { formatDateToYYYYMMDD } from '@/helpers/Misc';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredDepo, selectFilteredTsocio, selectFilteredTpago, selectIoData } from '../components/redux/Selectors';

export default function HomeScreen() {
    const mioDispatch = useDispatch();
    const mioNavigation = useNavigation();
    const [mivstrLoad, setmivstrLoad] = useState(String);
    const mioData = useSelector(selectIoData);
    const mcoTsocio = useSelector(selectFilteredTsocio);
    const mcoDeportes = useSelector(selectFilteredDepo);
    const mcoTPago = useSelector(selectFilteredTpago);

    useEffect(() => {
        mioNavigation.setOptions({ headerShown: true, title:'Mis Datos' });
        DoEvent(EEventType.Load, [], mioDispatch)
            .then((vioData) => {
                setmivstrLoad(vioData)
            })
            .catch((vioMsg) => setmivstrLoad(vioMsg));
    }, [mioNavigation]);
    if (!mivstrLoad) {
        return (
            <View style={ioStyles.PageContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>={ioSetting.coResources['lioL_loading']}</Text>
            </View>
        );
    }
    return (
        <>
            {
                mivstrLoad == "2Login"
                    ?
                    <LoginScreen />
                    :
                    mivstrLoad == "OK"
                        ?
                        <View style={ioStyles.PageContainer} >
                            <ScrollView keyboardShouldPersistTaps={'handled'}>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="key" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Nro.Socio: {mioData?.ioSocio?.ioDcModel?.numsocio}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="user" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Nombre: {mioData?.ioSocio?.ioDcModel?.strnombre}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="filetext1" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Categoria: {mcoTsocio?.filter(x => x.numid == mioData?.ioSocio?.ioDcModel?.nrotipo)[0]?.strdesc ?? ''}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="mail" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>e-mail: {mioData?.ioSocio?.ioDcModel?.strcorreo}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="idcard" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>D.N.I.: {mioData?.ioSocio?.ioDcModel?.strDNI}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="home" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Domicilio: {mioData?.ioSocio?.ioDcModel?.strdomicilio}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="phone" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Telefono: {mioData?.ioSocio?.ioDcModel?.strtelefono}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="mobile1" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Celular: {mioData?.ioSocio?.ioDcModel?.strmovil}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="calendar" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Fecha de Nacimiento: {formatDateToYYYYMMDD(mioData?.ioSocio?.ioDcModel?.dtmnacimiento)}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="skin" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Deporte: {mcoDeportes?.filter(x => x.numid == mioData?.ioSocio?.ioDcModel?.nrodeporte)[0]?.strdesc ?? ''}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="antdesign" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Forma de Pago: {mcoTPago?.filter(x => x.numid == mioData?.ioSocio?.ioDcModel?.nrotipopago)[0]?.strdesc ?? ''}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="creditcard" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Nro Tarjeta de Credito: {mioData?.ioSocio?.ioDcModel?.strnrotarjeta}</Text>
                                </View>
                                <View style={ioStyles.GridRowS}>
                                    <AntDesign name="addusergroup" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                    <Text style={ioStyles.TextInput}>Titular Familia: {mioData?.ioSocio?.strTitular}</Text>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        <View style={ioStyles.Center}>
                            <AntDesign name="warning" color="black" size={mivnumAdviceSize} />
                            <Text style={ioStyles.TextInput}>{mivstrLoad}</Text>
                        </View>
            }
        </>
    );
}
