import { CameraView, CameraType, useCameraPermissions, } from 'expo-camera';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ioStyles } from '../constants/Styles';
import { ioSetting, mivnumIconSize,mivnumFotoCarnetHeight, mivnumFotoCarnetWidth } from '../model/Config';
import { AntDesign } from '@expo/vector-icons';
import { Log } from '../helpers/Misc';
import RNFS from 'react-native-fs';
import { useNavigation } from 'expo-router';
import * as ImageManipulator from 'expo-image-manipulator';
interface CameraComponentProps {
    onPictureTaken: (vivstrB64: string) => void;
}
export default function CameraComponent({ onPictureTaken }: CameraComponentProps) {
    const [mivstrSize, setmivstrSize] = useState('');
    const [mioPermission, requestMioPermission] = useCameraPermissions();
    const mioCamera = useRef(null);
    const mioNavigation = useNavigation();
    useEffect(() => {
        mioNavigation.setOptions({ headerShown: false });
    }, [mioNavigation]);

    if (!mioPermission) {
        <View style={ioStyles.PageContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>={ioSetting.coResources['lioL_loading']}</Text>
        </View>
    }
    if (!mioPermission?.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={ioStyles.CameraContainer}>
                <Text style={ioStyles.CameraMessage}>We need your permission to show the camera</Text>
                <Button onPress={requestMioPermission} title="grant permission" />
            </View>
        );
    }
    function take() {
        if (!mioCamera) {
            return;
        }
        mioCamera.current?.takePictureAsync({
            onPictureSaved: (vioPic: any) => {
                ImageManipulator.manipulateAsync(
                    vioPic.uri,
                    [
                        {
                            resize:
                            {
                                width: mivnumFotoCarnetWidth,
                                height: mivnumFotoCarnetHeight
                            }
                        }
                    ],
                    {
                        compress: 1,
                        format: ImageManipulator.SaveFormat.JPEG,
                        base64:true
                    }
                ).then((vioCropPic: any) =>  onPictureTaken(vioCropPic.base64));
            }
        });
    }
    return (
        <View style={ioStyles.Center}>
        <View style={ioStyles.Circle}>
            <CameraView style={ioStyles.FocusContainer} facing={'front'} ref={mioCamera}>
            </CameraView>
            </View>
            <View style={ioStyles.CameraButtonsContainer}>
                <TouchableOpacity style={ioStyles.RedButton} onPress={take}>
                        <Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


