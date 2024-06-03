import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FacilityPrivacyAndPolicy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Personal Data We Collect</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Cookie Policy</Text>
        <Text style={styles.text}>What are cookies?</Text>
        <Text style={styles.text}>
          A cookie is a small file with information that your browser stores on your device. Information in this file is typically shared with the owner of the site in addition to potential partners and third parties to that business.The collection of this information may be used in the function of the site and/or to improve your experience.
        </Text>
        <Text style={styles.text}>How we use cookies?</Text>
        <Text style={styles.text}>
          A cookie is a small file with information that your browser stores on your device. Information in this file is typically shared with the owner of the site in addition to potential partners and third parties to that business.The collection of this information may be used in the function of the site and/or to improve your experience.
        </Text>
        <Text style={styles.text}>We do not use cookies?</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Accept All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FacilityPrivacyAndPolicy;