import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';

const FacilityProduct = () => {
  const [rating, setRating] = useState(0);
  const [question, setQuestion] = useState('')
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
        setQuestion('');
      } catch (error) {
        console.error('Error saving submission:', error);
        Alert.alert(
          'Error',
          'Failed to submit your feedback. Please try again.',
        );
      }
    }
  };

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     padding: 20,
  //     backgroundColor: COLOR.WHITE,
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: 'bold',
  //     marginBottom: 20,
  //     color: COLOR.GRAY,
  //   },
  //   questionInput: {
  //     width: '100%',
  //     borderWidth: 1,
  //     borderColor: COLOR.GRAY,
  //     borderRadius: 5,
  //     padding: 10,
  //     fontSize: 16,
  //     backgroundColor: COLOR.WHITE,
  //     textAlignVertical: 'top',
  //     minHeight: 100,
  //   },
  //   ratingContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'center',
  //     marginVertical: 20,
  //   },
  //   star: {
  //     padding: 5,
  //   },
  //   starText: {
  //     fontSize: 50,
  //     color: '#ddd',
  //   },
  //   selectedStar: {
  //     color: COLOR.ORANGECOLOR,
  //   },
  //   submitButton: {
  //     backgroundColor: COLOR.ORANGECOLOR,
  //     padding: 10,
  //     borderRadius: 25,
  //     width: '100%',
  //     alignItems: 'center',
  //   },
  //   disabledButton: {
  //     backgroundColor: '#a0a0a0',
  //   },
  //   submitButtonText: {
  //     color: COLOR.WHITE,
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //   },
  // });


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
      color: COLOR.BLACK,
    },
    title2: {
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'bold',
      marginVertical: 10,
      color: COLOR.BLACK,
    },
    questionInput: {
      width: '100%',
      borderWidth: 1,
      borderColor: COLOR.BLACK,
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
      marginVertical: 10,
    },
    ratingButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginHorizontal: 5,
      // borderWidth: 1,
      borderColor: COLOR.GRAY,
    },
    ratingText: {
      fontSize: 20,
      color: COLOR.GRAY,
    },
    selectedRating: {
      backgroundColor: COLOR.ORANGECOLOR,
    },
    selectedRatingText: {
      color: COLOR.WHITE,
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

  const renderRatingButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 5; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={[styles.ratingButton, i === rating && styles.selectedRating]}
        >
          <Text
            style={[styles.ratingText, i === rating && styles.selectedRatingText]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Survey</Text>
      <Text style={styles.title2}>How important is selling products to you?</Text>
      <TextInput
        style={styles.questionInput}
        value={question}
        onChangeText={setQuestion}
        multiline
        placeholder="Leave us your thoughts (not mandatory) "
      />
      <Text style={styles.title2}>(1 being the least important & 5 most important)</Text>
      <View style={styles.ratingContainer}>{renderRatingButtons()}</View>
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
