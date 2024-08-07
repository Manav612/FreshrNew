import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const StripePaymentComponent = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        // In a real app, you would fetch this data from your backend
        const paydata = {
            ephemeralKey: "ek_test_YWNjdF8xTTUxSzFDblpoU3ZhTDh1LE9wQjM2ZkRGd2NiQUdIOFROaURSaXdRMjFJaVlLT04_00bWS9oPFI",
            paymentIntent: "pi_3OQO41CnZhSvaL8u0vNjYMgi_secret_EgD3Uk28NejC2LNSlxuljuYQf",
        };

        return {
            customerId: null, // In a real app, you'd have a customer ID
            customerEphemeralKeySecret: paydata.ephemeralKey,
            paymentIntentClientSecret: paydata.paymentIntent,
            // Optionally pass amount, currency, and other details here
        };
    };

    const initializePaymentSheet = async () => {
        const {
            customerEphemeralKeySecret,
            paymentIntentClientSecret,
            customerId,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            customerId,
            customerEphemeralKeySecret,
            paymentIntentClientSecret,
            merchantDisplayName: "Freshr",
            style: "alwaysLight",
            allowsDelayedPaymentMethods: true,
        });

        if (error) {
            console.error('Error initializing payment sheet:', error);
            Alert.alert('Error', 'Unable to initialize payment. Please try again.');
        } else {
            console.log('Payment sheet initialized successfully');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    const handlePayPress = async () => {
        setLoading(true);
        const { error } = await presentPaymentSheet();

        if (error) {
            console.error('Error presenting payment sheet:', error);
            Alert.alert(`Error: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your payment was successful!');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Stripe Payment</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePayPress}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StripePaymentComponent;