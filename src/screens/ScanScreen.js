import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    StatusBar,
    TouchableOpacity
} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import Alert from "../components/Alert";

export default class SCanSCreen extends Component {
    state = {};
    // static navigationOptions = ({ navigation }) => {
    //   const { params = {} } = navigation.state;
    //   let tabBarIcon = () => (
    //     <Image
    //       source={require("../images/ic_qrcode.png")}
    //       style={{ width: 20, height: 20 }}
    //     />
    //   );
    //   return { tabBarIcon };
    // };
    _onPressQR = () => {
        // this.props.navigation.navigate("ScanQR1");
        this.alertRef._springShow();
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar/>
                {/* toolbar */}
                <View style={[styles.toolbar, {backgroundColor: "#0368d0"}]}>
                    <Image
                        style={{
                            marginLeft: 10,
                            width: 20,
                            height: 20
                        }}
                        source={require("../images/ic_menu.png")}
                    />
                    <Text style={[styles.titleToolbar]}>Quét QR code</Text>
                </View>
                <View style={{
                    width: "100%",
                    height: 45,
                    flexDirection: 'column',
                    backgroundColor: "#0368d0"
                }}>
                    <View style={[styles.searchView, {backgroundColor: "#0368d0"}]}>
                        <Image
                            style={{
                                marginLeft: 10,
                                width: 20,
                                height: 20
                            }}
                            source={require("../images/ic_search.png")}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                color: "white",
                                paddingHorizontal: 10
                            }}
                            placeholder="Tài khoản"
                            placeholderTextColor="white"
                            autoCorrect={false}
                        />
                    </View>
                    <View
                        style={{
                            height: 0.5,
                            marginLeft: 10,
                            marginRight: 10,
                            backgroundColor: "#FFFFFF",
                            marginBottom: 20
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white"
                    }}
                >
                    <Image
                        style={{
                            flex: 1,
                            height: undefined,
                            width: undefined,
                            marginLeft: 50
                        }}
                        resizeMode="contain"
                        source={require("../images/bg_quet2.png")}
                    />
                    <TouchableOpacity
                        style={{
                            width: 200,
                            marginTop: 20,
                            marginBottom: 20,
                            backgroundColor: "#00a219",
                            paddingVertical: 10,
                            alignSelf: "center",
                            justifyContent: "center"
                        }}
                        onPress={this._onPressQR}
                    >
                        <Text style={styles.buttonText}>Quét QR</Text>
                    </TouchableOpacity>
                </View>
                <Alert type={'vote'} title={"nhap comment"}
                       onSendVote={(numberStart)=>{
                           console.log('xxx'+ numberStart)
                       }}
                       closeOnTouchOutside={true}
                       ref={(ref) => {
                           this.alertRef = ref;
                       }}/>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column"
    },
    buttonContainer: {
        width: 300,
        marginTop: 30,
        backgroundColor: "#00a219",
        paddingVertical: 15,
        alignSelf: "center",
        justifyContent: "center"
    },
    buttonText: {
        textAlign: "center",
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
    searchView: {
        width: "100%",
        height: 35,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0368d0"

    },
    titleToolbar: {
        marginLeft: 16,
        color: "white",
        fontWeight: "normal",
        fontSize: 18
    },
    viewLine: {
        height: 0.5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#FFFFFF"
    }
});
