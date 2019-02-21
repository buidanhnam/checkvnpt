import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    Linking,
    TouchableWithoutFeedback,
    StatusBar, TouchableOpacity, ScrollView
} from "react-native";

interface Props {
    navigation: any,
    isLogin: boolean,
    user: any
}

interface State {

}

export default class MEnuSCreen extends Component<Props, State> {
    state = {};
    // static navigationOptions = ({ navigation }) => {
    //   const { params = {} } = navigation.state;
    //   let tabBarIcon = () => (
    // <Image
    //   source={require("../images/ic_menu.png")}
    //   style={{ width: 26, height: 22 }}
    // />
    //   );
    //   return { tabBarIcon };
    // };
    _onPressHome = () => {
        Linking.openURL("http://vnptcheck.vn");
    };
    _onPressRule = () => {
        this.props.navigation.navigate("Rule");
    };
    _onPressTutorial = () => {
        this.props.navigation.navigate("Tutorial");
    };
    _onPressLogOut = () => {
        this.props.navigation.navigate("LogOut");
    };
    _onPressLogIn = () => {
        this.props.navigation.navigate("Login");
    };
    _onPressSell = () => {
        // todo
    };
    _onPressInfoApp = () => {
        // todo
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
                    <Text style={[styles.titleToolbar]}>Thông tin chung</Text>
                </View>
                {/*<ScrollView>*/}
                    {this.renderInfoUser(this.props.isLogin)}
                    {this.renderLine(this.props.isLogin)}
                    {this.renderItemSell(this.props.isLogin)}
                    {this.renderLine(this.props.isLogin)}
                    <View style={[styles.viewLine]}/>
                    <TouchableWithoutFeedback onPress={this._onPressHome}>
                        <View style={[styles.itemView]}>
                            <View style={[styles.leftContainer]}>
                                <Image
                                    style={{
                                        marginLeft: 10,
                                        width: 25,
                                        height: 25
                                    }}
                                    source={require("../images/ic_home.png")}
                                />
                                <Text style={styles.itemText}>Trang chủ</Text>
                            </View>
                            <Image
                                style={styles.rightContainer}
                                source={require("../images/ic_three_dot.png")}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.viewLine]}/>
                    <TouchableWithoutFeedback onPress={this._onPressInfoApp}>
                        <View style={[styles.itemView]}>
                            <View style={[styles.leftContainer]}>
                                <Image
                                    style={{
                                        marginLeft: 10,
                                        width: 25,
                                        height: 25
                                    }}
                                    source={require("../images/ic_setting.png")}
                                />
                                <Text style={styles.itemText}>Thông tin ứng dụng</Text>
                            </View>
                            <Image
                                style={styles.rightContainer}
                                source={require("../images/ic_three_dot.png")}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.viewLine]}/>
                    <TouchableWithoutFeedback onPress={this._onPressRule}>
                        <View style={[styles.itemView]}>
                            <View style={[styles.leftContainer]}>
                                <Image
                                    style={{
                                        marginLeft: 10,
                                        width: 25,
                                        height: 25
                                    }}
                                    source={require("../images/ic_info.png")}
                                />
                                <Text style={styles.itemText}>Điều khoản sử dụng</Text>
                            </View>
                            <Image
                                style={styles.rightContainer}
                                source={require("../images/ic_three_dot.png")}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.viewLine]}/>
                    <TouchableWithoutFeedback onPress={this._onPressTutorial}>
                        <View style={[styles.itemView]}>
                            <View style={[styles.leftContainer]}>
                                <Image
                                    style={{
                                        marginLeft: 10,
                                        width: 30,
                                        height: 20
                                    }}
                                    source={require("../images/ic_book_3.png")}
                                />
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: 16,
                                        alignSelf: "center",
                                        marginLeft: 17
                                    }}
                                >
                                    Hướng dẫn sử dụng
                                </Text>
                            </View>
                            <Image
                                style={styles.rightContainer}
                                source={require("../images/ic_three_dot.png")}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.viewLine]}/>
                    {this.renderItemLoginLogOut(this.props.isLogin)}
                    <View style={[styles.viewLine]}/>
                       {this.props.isLogin ? null :
                           <Image
                               style={{
                                   width: "100%",
                                   height: 140,
                                   position: "absolute",
                                   bottom: 0,
                                   left: 0,
                                   right: 0,
                               }}
                               resizeMethod='auto'
                               resizeMode="cover"
                               source={require("../images/bg_menu.png")}
                           />
                }
                {/*</ScrollView>*/}

            </SafeAreaView>
        );
    }

    renderLine = (isShow: boolean) => {
        return (isShow ? <View style={[styles.viewLine]}/> : null)
    }
    renderItemSell = (isLogin: boolean) => {
        return (isLogin ? <TouchableWithoutFeedback onPress={this._onPressSell}>
            <View style={[styles.itemView]}>
                <View style={[styles.leftContainer]}>
                    <Image
                        style={{
                            marginLeft: 10,
                            width: 25,
                            height: 25
                        }}
                        source={require("../images/icon_cart.png")}
                    />
                    <Text style={{
                        color: "blue",
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignSelf: "center",
                        marginLeft: 20
                    }}>Bán Hàng </Text>
                </View>
                <Image
                    style={styles.rightContainer}
                    source={require("../images/ic_three_dot.png")}
                />
            </View>
        </TouchableWithoutFeedback> : null)
    }

    renderItemLoginLogOut = (isLogin: boolean) => {
        let data: any
        if (isLogin) {
            data = {
                image: require("../images/ic_signin.png"),
                title: "Đăng Xuất",
            }
        } else {
            data = {
                image: require("../images/ic_logout.png"),
                title: "Đăng nhập",
            }
        }
        return (<TouchableWithoutFeedback onPress={() => isLogin ? this._onPressLogOut() : this._onPressLogIn()}>
            <View style={[styles.itemView]}>
                <View style={[styles.leftContainer]}>
                    <Image
                        style={{
                            marginLeft: 10,
                            width: 25,
                            height: 25
                        }}
                        source={data.image}
                    />
                    <Text style={styles.itemText}>{data.title}</Text>
                </View>
                <Image
                    style={styles.rightContainer}
                    source={require("../images/ic_three_dot.png")}
                />
            </View>
        </TouchableWithoutFeedback>)
    }

    renderInfoUser = (isLogin: boolean) => {
        let user = this.props.user
        return (isLogin && user ?
            <View style={{
                marginTop: 15,
                marginBottom: 15,
                height: 100,
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    height: '100%',
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginStart: 10,
                        marginEnd: 10,
                    }}>
                        <Image
                            style={{
                                padding: 10,
                                marginStart: 10,
                                borderRadius: 50,
                                alignSelf: 'center',
                                height: 100,
                                width: 100
                            }}
                            source={{uri: user.use_thumbnail}}
                        />
                    </View>
                    <View style={{flexDirection: 'column', flex: 1, marginStart: 10, marginEnd: 15, marginTop: 35}}>
                        <Text numberOfLines={1} ellipsizeMode='tail'
                              style={{
                                  flex: 1,
                                  fontSize: 23,
                                  color: 'blue',
                              }}>{user.use_fullname}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail'
                              style={{
                                  marginTop: 5,
                                  flex: 1,
                                  fontSize: 16,
                                  color: '#000000',
                              }}>{user.use_fullname}</Text>
                    </View>
                </View>
            </View>
            : null)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column"
    },
    itemView: {
        height: 60,
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    leftContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    rightContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 10,
        width: 7,
        height: 30
    },
    toolbar: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        alignItems: "center"
    },
    itemText: {
        color: "black",
        fontSize: 16,
        alignSelf: "center",
        marginLeft: 20
    },
    titleToolbar: {
        marginLeft: 16,
        color: "white",
        fontWeight: "normal",
        fontSize: 18
    },
    viewLine: {
        height: 0.4,
        backgroundColor: "black"
    }
});
