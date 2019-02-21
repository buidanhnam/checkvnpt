import React, {Component} from 'react';
import {
    Animated,
    BackAndroid,
    BackHandler,
    Dimensions, Keyboard,
    StyleSheet,
    Text,
    Button,
    TouchableWithoutFeedback,
    View,
    Modal, TouchableOpacityComponent, TouchableOpacity, Image, TextInput
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';

const config = {
    text_button: {
        ok: 'OK',
        send: 'Gửi',
        confirm: 'Xác nhận',
        cancel: 'Hủy'
    },
    colors: {
        "title": "#FFF",
        "msg": "#333333",
    },
    size: {
        "title": 16,
        "msg": 14,
    },
    spacing: {
        "alertContainerPadding": 10,
        "alertContentPadding": 20,
    },
    types: {
        "notice": "notice",
        "warning": "warning",
        "error": "error",
        "success": "success",
    }
};
export type TypeAlert = "normal" | "confirm" | "vote" | "inputComment" ;
const {height, width} = Dimensions.get('window');

const HwBackHandler = BackHandler || BackAndroid;
const HW_BACK_EVENT = 'hardwareBackPress';

interface Props {
    type: TypeAlert
    show?: boolean,
    title: string,
    icon?: any,
    message?: string,
    closeOnTouchOutside?: boolean,
    closeOnHardwareBackPress?: boolean,
    cancelButtonStyle?: any,
    confirmButtonStyle?: any,
    alertContainerStyle?: any,
    overlayStyle?: any,
    contentContainerStyle?: any,
    titleStyle?: any,
    messageStyle?: any,

    handleHide?(): void

    onCancelPressed?(): void,

    onConfirmPressed?(): void,

    onDismiss?(): void,

    onSendComment?(email: string, comment: string): void

    onSendVote?(numberStart: number): void

    onSendCodeVerify?(codeVerify: string): void
}

interface State {
    showSelf: boolean
    numberStart?: number,
    email?: string,
    comment?: string,
    codeVerify?: string
}

export default class Alert extends Component<Props, State> {
    static defaultProps = {
        show: false,
        showProgress: false,
        closeOnTouchOutside: true,
        closeOnHardwareBackPress: true,
        showCancelButton: false,
        showConfirmButton: false,
        customView: null
    };

    state: State = {
        showSelf: false,
    };

    springValue: any;

    constructor(props: Props) {
        super(props);
        const {show} = this.props;
        this.springValue = new Animated.Value(0.3);
        this.state = {
            showSelf: false
        };
        if (show) this._springShow(true);
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<any>, nextContext: any): boolean {
        if (nextProps.show !== this.props.show) return true;
        if (nextState.showSelf !== this.state.showSelf) return true;
        return false;
    }

    toogleShowHide = () => {
        if (this.state.showSelf) {
            this._springHide()
        } else {
            this._springShow(false)
        }
    }

    _springShow = (fromConstructor: boolean) => {
        this._toggleAlert(fromConstructor);
        Animated.spring(this.springValue, {
            toValue: 1,
            bounciness: 10
        }).start();
        Keyboard.dismiss;
    };

    _springHide = () => {
        if (this.state.showSelf) {
            Animated.spring(this.springValue, {
                toValue: 0,
                tension: 10
            }).start();

            setTimeout(() => {
                this._toggleAlert(false);
                this._onDismiss();
            }, 0);
        }
    };

    _toggleAlert = (fromConstructor: boolean) => {
        if (fromConstructor) this.state = {showSelf: true};
        else this.setState({showSelf: !this.state.showSelf});
    };

    _handleHwBackEvent = () => {
        const {closeOnHardwareBackPress} = this.props;
        if (this.state.showSelf && closeOnHardwareBackPress) {
            this._springHide();
        }
    };

    _onTapOutside = () => {
        const {closeOnTouchOutside} = this.props;
        if (closeOnTouchOutside) {
            this._springHide()
        }
    };

    _onDismiss = () => {
        const {onDismiss} = this.props;
        onDismiss && onDismiss();
    };

    _renderTwoButton = (data: any) => {
        const {
            cancelText, confirmText, buttonStyle, onConfirmPressed, onCancelPressed
        } = data;
        return (
            <View
                style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        this.props.handleHide && this.props.handleHide();
                        if (onConfirmPressed) onConfirmPressed(this.state.codeVerify)
                    }}>
                    <View style={[styles.action_verify, {marginRight: 4, width: 100}]}>
                        <Text style={{color: '#FFF'}}>{confirmText}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.handleHide && this.props.handleHide();
                        if (onCancelPressed) data.onCancelPressed();
                    }}>
                    <View style={[styles.action_verify, {marginLeft: 4, width: 100}]}>
                        <Text style={{color: '#FFF'}}>{cancelText}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    };
    _renderOneButton = (data: any) => {
        const {type, text, onPress, buttonStyle} = data;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.handleHide && this.props.handleHide();
                    if (onPress) {
                        switch (type) {
                            case 'normal':
                                onPress()
                                break
                            case 'inputComment':
                                onPress(this.state.email, this.state.comment)
                                break
                            case 'vote':
                                onPress(this.state.numberStart)
                                break
                        }
                    }
                }}>
                <View style={styles.action}>
                    <Text style={{color: '#FFF'}}>{text}</Text>
                </View>
            </TouchableOpacity>

        );
    };
    renderButton = () => {
        const {
            type,
            onCancelPressed,
            confirmButtonStyle,
            onConfirmPressed,
            onSendComment,
            onSendVote,
            onSendCodeVerify
        } = this.props;
        switch (type) {
            case 'normal': {
                const confirmButtonData = {
                    text: config.text_button.ok,
                    buttonStyle: confirmButtonStyle,
                    onPress: onConfirmPressed,
                };
                return (this._renderOneButton(confirmButtonData));
            }
            case 'vote':
                const confirmButtonData = {
                    text: config.text_button.ok,
                    buttonStyle: confirmButtonStyle,
                    onPress: onSendVote,
                    type
                };
                return (this._renderOneButton(confirmButtonData));
            case 'confirm':
                const buttonData = {
                    confirmText: config.text_button.confirm,
                    cancelText: config.text_button.cancel,
                    buttonStyle: confirmButtonStyle,
                    onConfirmPressed: onSendCodeVerify,
                    onCancelPressed: onCancelPressed
                };
                return (this._renderTwoButton(buttonData));
            case 'inputComment': {
                const confirmButtonData = {
                    type,
                    text: config.text_button.send,
                    buttonStyle: confirmButtonStyle,
                    onPress: onSendComment,
                };
                return (this._renderOneButton(confirmButtonData));
            }
            default:
                return
        }
    }

    _renderAlert = () => {
        const animation = {transform: [{scale: this.springValue}]};
        const {title, message} = this.props;

        const {
            alertContainerStyle,
            overlayStyle,
            contentContainerStyle,
            titleStyle,
        } = this.props;
        return (
            <Modal
                transparent={true}
                onRequestClose={this._handleHwBackEvent}
                visible>
                <View style={[styles.container, alertContainerStyle]}>
                    <TouchableWithoutFeedback onPress={() => {
                        this._onTapOutside()
                    }}>
                        <View style={[styles.overlay, overlayStyle]}/>
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={[styles.contentContainer, animation, contentContainerStyle]}
                    >
                        <View style={[styles.titleContainer]}>
                            {title ? (
                                <Text style={[styles.title, titleStyle]}>{title}</Text>
                            ) : null}
                        </View>
                        {this.renderContent()}
                        {this.renderButton()}
                    </Animated.View>
                </View>
            </Modal>
        );
    };

    render() {
        const {showSelf} = this.state;
        if (showSelf) return this._renderAlert();
        return null;
    }

    componentWillReceiveProps(nextProps: any) {
        const {show} = nextProps;
        const {showSelf} = this.state;
        if (show && !showSelf) this._springShow(false);
        else if (show === false && showSelf) this._springHide();
    }

    renderContent = () => {
        const {message, type, messageStyle} = this.props
        switch (type) {
            case 'normal':
                return (
                    <View style={styles.content}>
                        {message ? (
                            <Text style={[styles.message, messageStyle]}>{message}</Text>
                        ) : null}
                    </View>
                )
            case 'vote':
                return this.renderContentVote()
            case 'confirm':
                return this.renderContentConfirm()
            case 'inputComment':
                return this.renderContentComment()
            default:
                return
        }
    }
    renderContentVote = () => {
        return (
            <View
                style={{
                    marginTop: -25,
                    marginBottom: 5,
                    // justifyContent: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                    // flexDirection: "row"
                }}>
                <AirbnbRating
                    count={5}
                    reviews={[]}
                    onFinishRating={(value: any) => {
                        this.setState({numberStart: value})
                    }}
                    defaultRating={0}
                />
            </View>
        )
    }
    renderContentConfirm = () => {
        return (
            <View style={styles.content_comment}>
                <View
                    style={{
                        borderColor: '#848484',
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderRightWidth: 1,
                        height: 34,
                        marginLeft: 10,
                        marginRight: 10,
                        flexDirection: "row"
                    }}
                >
                    <TextInput
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            alignContent: 'center',
                            alignSelf: 'center',
                            height: 40,
                        }}
                        onChangeText={(text) => {
                            this.setState({
                                codeVerify: text
                            })
                        }}
                        value={this.state.codeVerify}
                        placeholder="Email"
                        placeholderTextColor="#848484"
                    />
                </View>
            </View>
        )
    }
    renderContentComment = () => {
        return (
            <View style={styles.content_comment}>
                <View
                    style={{
                        height: 30,
                        marginLeft: 10,
                        marginRight: 10,
                        flexDirection: "row"
                    }}
                >
                    <TextInput
                        style={{
                            width: '100%',
                            height: 40,
                        }}
                        onChangeText={(text) => {
                            this.setState({
                                email: text
                            })
                        }}
                        value={this.state.email}
                        placeholder="Email"
                        placeholderTextColor="#848484"
                        keyboardType="email-address"
                        returnKeyType="next"
                        autoCorrect={false}
                        onSubmitEditing={() => this.refs.txtComment.focus()}
                    />
                </View>
                <View style={styles.line}/>
                <View
                    style={{
                        height: 30,
                        marginTop: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        flexDirection: "row"
                    }}>
                    <TextInput
                        style={{
                            width: '100%',
                            height: 40,
                        }}
                        onChangeText={(text) => {
                            this.setState({
                                comment: text
                            })
                        }}
                        value={this.state.comment}
                        placeholder="Nhập bình luận ... "
                        placeholderTextColor="#848484"
                        returnKeyType="go"
                        autoCorrect={false}
                        ref={"txtComment"}
                    />
                </View>
                <View style={styles.line}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: 999
    },
    overlay: {
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: 'rgba(52,52,52,0.5)',
    },
    contentContainer: {
        width: "80%",
        backgroundColor: 'white',
    },
    titleContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#0368d0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        marginBottom: 8,
        marginTop: 8,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    content_comment: {
        marginBottom: 8,
        marginTop: 8,
        flexDirection: 'column',
    },
    action: {
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 30,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 30,
        alignSelf: 'center',
        backgroundColor: "#00a219",
        flexDirection: 'row',
        alignItems: 'center',
    },
    action_verify: {
        paddingTop: 4,
        paddingBottom: 4,
        marginBottom: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: "#00a219",
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        paddingStart: 10,
        color: config.colors.title,
        fontSize: config.size.title
    },
    icon: {
        marginRight: 10
    },
    message: {
        marginRight: 10,
        color: config.colors.msg,
        fontSize: config.size.msg
    },
    leftButton: {
        height: 36,
        marginRight: 7,
    },
    rightButton: {
        height: 36,
        marginLeft: 7,
    },
    button: {
        height: 36,
        width: '100%',
    },
    line: {
        height: 0.5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#848484"
    }
});