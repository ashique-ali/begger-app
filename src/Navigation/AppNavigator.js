import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home/home';
import Login from '../Pages/Login/Login';
import SignUp from '../Signup/Signup';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}

export default AppNavigator;