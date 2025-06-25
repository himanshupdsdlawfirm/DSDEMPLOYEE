import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/app/context';
import MainNavigator from './src/app/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Provider } from 'mobx-react';
import rootStore from './src/app/stores/rootStore';


const App = () => {
  return (
    <Provider rootStore={rootStore}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <AuthProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
