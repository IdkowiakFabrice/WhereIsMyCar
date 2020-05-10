import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import * as axios from 'axios'
import { render } from 'react-dom'

const{width: WIDTH} = Dimensions.get('window')
class RegisterSuccess extends Component{

    render() {
        return(
            <View style = {styles.container}>
                <Text style = {styles.text}>Inscription réussie!</Text>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.signUpText}>Retour</Text>
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
        fontWeight: 'bold',
        marginBottom:30,
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
    },
    input: {
        width: WIDTH -55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor:'rgba(0,0,0,0.35)',
        color:'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        marginBottom: 20,
    }
})

export default RegisterSuccess