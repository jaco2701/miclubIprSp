import { useNavigation } from 'expo-router';
import { useEffect, useState } from "react"
import {
    Text,
    View,
    ActivityIndicator,
    TouchableHighlight,
    ScrollView,
    BackHandler,
    TextInput
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
import { Log } from "../helpers/Misc";
import Toast from 'react-native-toast-message';
import Spinner from '../components/spinner';
import SpinnerComponent from '../components/spinner';
import { MobileChgData } from '../model/MobileData';

export default function HomeScreen() {
    const mioDispatch = useDispatch();
    const mioNavigation = useNavigation();
    const [mivstrLoadResponse, setmivstrLoadResponse] = useState('');
    const [mivblnLoading, setmivblnLoading] = useState(true);
    const [mivblnEditMode, setmivblnEditMode] = useState(false);
    const mioData = useSelector(selectIoData);
    const mcoTsocio = useSelector(selectFilteredTsocio);
    const mcoDeportes = useSelector(selectFilteredDepo);
    const mcoTPago = useSelector(selectFilteredTpago);
    const [mioChangedData, setMioChangedData] = useState('');
    const handleBack = () => {
        setmivblnEditMode(false);
        return true;
    };
    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBack
    );
    const chgMode = () => {
        if (mivblnEditMode) {
            setmivblnLoading(true)
            var lioChangedData: MobileChgData = JSON.parse(mioChangedData);
            const lioData = {
                ...mioData,
                ioSocio: {
                    ...mioData.ioSocio,
                    ioDcModel: {
                        ...mioData?.ioSocio?.ioDcModel,
                        strmovil: lioChangedData.strmovil,
                        strnombre: lioChangedData.strnombre,
                        strcorreo: lioChangedData.strcorreo,
                        strDNI: lioChangedData.strDNI,
                        strdomicilio: lioChangedData.strdomicilio,
                        strtelefono: lioChangedData.strtelefono
                    }
                }
            };

            DoEvent(EEventType.SaveSocio, [lioData], mioDispatch)
                .then((vioData) => {
                    setmivblnLoading(false);
                    setmivblnEditMode(!mivblnEditMode)
                })
                .catch((vioMsg) => {
                    Toast.show({
                        type: 'error',
                        text1: vioMsg,
                    });
                    setmivblnLoading(false);
                });
        }
        else {
            setmivblnEditMode(!mivblnEditMode)
        }

    };
    const chgData = (vivnroData: number, vioChgData: any) => {
        var lioChangedData: MobileChgData = mioChangedData
            ?
            JSON.parse(mioChangedData) :
            {
                strnombre: mioData?.ioSocio?.ioDcModel?.strnombre,
                strcorreo: mioData?.ioSocio?.ioDcModel?.strcorreo,
                strDNI: mioData?.ioSocio?.ioDcModel?.strDNI,
                strdomicilio: mioData?.ioSocio?.ioDcModel?.strdomicilio,
                strtelefono: mioData?.ioSocio?.ioDcModel?.strtelefono,
                strmovil: mioData?.ioSocio?.ioDcModel?.strmovil,
            }
        switch (vivnroData) {
            case 1:
                lioChangedData.strnombre = vioChgData;
                break;
            case 2:
                lioChangedData.strcorreo = vioChgData;
                break;
            case 3:
                lioChangedData.strDNI = vioChgData;
                break;
            case 4:
                lioChangedData.strdomicilio = vioChgData;
                break;
            case 5:
                lioChangedData.strtelefono = vioChgData;
                break;
            case 6:
                lioChangedData.strmovil = vioChgData;
                break;

        }
        setMioChangedData(JSON.stringify(lioChangedData));
    }
    useEffect(() => {
        mioNavigation.setOptions({ headerShown: true, title: 'Mis Datos' });
        setmivblnLoading(true)
        DoEvent(EEventType.Load, [], mioDispatch)
            .then((vioData) => {
                setmivstrLoadResponse(vioData)
                setmivblnEditMode(false)
                setmivblnLoading(false)
            })
            .catch((vioMsg) => {
                setmivstrLoadResponse(vioMsg);
                setmivblnLoading(false);
            });
    }, [mioNavigation]);
    if (mivblnLoading) {
        return (
            <View style={ioStyles.CameraContainer}>
                <ActivityIndicator color="black" size="large" />
            </View>
        );
    }
    return (
        <>
            {
                mivstrLoadResponse == "2Login"
                    ?
                    <LoginScreen />
                    :
                    mivstrLoadResponse == "OK"
                        ?
                        mivblnEditMode ?
                            <View style={ioStyles.PageContainer} >
                                <TouchableHighlight onPress={() => chgMode()} style={ioStyles.CmdContainer}>
                                    <View style={ioStyles.Cmd}>
                                        <AntDesign name={mivblnEditMode ? 'check' : 'edit'} color="black" size={mivnumIconSize} />
                                    </View>
                                </TouchableHighlight>
                                <ScrollView keyboardShouldPersistTaps={'handled'}>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="key" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Nro.Socio: {mioData?.ioSocio?.ioDcModel?.numsocio}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="user" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Nombre:</Text>
                                        <TextInput style={ioStyles.TextInput}
                                            defaultValue={mioData?.ioSocio?.ioDcModel?.strnombre}
                                            onChangeText={(vioO) => chgData(1, vioO)}
                                        >
                                        </TextInput>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="mail" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>e-mail:</Text>
                                        <TextInput style={ioStyles.TextInput}
                                            defaultValue={mioData?.ioSocio?.ioDcModel?.strcorreo}
                                            onChangeText={(vioO) => chgData(2, vioO)}
                                        >
                                        </TextInput>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="idcard" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>D.N.I:</Text>
                                        <TextInput style={ioStyles.TextInput}
                                            defaultValue={mioData?.ioSocio?.ioDcModel?.strDNI}
                                            onChangeText={(vioO) => chgData(3, vioO)}
                                        >
                                        </TextInput>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="home" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Domicilio:</Text>
                                        <TextInput style={ioStyles.TextInput}
                                            defaultValue={mioData?.ioSocio?.ioDcModel?.strdomicilio}
                                            onChangeText={(vioO) => chgData(4, vioO)}
                                        >
                                        </TextInput>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="phone" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Telefono:</Text>
                                        <TextInput style={ioStyles.TextInput}
                                            defaultValue={mioData?.ioSocio?.ioDcModel?.strtelefono}
                                            onChangeText={(vioO) => chgData(5, vioO)}
                                        >
                                        </TextInput>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="mobile1" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Celular:</Text>
                                        <TextInput style={ioStyles.TextInput}
                                            defaultValue={mioData?.ioSocio?.ioDcModel?.strmovil}
                                            onChangeText={(vioO) => chgData(6, vioO)}
                                        >
                                        </TextInput>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="lock" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>{ioSetting.coResources['lioL_pass']}</Text>
                                        <TextInput style={ioStyles.TextInput}
                                            defaultValue='       '
                                            onChangeText={(vioO) => chgData(7, vioO)}
                                            secureTextEntry={true}
                                        >
                                        </TextInput>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="lock" style={ioStyles.TextIcon}  color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>{ioSetting.coResources['lioL_pass2']}</Text>
                                        <TextInput style={ioStyles.TextInput}
                                            defaultValue='       '
                                            onChangeText={(vioO) => chgData(7, vioO)}
                                            secureTextEntry={true}
                                        >
                                        </TextInput>
                                    </View>
                                </ScrollView>
                            </View>
                            :
                            <View style={ioStyles.PageContainer} >
                                <TouchableHighlight onPress={() => chgMode()} style={ioStyles.CmdContainer}>
                                    <View style={ioStyles.Cmd}>
                                        <AntDesign name={mivblnEditMode ? 'check' : 'edit'} color="black" size={mivnumIconSize} />
                                    </View>
                                </TouchableHighlight>
                                <ScrollView keyboardShouldPersistTaps={'handled'}>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="key" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Nro.Socio: {mioData?.ioSocio?.ioDcModel?.numsocio}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="user" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Nombre: {mioData?.ioSocio?.ioDcModel?.strnombre}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="filetext1" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Categoria: {mcoTsocio?.filter(x => x.numid == mioData?.ioSocio?.ioDcModel?.nrotipo)[0]?.strdesc ?? ''}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="mail" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>e-mail: {mioData?.ioSocio?.ioDcModel?.strcorreo}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="idcard" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>D.N.I.: {mioData?.ioSocio?.ioDcModel?.strDNI}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="home" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Domicilio: {mioData?.ioSocio?.ioDcModel?.strdomicilio}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="phone" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Telefono: {mioData?.ioSocio?.ioDcModel?.strtelefono}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="mobile1" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Celular: {mioData?.ioSocio?.ioDcModel?.strmovil}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="calendar" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Fecha de Nacimiento: {formatDateToYYYYMMDD(mioData?.ioSocio?.ioDcModel?.dtmnacimiento)}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="skin" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Deporte: {mcoDeportes?.filter(x => x.numid == mioData?.ioSocio?.ioDcModel?.nrodeporte)[0]?.strdesc ?? ''}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="antdesign" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Forma de Pago: {mcoTPago?.filter(x => x.numid == mioData?.ioSocio?.ioDcModel?.nrotipopago)[0]?.strdesc ?? ''}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="creditcard" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Nro Tarjeta de Credito: {mioData?.ioSocio?.ioDcModel?.strnrotarjeta}</Text>
                                    </View>
                                    <View style={ioStyles.GridRowS}>
                                        <AntDesign name="addusergroup" style={ioStyles.TextIcon} color="black" size={mivnumIconSize} />
                                        <Text style={ioStyles.Text}>Titular Familia: {mioData?.ioSocio?.strTitular}</Text>
                                    </View>
                                </ScrollView>
                            </View>
                        :
                        <View style={ioStyles.Center}>
                            <AntDesign name="warning" color="black" size={mivnumAdviceSize} />
                            <Text style={ioStyles.Text}>{mivstrLoadResponse}</Text>
                        </View>
            }
        </>
    );
}
