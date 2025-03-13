import { Store } from '@/components/redux/Reducer';
import React from 'react';
import { Provider } from 'react-redux';
import HomeScreen from './home';

export default function App() {
    return (
        <Provider store={Store}>
            <HomeScreen />
        </Provider>
    );
}

