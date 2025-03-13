import { useNavigation } from 'expo-router';
import { useEffect, useState } from "react"
import {
    Text,
    View,
    ActivityIndicator,
    TouchableHighlight,
    Image
} from 'react-native';
import { ioStyles } from '@/constants/Styles';
import { AntDesign } from '@expo/vector-icons';
import { ioSetting, mivnumIconSizeM, mivnumQRSize } from '@/model/Config';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { McState } from '../model/State';
import CameraComponent from '../components/camera';
import { DoEvent } from '../helpers/Event';
import { EEventType } from '../model/Enums';
import QRCode from 'react-native-qrcode-svg';
import { selectFilteredTsocio, selectIoData } from '../components/redux/Selectors';
export default function CarnetScreen() {
    const mioDispatch = useDispatch();
    const mioData = useSelector(selectIoData);
    const mioNavigation = useNavigation();
    const mcoTsocio = useSelector(selectFilteredTsocio);
    const [mivblnLoading, setmivblnLoading] = useState(true);
    const [mivblnCamera, setmivblnCamera] = useState(false);
    useEffect(() => {
        mioNavigation.setOptions({ headerShown: true });
        setmivblnLoading(false);
    }, [mioNavigation]);
    const handlePictureTaken = (vivstrB64: string) => {
        const lioData = {
            ...mioData,
            ioSocio: {
                ...mioData?.ioSocio,
                ivstrFoto: vivstrB64,
                ioDcModel: {
                    ...mioData?.ioSocio?.ioDcModel
                },
            },
        };
        DoEvent(EEventType.SaveSocio, [lioData], mioDispatch)
            .then((vioData) => {
                setmivblnCamera(false);
                mioNavigation.setOptions({ headerShown: true });
            });
    }

    if (mivblnLoading) {
        <View style={ioStyles.PageContainer}>
            <ActivityIndicator color="black" size="large" />
        </View>
    }
    if (mivblnCamera) {
        return (
            <View style={ioStyles.PageContainer}>
                <CameraComponent onPictureTaken={handlePictureTaken} />
            </View>
        );
    }
    return (
        <View style={ioStyles.PageContainer} >
            <View style={ioStyles.Center} >
                <View style={ioStyles.ImgContainer}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64, ${mioData?.ioSocio?.ivstrFoto}` }}
                        style={ioStyles.FocusContainer}
                    />
                </View>
                <View style={ioStyles.ImgContainer}>
                    <TouchableHighlight onPress={() => setmivblnCamera(true)}>
                            <AntDesign name="camera" style={ioStyles.TextIcon} color="black" size={mivnumIconSizeM} />
                    </TouchableHighlight>
                </View>
                <View style={ioStyles.GridRowS}>
                    <Text style={ioStyles.Text}>Nro.Socio: {mioData?.ioSocio?.ioDcModel?.numsocio}</Text>
                </View>
                <View style={ioStyles.GridRowS}>
                    <Text style={ioStyles.Text}>{mioData?.ioSocio?.ioDcModel?.strnombre}</Text>
                </View>
                <View style={ioStyles.GridRowS}>
                    <Text style={ioStyles.Text}>Categoria: {mcoTsocio?.filter(x => x.numid == mioData?.ioSocio?.ioDcModel?.nrotipo)[0]?.strdesc ?? ''}</Text>
                </View>
                <View style={ioStyles.ImgContainer}>
                    <QRCode
                        size={mivnumQRSize}
                        value="Just some string value"
                    />
                </View>
            </View>
        </View >
    );
}

