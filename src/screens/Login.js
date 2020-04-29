import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


function Login(props) {
    const { navigation } = props
    state = {
        username: '',
        password: ''
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <TextInput
                placeholder="Username"
                style= {styles.TextInputUsername}
                onChangeText={username => this.setState({username})}
                value={this.state.username}>
            </TextInput>
            <TextInput
                placeholder="Enter password"
                style = {styles.TextInputPassword}
                style={{ borderBottomColor: 'Grey', borderBottomWidth: 1, paddingHorizontal: 40 }}
                onChangeText={password => this.setState({password})}
                value={this.state.password}>
            </TextInput>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Map')}>
                <Text style={styles.buttonTextLogin}>Login</Text>
            </TouchableOpacity>
            <Text>Dont have an account ? Click here: </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}>
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
        backgroundColor: '#ebebeb',
    },
    TextInputUsername: {
        borderBottomColor: 'grey', 
        borderBottomWidth: 1, 
        paddingHorizontal: 60

    },
    TextInputPassword: {
        borderBottomColor: 'grey', 
        borderBottomWidth: 1, 
        paddingHorizontal: 60
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

export default Login