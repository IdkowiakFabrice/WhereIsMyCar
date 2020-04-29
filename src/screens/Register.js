import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


function Register(props) {
    const { navigation } = props
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register</Text>
            <TextInput
                placeholder="Username"
                style={{ borderBottomColor: 'Grey', borderBottomWidth: 1, paddingHorizontal: 60 }}>
            </TextInput>
            <TextInput
                placeholder="Enter password"
                style={{ borderBottomColor: 'Grey', borderBottomWidth: 1, paddingHorizontal: 40 }}>
            </TextInput>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Map')}>
                <Text style={styles.buttonTextLogin}>Login</Text>
            </TouchableOpacity>
            <Text>Dont have an account ? Click here: </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Map')}>
                <Text style={styles.SignUpText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    },
    buttonContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonTextLogin: {
        fontSize: 20,
        color: 'orange'
    },
    SignUpText: {
        color: 'orange',
    }
})

export default Register