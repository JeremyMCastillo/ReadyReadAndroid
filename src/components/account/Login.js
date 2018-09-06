import React, { Component } from 'react';
import { View, Text, Linking, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');

import { Card, CardSection, Button, Input, Spinner } from '../common';
import { 
    loginFieldChanged,
    loginGoodreads, 
    signupGoodreads,
    loginGoodreadsSuccess,
    loginOrSignup,
    checkLoggedInUser
} from '../../actions';

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.props.checkLoggedInUser();

        this.onOpenURL = this.onOpenURL.bind(this);
    }

    state = { loading: false };

    componentDidMount() {
        Linking.addEventListener('url', this.onOpenURL);
    }

    componentWillReceiveProps(nextprops) {
        console.log(nextprops);
        if (nextprops.goodreadsUserId) {
            this.setState({ loading: false });
            Actions.booksList();
        }
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.onOpenURL);
    }

    onGoodreadsLogin() {
        this.setState({ loading: true });
        Keyboard.dismiss();

        if (this.props.signup) {
            this.props.signupGoodreads();
        } else {
            this.props.loginGoodreads({ email: this.props.email, password: this.props.password });
        }
    }

    onOpenURL(event) {
        console.log(event);
        Linking.removeEventListener('url', this.onOpenURL);

        this.props.loginGoodreadsSuccess({ 
            receivedCallbackUrl: event.url, 
            username: this.props.email, 
            password: this.props.password 
        });

        this.setState({ loading: false });
    }

    onLoginOrSignup() {
        if (this.props.signup) {
            // Sign up

        } else {
            // Log in
        }
    }

    onSignupPress() {
        Actions.login({ signup: true, title: 'Sign Up' });
    }

    onGoogleSignin() {
        GoogleSignin.configure({});
        GoogleSignin.signIn().then((user) => {
            console.log(user);
            this.props.loginGoodreads({ email: user.email, password: user.id });
        });
    }

    renderOauthError() {
        if (this.props.oauthError) {
            return <CardSection><Text>{this.props.oauthError}</Text></CardSection>;
        }
    }

    renderLoginButton() {
        if (this.state.loading || this.props.oauthUri) {
            return <Spinner size="large" />;
        }

        const goodreadsMessage = "Log in with Email";

        return (
        <Button
            onPress={this.onGoodreadsLogin.bind(this)}
        >
            {goodreadsMessage}
        </Button>
        );
    }

    renderSignupButton() {
        if (!this.props.signup) {
            return (
                <CardSection>
                    <TouchableWithoutFeedback
                        onPress={this.onSignupPress.bind(this)}
                    >
                        <View>
                            <Text>Sign Up</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </CardSection>
            );
        }
    }

    render() {
        return (
            <View>
                <Card>
                    {/* Google and facebook log in buttons */}
                    <CardSection>
                        <GoogleSigninButton
                            style={{ height: 60, width: 300 }}
                            onPress={this.onGoogleSignin}
                        />
                    </CardSection>
                    <CardSection>
                        <FBLogin style={{ height: 60, width: 200 }} />
                    </CardSection>
                </Card>
                <Card>
                    {/* Goodreads Log In */}
                    <CardSection>
                        <Button>Log in with Goodreads</Button>
                    </CardSection>
                </Card>
                <Card>
                    {/* Email Password Log In */}
                    <CardSection>
                        <Input 
                            label="Email"
                            placeholder="example@gmail.com"
                            value={this.props.email}
                            onChangeText={
                                (value) => this.props.loginFieldChanged({ prop: 'email', value })
                            }
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                            secureTextEntry
                            label="Password"
                            placeholder="password"
                            value={this.props.password}
                            onChangeText={
                                (value => this.props.loginFieldChanged({ prop: 'password', value }))
                            }
                        />
                    </CardSection>
                    <CardSection>
                        {this.renderLoginButton()}
                    </CardSection>
                    {this.renderSignupButton()}
                    {this.renderOauthError()}
                </Card>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { email, password, oauthUri, oauthError, oauthToken, goodreadsUserId } = state.auth;

    return { email, password, oauthUri, oauthError, oauthToken, goodreadsUserId };
};

export default connect(mapStateToProps, { 
    loginFieldChanged,
    loginGoodreads, 
    signupGoodreads,
    loginGoodreadsSuccess,
    loginOrSignup,
    checkLoggedInUser
})(Login);
