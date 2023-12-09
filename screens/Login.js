import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';

const validationSchema = yup.object().shape({
    email: yup.string().email('Ingresa un correo válido').required('El correo es requerido'),
    contrasenia: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
});

const Login = ({ navigation }) => {
    const handleLogin = async (values) => {
        const { ...usuario} = values;
        try {
            const response = await axios.post('http://localhost:8080/usuarios/signin', usuario, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            alert("Usuario autenticado!");
        } catch (error) {
            console.log("Error de autenticacion");
            alert("Usuario incorrecto");
        }
    }
    return (
        <SafeAreaView style={styles.container}>
        <Formik
            initialValues={{ email: '', contrasenia: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.registerContainer}>
                    <Text style={styles.title}>
                        Iniciar sesión
                    </Text>

                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        style={styles.input}
                        value={values.email}
                        placeholder="Correo Electrónico"
                    />
                    {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    <TextInput
                        onChangeText={handleChange('contrasenia')}
                        onBlur={handleBlur('contrasenia')}
                        style={styles.input}
                        value={values.contrasenia}
                        placeholder="Contraseña"
                        secureTextEntry
                    />
                    {touched.contrasenia && errors.contrasenia && <Text style={styles.errorText}>{errors.contrasenia}</Text>}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.button}
                    >
                        <Text>Log In</Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 16 }}>
                        <Text style={styles.subtitle}>
                            No tenés una cuenta? {" "}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Registrarse")}
                            style={{ marginVertical: 6 }}
                            >
                            <Text style={styles.login}>
                                Registrate
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    registerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 8,
        marginHorizontal: 48,
        marginVertical: 58,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: 'grey',
        marginHorizontal: 8,
        marginVertical: 18,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'grey',
    },  
    login: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#BD0032',
    },  
    input: {
        backgroundColor: "#E7E4EB",
        width: '80%',
        borderRadius: 8,
        padding: 10,
        borderColor: "black",
        marginVertical: 14,
    },
    button: {
        borderWidth: 1,
        borderColor: '#E7E4EB',
        borderRadius: 18,
        padding: 14,
        marginTop: 14,
    },
    errorText: {
        color: 'red',
    },
})