import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import loginStyle from '../../Styles/loginStyle';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const handleLogin = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={loginStyle.container}>
            <Text style={loginStyle.title}>Login</Text>

            <TextInput
                style={loginStyle.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={loginStyle.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={loginStyle.button} onPress={handleLogin}>
                <Text style={loginStyle.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;
