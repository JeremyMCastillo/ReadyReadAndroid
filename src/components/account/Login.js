import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from '../common';
import AuthWebConfirm from './AuthWebConfirm';
import { loginGoodreads } from '../../actions';

class Login extends Component {
    state = { loading: false };

    onGoodreadsLogin() {
        this.setState({ loading: true });

        this.props.loginGoodreads();
    }

    renderOauthError() {
        if (this.props.oauthError) {
            return <Text>{this.props.oauthError}</Text>;
        }
    }

    renderOauthWindow() {
        if (this.props.oauthUri) {
            return <AuthWebConfirm uri={this.props.oauthUri} />;
        }
    }

    renderLoginButton() {
        if (this.state.loading || this.props.oauthUri) {
            return <Spinner size="large" />;
        }

        return (
        <Button
            onPress={this.onGoodreadsLogin.bind(this)}
        >
            Log In With Goodreads
        </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    {this.renderLoginButton()}
                </CardSection>
                <CardSection>
                    {this.renderOauthError()}
                </CardSection>
                <CardSection>
                    {this.renderOauthWindow()}
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { oauthUri, oauthError } = state.auth;

    return { oauthUri, oauthError };
};

export default connect(mapStateToProps, { loginGoodreads })(Login);
