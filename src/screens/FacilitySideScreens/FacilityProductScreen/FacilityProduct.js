import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {COLOR_DARK, COLOR_LIGHT} from '../../../constants/Colors';

const FacilityProduct = () => {
  const [rating, setRating] = useState(0);
  const [question, setQuestion] = useState(
    'How important is selling products to you?',
  );
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;

  const handleSubmit = async () => {
    if (rating > 0) {
      try {
        await AsyncStorage.setItem('@survey_submitted', 'true');
        console.log('Submitted rating:', rating);
        Alert.alert('Thank you for your feedback!');
        // Reset the form after submission
        setRating(0);
        setQuestion('How important is selling products to you?');
      } catch (error) {
        console.error('Error saving submission:', error);
        Alert.alert(
          'Error',
          'Failed to submit your feedback. Please try again.',
        );
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: COLOR.WHITE,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: COLOR.GRAY,
    },
    questionInput: {
      width: '100%',
      borderWidth: 1,
      borderColor: COLOR.GRAY,
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      backgroundColor: COLOR.WHITE,
      textAlignVertical: 'top',
      minHeight: 100,
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
    },
    star: {
      padding: 5,
    },
    starText: {
      fontSize: 50,
      color: '#ddd',
    },
    selectedStar: {
      color: COLOR.ORANGECOLOR,
    },
    submitButton: {
      backgroundColor: COLOR.ORANGECOLOR,
      padding: 10,
      borderRadius: 25,
      width: '100%',
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: '#a0a0a0',
    },
    submitButtonText: {
      color: COLOR.WHITE,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.star}>
          <Text
            style={[styles.starText, i <= rating ? styles.selectedStar : null]}>
            ★
          </Text>
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Survey</Text>
      <TextInput
        style={styles.questionInput}
        value={question}
        onChangeText={setQuestion}
        multiline
        placeholder="Enter your question here"
      />
      <View style={styles.ratingContainer}>{renderStars()}</View>
      <TouchableOpacity
        style={[styles.submitButton, rating === 0 && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={rating === 0}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FacilityProduct;
