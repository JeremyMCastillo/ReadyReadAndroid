import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Login from './components/account/Login';
import BooksList from './components/books/BooksList';

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
                <Scene key="main">
                    <Scene
                        key="booksList"
                        component={BooksList}
                        title="Reading List"
                        showNavBar
                    />
                </Scene>
            </Scene>
        </Router>
    );  
};

export default RouterComponent;
