import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Login from './components/account/Login';

const RouterComponent = () => {
    return (
        <Router>
            <Scene
                key="root"
                hideNavBar
            >
                <Scene key="auth">
                    <Scene 
                        key="login"
                        component={Login}
                        title="Please Login"
                        showNavBar
                        initial
                    />
                </Scene>
            </Scene>
        </Router>
    );  
};

export default RouterComponent;
