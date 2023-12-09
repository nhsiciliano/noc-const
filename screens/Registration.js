import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Formik, resetForm } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const validationSchema = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    telefono: yup.number().required('El teléfono es requerido'),
    email: yup.string().email('Ingresa un correo válido').required('El correo es requerido'),
    contrasenia: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
});


const Registration = ({ navigation }) => {
    const handleRegist = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/usuarios/signup', values, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            alert("Registro exitoso!");
        } catch (error) {
            console.log("Error de registro");
            alert("Registro fallido, por favor complete los campos correctamente");
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{ nombre: '', apellido: '', telefono: '', email: '', contrasenia: '' }}
                validationSchema={validationSchema}
                onSubmit={handleRegist}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.registerContainer}>
                        <Text style={styles.title}>
                            Completá tus datos
                        </Text>
                        <TextInput
                            onChangeText={handleChange('nombre')}
                            onBlur={handleBlur('nombre')}
                            style={styles.input}
                            value={values.nombre}
                            placeholder="Nombre"
                        />
                        {touched.nombre && errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

                        <TextInput
                            onChangeText={handleChange('apellido')}
                            onBlur={handleBlur('apellido')}
                            style={styles.input}
                            value={values.apellido}
                            placeholder="Apellido"
                        />
                        {touched.apellido && errors.apellido && <Text style={styles.errorText}>{errors.apellido}</Text>}

                        <TextInput
                            onChangeText={handleChange('telefono')}
                            onBlur={handleBlur('telefono')}
                            style={styles.input}
                            value={values.telefono}
                            placeholder="Teléfono"
                        />
                        {touched.telefono && errors.telefono && <Text style={styles.errorText}>{errors.telefono}</Text>}

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
                            <Text>REGISTRARSE</Text>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 16 }}>
                            <Text style={styles.subtitle}>
                                Ya tenés una cuenta? {" "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Login")}
                                style={{ marginVertical: 6 }}
                            >
                                <Text style={styles.login}>
                                    Iniciar sesión
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}

export default Registration

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