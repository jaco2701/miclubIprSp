import { useNavigation } from 'expo-router';
import { useEffect, useState } from "react"
import {
    Text,
    View,
    ActivityIndicator,
    BackHandler,
    ImageBackground
} from 'react-native';
import { ioStyles } from '@/constants/Styles';
import { DoEvent } from '@/helpers/Event';
import { EEventType } from '@/model/Enums';
import LoginScreen from './login';
import { AntDesign } from '@expo/vector-icons';
import { coAssets, mivnumAdviceSize } from '@/model/Config';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredDepo, selectFilteredTsocio, selectFilteredTpago, selectIoData } from '../components/redux/Selectors';

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
    useEffect(() => {
        mioNavigation.setOptions({ headerShown: true, title: 'Hola!!' });
        setmivblnLoading(true)
        DoEvent(EEventType.Load, [], mioDispatch)
            .then((vioData) => {
                setmivstrLoadResponse(vioData)
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
                        <ImageBackground
                            source={coAssets['imgHomeBackground']}
                            style={ioStyles.HomeBackground}
                        />
                        :
                        <View style={ioStyles.Center}>
                            <AntDesign name="warning" color="black" size={mivnumAdviceSize} />
                            <Text style={ioStyles.Text}>{mivstrLoadResponse}</Text>
                        </View>
            }
        </>
    );
}
