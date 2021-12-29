import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { Store } from './redux/store';

import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import PecicaPage from './screens/PecicaPage';
import KuhalnaPloscaPage from './screens/KuhalnaPloscaPage';
import HladilnikPage from './screens/HladilnikPage';
import PomivalniStrojPage from './screens/PomivalniStrojPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginPage} />
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomePage} />
          <Stack.Screen name="Pecica" component={PecicaPage} />
          <Stack.Screen name="KuhalnaPlosca" component={KuhalnaPloscaPage} />
          <Stack.Screen name="Hladilnik" component={HladilnikPage} />
          <Stack.Screen name="PomivalniStroj" component={PomivalniStrojPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
