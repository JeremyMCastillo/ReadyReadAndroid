import React from 'react';
import { View, WebView } from 'react-native';

const AuthWebConfirm = ({ uri }) => {
    return (
        <View style={{ height: 350 }}>
            <WebView source={{ uri }} style={{ flex: 1, width: 320, height: 350 }} />
        </View>
    );
};

export default AuthWebConfirm;
