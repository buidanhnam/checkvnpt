import React, {Component} from "react";

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    StatusBar,
    TextInput,
    SafeAreaView,
    Keyboard,
    TouchableOpacity,
    CheckBox,
    KeyboardAvoidingView
} from "react-native";
import CheckboxFormX from "react-native-checkbox-form";
import Loading from "../components/Loading";

const mockData = [
    {
        label: "Ghi nhớ tài khoản",
        RNchecked: true
    }
];

interface Props {
    navigation: any
    loading: boolean,
    message: any,
    error: boolean

    requestLogin(userName: string, pass: string, rememberMe: boolean): void
}

interface State {
    userName: string,
    pass: string,
    rememberMe: boolean
}

export default class LoginScreen2 extends Component<Props, State> {
    _onGoBack = () => {
        this.props.navigation.goBack();
    };
    _onSelect = (item: any) => {
        console.log(item + '--------');
        this.setState({
            rememberMe: !this.state.rememberMe
        })
    };

    _pressLogin = () => {
        console.log("---------- login" + JSON.stringify(this.state));
        this.props.requestLogin(this.state.userName, this.state.pass, this.state.rememberMe,)
    };

    constructor(props: any) {
        super(props);
        this.state = {
            rememberMe: false,
            pass: '',
            userName: ''
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
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
                    <Text style={[styles.titleToolbar]}>Đăng nhập</Text>
                </View>
                <View
                    style={{
                        height: 50,
                        backgroundColor: "#0368d0"
                    }}
                />
                <View style={styles.view1}/>
                <Image
                    style={{
                        width: 200,
                        height: 60,
                        marginTop: 10,
                        marginBottom: 10,
                        alignSelf: "center"
                    }}
                    resizeMode="center"
                    source={require("../images/logo_check.png")}
                />
                <View style={styles.view1}/>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#0368d0"
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            marginTop: 30,
                            marginLeft: 50,
                            marginRight: 50,
                            flexDirection: "row"
                        }}
                    >
                        <Image
                            style={{
                                width: 15,
                                height: 15,
                                position: "absolute",
                                bottom: 5
                            }}
                            source={require("../images/ic_user.png")}
                        />
                        <TextInput
                            style={{
                                marginStart: 10,
                                height: 40,
                                color: "white",
                                paddingHorizontal: 10
                            }}
                            onChangeText={(text) => {
                                this.setState({
                                    userName: text
                                })
                            }}
                            value={this.state.userName}
                            placeholder="Tài khoản"
                            placeholderTextColor="white"
                            keyboardType="email-address"
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => this.refs.txtPassword.focus()}
                        />
                    </View>
                    <View style={styles.view2}/>
                    <View
                        style={{
                            height: 30,
                            marginTop: 10,
                            marginLeft: 50,
                            marginRight: 50,
                            flexDirection: "row"
                        }}
                    >
                        <Image
                            style={{
                                width: 15,
                                height: 20,
                                position: "absolute",
                                bottom: 5
                            }}
                            source={require("../images/ic_locked.png")}
                        />
                        <TextInput
                            style={{
                                marginStart: 10,
                                height: 40,
                                color: "#FFF",
                                paddingHorizontal: 10
                            }}
                            onChangeText={(text) => {
                                this.setState({
                                    pass: text
                                })
                            }}
                            value={this.state.pass}
                            placeholder="Mật khẩu"
                            placeholderTextColor="white"
                            returnKeyType="go"
                            secureTextEntry
                            autoCorrect={false}
                            ref={"txtPassword"}
                        />
                    </View>
                    <View style={styles.view2}/>
                    <View
                        style={{
                            width: 150,
                            height: 30,
                            alignSelf: "center",
                            // justifyContent: "center",
                            marginVertical: 10
                        }}
                    >
                        <CheckboxFormX
                            style={{width: 350 - 30}}
                            textStyle={styles.checkboxText}
                            dataSource={[{
                                label: 'Ghi nhớ tài khoản',
                                RNchecked: this.state.rememberMe
                            }]}
                            itemShowKey="label"
                            itemCheckedKey="RNchecked"
                            iconSize={16}
                            iconColor="#FFF"
                            formHorizontal={true}
                            labelHorizontal={true}
                            onChecked={(item: any) => this._onSelect(item)}
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this._pressLogin}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <Image
                        style={{
                            width: "100%",
                            height: 140,
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}
                        resizeMethod='auto'
                        resizeMode="cover"
                        source={require("../images/bg_bottom_quet.png")}
                    />
                </View>
                <Loading loading={this.props.loading} indicatorColor={'blue'}/>
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
        color: "#777"
    },
    textBold: {
        fontWeight: "500",
        color: "#000"
    },
    buttonText: {
        fontSize: 21,
        color: "rgb(0,122,255)"
    },
    buttonTouchable: {
        padding: 16
    },
    logo: {
        width: 200,
        height: 56,
        marginTop: 10,
        marginBottom: 10
    },
    view1: {
        width: "100%",
        height: 7,
        backgroundColor: "#4379d2"
    },
    view2: {
        height: 0.5,
        marginLeft: 50,
        marginRight: 50,
        backgroundColor: "#FFFFFF"
    },
    buttonContainer: {
        width: 300,
        marginTop: 30,
        backgroundColor: "#FFF",
        paddingVertical: 15,
        alignSelf: "center",
        justifyContent: "center"
    },
    buttonText: {
        textAlign: "center",
        color: "#0f365f",
        fontWeight: "normal",
        fontSize: 18
    },
    checkboxText: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "normal",
        fontSize: 14
    }
});
