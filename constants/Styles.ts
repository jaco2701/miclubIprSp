import { DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'antd';
import {
    StyleSheet, Dimensions
} from 'react-native';
const livnunTotalHeight = Dimensions.get('window').height;
const livnunTotalWidth = Dimensions.get('window').width;
export const ioStyles = StyleSheet.create({
    PageContainer: {
        width: livnunTotalWidth,
        height: livnunTotalHeight * 0.95,
    },
    DataContainer: {
        height: '87%',
    },

    HeaderBackLeft: {
        width: '80%',
    },
    HeaderBackRight: {
        width: '20%',
    },
    HeaderLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        backgroundColor: '#B3B2B2'
    },
    BodyLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%'
    },
    Header: {
        backgroundColor: '#B3B2B2',
    },
    HeaderTitle: {
        fontFamily: 'gotham_black',
        fontSize: 20,
    },
    HeaderIconContainer: {
        margin: 'auto'
    },
    HeaderIcon: {
        height: livnunTotalHeight * 0.1,
        width: livnunTotalWidth * 0.1,
    },
    Logo: {
        height: '50%',
        width: '80%',
        resizeMode: 'contain',
        flex: 1
    },
    Avatar: {
        height: '30%',
        width: '30%',
        resizeMode: 'contain',
        flex: 1
    },
    Center: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
    },
    CheckBox: {
        height: livnunTotalHeight * 0.7,
        width: livnunTotalHeight * 0.7,
    },

    BodyContent: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: '3%',
    },
    BodyContentRight: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: '3%',
    },

    /*TEXT*/
    InputContainer: {
        borderBottomColor: '#F5FCFF',
        borderBottomWidth: 1,
        width: livnunTotalWidth * 0.75,
        height: livnunTotalHeight * 0.05,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: livnunTotalHeight * 0.02,
    },

    TextIcon: {
        marginLeft: livnunTotalWidth * 0.02,
    },
    Text: {
        marginLeft: livnunTotalWidth * 0.02,
        color: '#212529',
        fontFamily: 'gotham_black',
        fontSize: 20,
        overflow: 'visible',
    },
    TextInput: {
        color: '#212529',
        fontFamily: 'gotham_black',
        fontSize: 20,
        overflow: 'visible',
        borderBottomColor: '#212529',
        borderBottomWidth: 1,
        marginLeft: livnunTotalWidth * 0.02,
     },
    TextSinTitulo: {
        color: '#212529',
        fontFamily: 'gotham_black',
        fontSize: 20,
    },
    Placeholder: {
        color: '#212529',
        marginLeft: 10,
        fontFamily: 'gotham_black',
        fontSize: 20,
    },
    Errmsg: {
        justifyContent: "center",
        alignItems: 'center',
        color: '#FF0000',
        fontFamily: 'gotham_bold',
        fontSize: 20,
    },
    /*GRILLA*/
    GridRowS: {
        height: livnunTotalHeight * 0.07,
        flexDirection: 'row',
        borderBottomColor: '#d6d5d5',
        alignItems: "center",
        borderBottomWidth: 1,
        
    },
    GridRowM: {
        height: livnunTotalHeight * 0.1,
        flexDirection: 'row',
        borderBottomColor: '#d6d5d5',
        alignItems: "center",
        borderBottomWidth: 1,
    },
    GridColL: {
        width: '70%',
    },
    GridColS: {
        width: '15%',
    },
    GridColM: {
        width: '50%',
    },
    GridRowEdtTitle: {
        flexDirection: 'row',
        alignItems: "center",
    },
    GridRowEdtField: {
        flexDirection: 'row',
        borderBottomColor: '#d6d5d5',
        borderBottomWidth: 1,
    },
    /*Combo*/
    ComboS: {
        width: '70%',
        height: '10%',
    },
    ComboM: {
        width: '70%',
        height: '30%',
    },
    ComboL: {
        width: '70%',
        height: '50%',
    },

    Gris: {
        backgroundColor: '#B3B2B2'
    },
    ButtonContainer: {
        backgroundColor: '#B3B2B2',
        flexDirection: 'row',
        justifyContent: 'center',
        width: livnunTotalWidth * 0.75,
        height: livnunTotalHeight * 0.05,
        marginTop: livnunTotalHeight * 0.02,
    },
    WhiteText: {
        fontSize: 15,
        fontFamily: 'gotham_black',
    },

    /*DRAWER*/
    Drawer: {
        flex: 1,
    },
    MenuHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%',
    },
    DrawerItem: {
        fontFamily: 'gotham_black',
        fontSize: 20,
    },
    DrawerIcon: {
        marginRight: livnunTotalHeight * 0.02,
    },
    /*Command*/
   CmdContainer: {
        alignItems: 'flex-end',
      // height: livnunTotalHeight * 0.001,
       position: 'absolute',
       right: livnunTotalWidth * 0.08,
       bottom: livnunTotalWidth * 0.2,
       zIndex: 1,
    },
    Cmd: {
        borderColor: '#212529',
        backgroundColor: '#B3B2B2',
        width: livnunTotalWidth * 0.15,   
        overflow: 'visible',
        height: livnunTotalWidth * 0.15,
        borderWidth:  livnunTotalWidth * 0.005,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    MenuLogo: {
        height: '100%',
        resizeMode: 'contain',
    },
    TextContainerGrisCenter: {
        backgroundColor: '#d6d5d5',
        justifyContent: 'center',
        alignItems: "center",
        height: livnunTotalHeight * 0.05,
        marginTop: livnunTotalHeight * 0.02,
    },
    TextContainer: {
        borderBottomColor: '#F5FCFF',
        height: livnunTotalHeight * 0.05,
        marginTop: livnunTotalHeight * 0.02,
    },
    ErrorLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: livnunTotalWidth * 0.75,
        marginTop: livnunTotalHeight * 0.02,
    },
    ImgContainer: {
        marginTop: livnunTotalHeight * 0.02,
        flexDirection: 'row',
        alignItems: "center",
    },
    Circle: {
        borderRadius: 100,
        overflow: 'hidden',
    },
    RedButton: {
        backgroundColor: '#FF0000',
        borderColor: '#d6d5d5',
        flexDirection: 'row',
        width: livnunTotalWidth * 0.15,
        height: livnunTotalWidth * 0.15,
        borderRadius: 100,
        borderWidth: 10,
    },
    /*CAMARA */
    CameraContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    FocusContainer: {
        width: livnunTotalWidth * 0.5,
        height: livnunTotalWidth * 0.5,
        borderRadius: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    CameraButtonsContainer: {
        width: livnunTotalWidth * 0.25,
        height: livnunTotalWidth * 0.25,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    CameraButton: {
        width: livnunTotalWidth * 0.75,
        height: livnunTotalWidth * 0.75,
        borderRadius: 150,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    CameraMessage: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    /*TAB*/
    TabBar: {
        backgroundColor: '#B3B2B2',
        
    },
    TabBarItem: {
        fontFamily: 'gotham_black',
        color: '#212529',
        fontSize: 20,
    },
});