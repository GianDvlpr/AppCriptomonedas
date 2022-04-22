import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

const Formulario = ({moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultarAPI}) => {

    
    const [criptomonedas, setCriptomonedas] = useState([])

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            setCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    }, [])

    // Almacena las selecciones del usuario
    const obtenerMoneda = moneda => {
        setMoneda(moneda)
    }

    const obtenerCriptomoneda = cripto => {
        setCriptomoneda(cripto)
    }

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta();
            return;
        }
        // Pasa la validación
        //Cambia el state de consultarAPI
        setConsultarAPI(true)

    }

    const mostrarAlerta = () => {
        Alert.alert('Error...',
            'Ambos campos son obligatorios',
            [
                { text: 'Ok' }

            ])
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" />
                <Picker.Item label="Dolar de Estados Unidos" value="USD" />
                <Picker.Item label="Peso MexiChango" value="MXN" />
                <Picker.Item label="Sol Peruano" value="SOL" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>

            <Picker
                selectedValue={criptomoneda}
                onValueChange={cripto => obtenerCriptomoneda(cripto)}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" />
                {criptomonedas.map(cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={() => cotizarPrecio()}
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>

        </View>
    )
}

export default Formulario

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20
    },
    textoCotizar: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})
