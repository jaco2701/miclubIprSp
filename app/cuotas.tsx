import { useNavigation, useFocusEffect } from 'expo-router';
import { useEffect, useState, useCallback } from "react"
import { BackHandler } from 'react-native';
import {
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    FlatList,
    TouchableHighlight
} from 'react-native';
import { ioStyles } from '@/constants/Styles';
import { AntDesign } from '@expo/vector-icons';
import { ioSetting, mivnumIconSize, mivnumIconSizeMin } from '@/model/Config';
import { formatDateToYYYYMMDD, Nro2Mes, Str2Any } from '@/helpers/Misc';
import { SocioCuotaConcepto } from '@/model/SocioCuotaConcepto';
import React from 'react';
import { useSelector } from 'react-redux';
import { McState } from '../model/State';
import { selectIoData } from '../components/redux/Selectors';

export default function CuotasScreen() {
    const mioNavigation = useNavigation();
    const mioData = useSelector(selectIoData);
    const [mivstrLoad, setmivblnLoad] = useState(String);
    const [mioSelectedItem, setmioSelectedItem] = useState(null);
    const handlePress = (vioItem: any) => {
        setmioSelectedItem(vioItem);
    };
    const handleBack = () => {
        if (mioSelectedItem) {
            setmioSelectedItem(null);
        }
        else {
            mioNavigation.goBack();
        }
        return true;
    };
    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBack
    );
    useEffect(() => {
        mioNavigation.setOptions({ headerShown: true });
        setmivblnLoad("OK");
    }, [mioNavigation]);
    useFocusEffect(
        useCallback(() => {
            // Reset selected item when the screen is focused
            return () => setmioSelectedItem(null);
        }, [])
    );
    if (!mivstrLoad) {
        return (
            <View style={ioStyles.PageContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>={ioSetting.coResources['lioL_loading']}</Text>
            </View>
        );
    }
    if (mioSelectedItem) {
        return (
            <View style={ioStyles.PageContainer} >
                <View style={ioStyles.GridRowS}>
                    <AntDesign name="filetext1" style={ioStyles.TextIcon} color='black' size={mivnumIconSize} />
                    <Text style={ioStyles.TextInput}>Periodo: {Nro2Mes(mioSelectedItem.ivnroMes, 'S')} / {mioSelectedItem.ivnumAnio}</Text>
                </View>
                <View style={ioStyles.GridRowS}>
                    <AntDesign name="calendar" style={ioStyles.TextIcon} color='black' size={mivnumIconSize} />
                    <Text style={ioStyles.TextInput}>Fecha de Pago: {formatDateToYYYYMMDD(mioSelectedItem.ivdtmFecha)}</Text>
                </View>
                <View style={ioStyles.GridRowS}>
                    <AntDesign name="creditcard" style={ioStyles.TextIcon} color='black' size={mivnumIconSize} />
                    <Text style={ioStyles.TextInput}>Importe Cuota: {mioSelectedItem.ivvalImporteCuota}</Text>
                </View>
                <View style={ioStyles.GridRowS}>
                    <AntDesign name="creditcard" style={ioStyles.TextIcon} color='black' size={mivnumIconSize} />
                    <Text style={ioStyles.TextInput}>Importe Pago: {mioSelectedItem.ivvalImportePago}</Text>
                </View>
                <View style={ioStyles.GridRowS}>
                    <AntDesign name="bars" style={ioStyles.TextIcon} color='black' size={mivnumIconSize} />
                    <Text style={ioStyles.TextInput}>Conceptos:</Text>
                </View>
                <FlatList
                    numColumns={1}
                    data={
                        Str2Any(mioSelectedItem.ivstrConcepto).map((obj: any) =>
                            new SocioCuotaConcepto(obj.ivnumConcepto, obj.ivnroSocioConceptOrden, obj.ivvalConceptoImporte, obj.ivstrConcepto)
                        )}
                    renderItem={({ item }) => (
                        <View style={ioStyles.GridRowM}>
                            <Text style={ioStyles.TextInput}>{item.ivstrConcepto}: {item.ivvalConceptoImporte}</Text>
                        </View>)} />
            </View >
        );
    }

    return (
        <>
            <View style={ioStyles.PageContainer} >
                <FlatList
                    numColumns={1}
                    data={mioData?.coCtaCte}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => handlePress(item)}>
                            <View style={ioStyles.GridRowM}>
                                <AntDesign name={item.ivblnPago ? 'checkcircle' : 'closecircle'} style={ioStyles.TextIcon} color={item.ivblnPago ? 'green' : 'red'} size={mivnumIconSize} />
                                <Text style={ioStyles.TextInput}>{Nro2Mes(item.ivnroMes, 'S')} / {item.ivnumAnio}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </View>
        </>
    );
}

