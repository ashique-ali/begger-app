import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import loginStyle from "../Styles/loginStyle";
import axios from "axios";
import { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';

const SignUp = () => {
    const [products, setProducts] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const getAllUsers = async () => {
        try {
            const { data } = await axios({
                url: `https://dummyjson.com/products`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setProducts(data?.products || []);
        } catch (error) {
            console.log("Error ::>>", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const filteredProducts = products.filter((item) => {
        const matchesTitle = selectedTitle ? item.title === selectedTitle : products;
        const matchesSearch = item.title.toLowerCase().includes(searchValue.toLowerCase());
        return matchesTitle && matchesSearch;
    });

    return (
        <ScrollView style={{ padding: 16 }}>
            <Text style={loginStyle.title}>Product List</Text>

            <View style={{ marginVertical: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
                <Picker
                    selectedValue={selectedTitle}
                    onValueChange={(value) => setSelectedTitle(value)}
                >
                    <Picker.Item label="-- Select Product --" value="" />
                    {products.map((item) => (
                        <Picker.Item key={item.id} label={item.title} value={item.title} />
                    ))}
                </Picker>
            </View>

            <View>
                <TextInput style={loginStyle.input} placeholder="Search here..." value={searchValue} onChangeText={(value) => setSearchValue(value)} />
            </View>

           <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={() => (
                    <View style={[styles.row, styles.header]}>
                        <Text style={[styles.cell, styles.headerText]}>#</Text>
                        <Text style={[styles.cell, styles.headerText]}>Title</Text>
                        <Text style={[styles.cell, styles.headerText]}>Price</Text>
                    </View>
                )}
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{index + 1}</Text>
                        <Text style={styles.cell}>{item.title}</Text>
                        <Text style={styles.cell}>${item.price}</Text>
                    </View>
                )}
            />
        </ScrollView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
        fontSize: 14,
    },
    header: {
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontWeight: 'bold',
    },
});
