import React, {Component} from "react";

import {Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import {ScanRoute} from "../route";
import NavigationService from "../service/NavigationService";
import Alert from "../components/Alert";
import {NavigationEvents} from "react-navigation";

interface State {
    showAlert?: boolean
}

interface Props {
    navigation: any,

    getInfoItem(code: string): void
}

export default class ScanQRScreen extends Component<Props, State> {
    state = {
        showAlert: false
    }
    _onGoBack = () => {
        this.props.navigation.goBack();
    };
    private scanner: any;
    private refAlert: any;
    private refScanner: any;

    onSuccess(e: any) {
        if (e && e.data) {
            let url = e.data as string;
            if (!url.includes("vnptcheck.vn")) {
                // todo need design
                this.setState({showAlert: true})
            } else {
                //ex : https://vnptcheck.vn/check/23174021902424
                let splitter;
                splitter = url.split("/");
                let code = splitter[splitter.length - 1]
                this.props.getInfoItem(code)
                NavigationService.navigate(ScanRoute.WEB_VIEW, {
                    WEB_VIEW_PARAMS: {
                        title: 'Thông tin sản phẩm',
                        url: e.data
                    }
                })
            }

        }
    }

    render() {
        let checkAndroidPermission = true
        if (Platform.OS === 'android' && Platform.Version < 23) {
            checkAndroidPermission = false
        }
        return (
            <SafeAreaView style={styles.container}>
                <NavigationEvents onDidFocus={() => {
                    this.refScanner.reactivate()
                }
                }/>
                <StatusBar/>
                <View style={[styles.toolbar, {backgroundColor: "#0368d0"}]}>
                    <TouchableWithoutFeedback onPress={this._onGoBack}>
                        <Image
                            style={{
                                marginLeft: 10,
                                width: 20,
                                height: 20
                            }}
                            source={require("../images/ic_left_back.png")}
                        />
                    </TouchableWithoutFeedback>
                    <Text style={[styles.titleToolbar]}>Scan QR code</Text>
                </View>
                <QRCodeScanner
                    ref={(ref: any) => {
                        this.refScanner = ref
                    }}
                    showMarker={true}
                    cameraProps={{captureAudio: false}}
                    checkAndroid6Permissions={checkAndroidPermission}
                    onRead={this.onSuccess.bind(this)}
                />
                <Alert ref={(ref: any) => this.refAlert = ref} show={this.state.showAlert} type={"normal"}
                       title={'Thông báo'}
                       onConfirmPressed={() => {
                           this.refAlert._springHide()
                           this.refScanner.reactivate()
                       }}
                       onClose={() => this.refScanner.reactivate()}
                       message={'Sản phẩm không tồn tại'}/>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    // zeroContainer: {
    //   height: 0,
    //   flex: 0,
    // },

    // cameraContainer: {
    //   height: Dimensions.get('window').height,
    // },
    titleToolbar: {
        marginLeft: 16,
        color: "white",
        fontWeight: "normal",
        fontSize: 18
    },
    toolbar: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column"
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});