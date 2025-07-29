import { View, Text, TextInput, Button, Alert } from 'react-native';
import loginStyle from '../../Styles/loginStyle';
import { useState } from 'react';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const navigation = useNavigation();

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const submitHandler = async () => {
        try {
            const { data } = await axios({
                url: `https://vodafone.myindiabazar.com/api/admin/login`,
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                data: {
                    ...formData
                }
            })
            Alert.alert("login success");
            navigation.navigate('Signup')
        } catch (error) {
            console.log("Error ::>>", error);
        }
    }

    return (
        <View style={loginStyle.container}>
            <Text style={loginStyle.title}>
                Sign In
            </Text>
            <TextInput
                style={loginStyle.input}
                placeholder='Enter email'
                onChangeText={(value) => handleChange('username', value)}
                value={formData?.username}
            />
            <TextInput
                style={loginStyle.input}
                placeholder='Enter password'
                onChangeText={(value) => handleChange('password', value)}
                value={formData?.password}
            />
            <Button style={loginStyle.button} onPress={submitHandler} title='Sign In' />
        </View>
    );
}

export default Login;
