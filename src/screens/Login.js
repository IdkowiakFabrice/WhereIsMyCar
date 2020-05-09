import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'


class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
      }
    render(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <TextInput
                placeholder="Username"
                style= {styles.textInputUsername}
                onChangeText={username => this.setState({username})}
                value={this.state.username}>
            </TextInput>
            <TextInput
                placeholder="Enter password"
                style = {styles.textInputPassword}
                onChangeText={password => this.setState({password})}
                value={this.state.password}>
            </TextInput>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('Map')}>
                <Text style={styles.buttonTextLogin}>Login</Text>
            </TouchableOpacity>
            <Text>Dont have an account ? Click here: </Text>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb',
    },
    textInputUsername: {
        borderBottomColor: 'grey', 
        borderBottomWidth: 1, 
        paddingHorizontal: 60,
        marginBottom: 40,
    },
    textInputPassword: {
        borderBottomColor: 'grey', 
        borderBottomWidth: 1, 
        paddingHorizontal: 40
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: -200,
        marginBottom: 100,
    },
    buttonContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonTextLogin: {
        fontSize: 20,
        color: 'orange',
        paddingHorizontal: 20,
    },
    signUpText: {
        color: 'orange',
    }
})

export default Login