import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import * as axios from 'axios'

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname:'',
            lastname:'',
            passwordConfirmation:''
        };
      }
    
    _signin = () => {
        const link = 'https://whereismycar.herokuapp.com/api/authenticate/signin';
        const newUser = {
            "username": this.state.username,
            "password": this.state.password,
            "passwordConfirmation": this.state.passwordConfirmation,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname
          };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post(link, newUser, axiosConfig)
        .then((response) => {
            this.props.navigation.navigate('Map')
            console.log(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register</Text>
            <TextInput
                placeholder="Nom"
                style={{ borderBottomColor: 'grey', borderBottomWidth: 1, paddingHorizontal: 60 }}
                onChangeText={(lastname) => {this.setState({lastname})}}
                value={this.state.lastname}>
            </TextInput>
            <TextInput
                placeholder="Prenom"
                style={{ borderBottomColor: 'grey', borderBottomWidth: 1, paddingHorizontal: 40 }}
                onChangeText={(firstname) => {this.setState({firstname})}}
                value={this.state.firstname}>
            </TextInput>
            <TextInput
                placeholder="Nom d'utilisateur"
                style={{ borderBottomColor: 'grey', borderBottomWidth: 1, paddingHorizontal: 40 }}
                onChangeText={(username) => {this.setState({username})}}
                value={this.state.username}>
            </TextInput>
            <TextInput
                placeholder="Mot de passe"
                style={{ borderBottomColor: 'grey', borderBottomWidth: 1, paddingHorizontal: 40 }}
                onChangeText={(password) => {this.setState({password})}}
                value={this.state.password}>
            </TextInput>
            <TextInput
                placeholder="Confirmation du mot de passe"
                style={{ borderBottomColor: 'grey', borderBottomWidth: 1, paddingHorizontal: 40 }}
                onChangeText={(passwordConfirmation) => {this.setState({passwordConfirmation})}}
                value={this.state.passwordConfirmation}>
            </TextInput>
            
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._signin}
                >
                <Text style={styles.buttonTextLogin}>Register</Text>
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