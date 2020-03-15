import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';
import Reinput from 'reinput/src/Input/Input';

import styles from '../styles';

export default class RegisterScreen extends React.Component {
  state = {
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    errorName: false,
    errorEmail: false,
    errorPassword: false,
  };

  handleClose = () => {
    this.props.navigation.navigate('Login');
  };

  handleSignUp = () => {
    const { firstName, secondName, email, password } = this.state;

    if (!firstName) {
      return this.setState({ errorName: true });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: firstName + ' ' + secondName
        });
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
          this.setState({ errorEmail: true })
        }
        if (error.code === 'auth/weak-password') {
          this.setState({ errorPassword: true })
        }
      });
  };

  render() {
    const reinput = {
      underlineColor: '#c1cad4',
      underlineActiveColor: '#0099da',
      underlineActiveHeight: 1,
      labelColor: '#c1cad4',
      labelActiveColor: '#0099da',
      labelActiveScale: 0.7,
      fontSize: 17,
      paddingTop: 0,
      paddingBottom: 10,
      marginBottom: 0,
      marginTop: 0,
      errorColor: '#d9534f',
      errorStyle: styles.error
    };
    const { firstName, secondName, email, password, errorName, errorEmail, errorPassword } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleClose} style={styles.close}>
          <Image source={require('../assets/close.png')} />
        </TouchableOpacity>
        <Text style={Object.assign({}, styles.title, { marginBottom: '7%' })}>{`Регистрация`}</Text>
        <View style={styles.form}>
          <Reinput
            {...reinput}
            label='Имя'
            onChangeText={firstName => this.setState({
              firstName: firstName,
              errorName: false
            })}
            value={firstName}
            error={errorName ? 'Поле не может быть пустым' : ''}
            iconOverlay={firstName || errorName ?
              errorName ? <Image source={require('../assets/error.png')} /> : <Image source={require('../assets/check.png')} />
              : ''}
          />
          <Reinput
            {...reinput}
            label='Фамилия'
            onChangeText={secondName => this.setState({ secondName })}
            value={secondName}
            iconOverlay={secondName ? <Image source={require('../assets/check.png')} /> : ''}
          />
          <Reinput
            {...reinput}
            label='E-mail'
            autoCapitalize={'none'}
            onChangeText={email => this.setState({
              email: email,
              errorEmail: false
            })}
            value={email}
            error={errorEmail ? 'Неверный Email' : ''}
            iconOverlay={email || errorEmail ?
              errorEmail ? <Image source={require('../assets/error.png')} /> : <Image source={require('../assets/check.png')} />
              : ''}
          />
          <Reinput
            {...reinput}
            label='Пароль'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={password => this.setState({
              password: password,
              errorPassword: false
            })}
            value={password}
            error={errorPassword ? 'Слабый пароль' : ''}
            iconOverlay={password || errorPassword ?
              errorPassword ? <Image source={require('../assets/error.png')} /> : <Image source={require('../assets/check.png')} />
              : ''}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Регистрация</Text>
        </TouchableOpacity>
      </View>
    );
  }
}