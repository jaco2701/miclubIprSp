import { useFocusEffect, useNavigation } from 'expo-router';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, StatusBar, FlatList, TouchableHighlight, Text, ActivityIndicator, BackHandler } from 'react-native';
import { TabView, SceneMap, Route, TabBar } from 'react-native-tab-view';
import { McState } from '../model/State';
import { useSelector } from 'react-redux';
import { ioStyles } from '@/constants/Styles';
import { Log, formatDateToYYYYMMDD } from '../helpers/Misc';
import { ioSetting } from '../model/Config';
import { selectFilteredFmedic, selectFilteredMediciones, selectIoData } from '../components/redux/Selectors';
export default function medicioneScreen() {
    const mioNavigation = useNavigation();
    const mioData = useSelector(selectIoData);
    const [mivblnLoad, setmivblnLoad] = useState(false);
    const [index, setIndex] = useState(0);
    const mcoMediciones = useSelector(selectFilteredMediciones);
    const mcoFliaMediciones = useSelector(selectFilteredFmedic);
    const [mivnumSelectedMedicion, setmivnumSelectedMedicion] = useState(-1);
    useEffect(() => {
        mioNavigation.setOptions({ headerShown: true, title: 'Mis Mediciones' });
        setmivblnLoad(true);
    }, [mioNavigation]);
    useFocusEffect(
        useCallback(() => {
            // Reset selected item when the screen is focused
            return () => setmivnumSelectedMedicion(-1);
        }, [])
    )
    const handleBack = () => {
        if (mivnumSelectedMedicion > 0) {
            setmivnumSelectedMedicion(-1);
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
    const routes = [
        { key: 'r1', title: `${mcoFliaMediciones?.filter(x => x.numid == 1)[0]?.strdesc || ''}` },
        { key: 'r2', title: `${mcoFliaMediciones?.filter(x => x.numid == 2)[0]?.strdesc || ''}` },
        { key: 'r3', title: `${mcoFliaMediciones?.filter(x => x.numid == 3)[0]?.strdesc || ''}` },
    ];
    const Route1 = () => { return fillTab; }
    const Route2 = () => { return fillTab; }
    const Route3 = () => { return fillTab; }
    const fillTab = () => {

        const lcvnumTipomedicion = mcoFliaMediciones?.find(x => x.numid == index + 1)?.strdesc1?.split(',');
        return (
            <View style={ioStyles.PageContainer} >
                <FlatList
                    numColumns={1}
                    data={mioData?.coMediciones?.filter(x => lcvnumTipomedicion?.includes(x.ioDcModel?.numtipomedicion?.toString() || ''))}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => setmivnumSelectedMedicion(item.ioDcModel?.nummedicion || 0)}>
                            <View style={ioStyles.GridRowS}>
                                <Text style={ioStyles.TextInput}> {formatDateToYYYYMMDD(item.ioDcModel?.dtmfecha)}: {mcoMediciones?.filter(x => x.numid == item.ioDcModel?.numtipomedicion)[0]?.strdesc || ''}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </View>
        );
    }
    const renderScene = SceneMap({
        r1: fillTab,
        r2: fillTab,
        r3: fillTab,
    });
    const renderTabBar = props => (
        <TabBar
            {...props}
            style={ioStyles.TabBar}
        />
    );
    if (!mivblnLoad) {
        return (
            <View style={ioStyles.PageContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>={ioSetting.coResources['lioL_loading']}</Text>
            </View>
        );
    }
    if (mivnumSelectedMedicion > 0) {
        const lioMedicion = mioData?.coMediciones?.filter(x => x.ioDcModel?.nummedicion == mivnumSelectedMedicion)[0];
        return (
            <View style={ioStyles.PageContainer} >
                <View style={ioStyles.TextContainerGrisCenter}>
                    <Text style={ioStyles.Text1}>
                        {formatDateToYYYYMMDD(lioMedicion?.ioDcModel?.dtmfecha)}: {mcoMediciones?.filter(x => x.numid == lioMedicion?.ioDcModel?.numtipomedicion)[0]?.strdesc || ''}
                    </Text>
                </View>
                <FlatList
                    numColumns={1}
                    data={mioData?.coMediciones?.filter(x => x.ioDcModel?.nummedicion == mivnumSelectedMedicion)[0].coTomas}
                    renderItem={({ item }) => (
                        <View style={ioStyles.GridRowM}>
                            <Text style={ioStyles.TextInput}>Toma {item.nromediciontoma}: {item.strvalormedicion} {mcoMediciones?.filter(x => x.numid == lioMedicion?.ioDcModel?.numtipomedicion)[0]?.strdesc1 || ''}</Text>
                        </View>)} />
            </View >
        );
    }
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            commonOptions={{
                labelStyle: ioStyles.TabBarItem
            }}
        />
    );
}