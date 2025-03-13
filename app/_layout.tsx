import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { ioStyles } from '@/constants/Styles';
import { AntDesign } from '@expo/vector-icons';
import { Store } from '@/components/redux/Reducer';
import { Provider } from 'react-redux';
import { coAssets,mivnumIconSize } from '../model/Config';
import { Image, TouchableOpacity, View } from 'react-native'
export default function Layout() {
    return (
        <Provider store={Store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer screenOptions=
                    {{
                        headerStyle: ioStyles.Header,
                        headerTitleStyle: ioStyles.HeaderTitle,
                        drawerStyle: ioStyles.Drawer,
                        drawerLabelStyle: ioStyles.DrawerItem,
                        drawerActiveTintColor: '#000',
                        headerRight: () => (
                                <Image source={coAssets['imgLogo2']} style={ioStyles.DrawerIcon} />
                        ),
                        drawerLabel: () => null,
                    }}
                >
                    <Drawer.Screen
                        name="home"
                        options={{
                            drawerLabel: 'Mis Datos',
                            title: 'Mis Datos',
                            drawerIcon: () => <AntDesign name="user" size={24} color='#000' />,
                        }}
                    />
                    <Drawer.Screen
                        name="cuotas"
                        options={{
                            drawerLabel: 'Mis Cuotas',
                            title: 'Mis Cuotas',
                            drawerIcon: () => <AntDesign name="calendar" size={24} color='#000' />,
                        }}
                    />
                    <Drawer.Screen
                        name="carnet"
                        options={{
                            drawerLabel: 'Mi Carnet',
                            title: 'Mi Carnet',
                            drawerIcon: () => <AntDesign name="idcard" size={24} color='#000' />,
                        }}
                    />
                    <Drawer.Screen
                        name="mediciones"
                        options={{
                            drawerLabel: 'Mis Mediciones',
                            title: 'Mis Mediciones',
                            drawerIcon: () => <AntDesign name="dashboard" size={24} color='#000' />,
                        }}
                    />
                    <Drawer.Screen
                        name="login"
                        options={{
                            drawerLabel: 'Cerrar Sesion',
                            title: 'Cerrar Sesion',
                            drawerIcon: () => <AntDesign name="poweroff" size={24} color='#000' />,
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </Provider>
    );
}