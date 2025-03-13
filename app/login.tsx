import { useNavigation } from 'expo-router';
import { useEffect, useReducer, useState } from "react"
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ioStyles } from '@/constants/Styles';
import { ioSetting, coAssets, mivnumIconSize } from '@/model/Config';
import { DoEvent } from '@/helpers/Event';
import { EEventType } from '@/model/Enums';
import { Log } from '../helpers/Misc';
import { useDispatch } from 'react-redux';
import React from 'react';

export default function LoginScreen() {
    const mioNavigation = useNavigation();
    const mioDispatch = useDispatch();
    const [mivblnLoading, setmivblnLoading] = useState(true);
    const [mivstrEmail, setmivstrEmail] = useState(String);
    const [mivstrPass, setmivstrPass] = useState(String);
    const [mivstrException, setmivstrException] = useState(String);
    useEffect(() => {
        mioNavigation.setOptions({ headerShown: false });
        DoEvent(EEventType.Logout, [], mioDispatch)
            .then(() => {
                setmivblnLoading(false)
            })
            .catch((vioMsg) => setmivblnLoading(false));
    }, [mioNavigation]);
    if (mivblnLoading) {
        return (
            <View style={ioStyles.CameraContainer}>
                <ActivityIndicator color="black" size="large" />
            </View>
        );
    }
   return (<>
        <View style={ioStyles.PageContainer} >
            <View style={ioStyles.HeaderLogin}>
                <Image source={coAssets['imgLogo']} style={ioStyles.Logo} />
            </View>
            <KeyboardAvoidingView>
                <View style={ioStyles.BodyLogin}>
                    <View style={ioStyles.InputContainer}>
                        <AntDesign name="user" color="black" size={mivnumIconSize} />
                        <TextInput style={ioStyles.Text}
                            value={mivstrEmail}
                            placeholder={ioSetting.coResources['lioL_user']}
                            placeholderTextColor='#B3B2B2'
                            underlineColorAndroid='transparent'
                            onChangeText={(livstrEmail) => setmivstrEmail(livstrEmail)} />
                    </View>
                    <View style={ioStyles.InputContainer}>
                        <AntDesign name="lock" color="black" size={mivnumIconSize} />
                        <TextInput style={ioStyles.Text}
                            value={mivstrPass}
                            placeholder={ioSetting.coResources['lioL_pass']}
                            placeholderTextColor='#B3B2B2'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(livstrPass) => setmivstrPass(livstrPass)} />
                    </View>
                    <View style={ioStyles.ButtonContainer}>
                        <TouchableHighlight onPress={
                            () => DoEvent(EEventType.Login, [mivstrEmail, mivstrPass], mioDispatch)
                                .then((vioData) => {
                                    mioNavigation.goBack();
                                })
                                .catch((lioE) => {
                                    setmivstrException(lioE.toString());
                                })
                        }>
                            <View style={ioStyles.Center}>
                                <Text style={ioStyles.WhiteText}>{ioSetting.coResources['lioL_login']}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={ioStyles.ErrorLoginContainer}>
                        <Text style={ioStyles.Errmsg}>{mivstrException}</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    </>);
}

