import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
interface ModalRatingProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (e: string) => void;
}
export default function ModalRating({
  isVisible,
  onClose,
  onConfirm,
}: ModalRatingProps) {
  const [rateNumber, setRateNumber] = useState('');
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.avaliationText}>Faça sua avaliação!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => {
              const regex = /^(10|[0-9]([,.][0-9]{0,2})?)$/;
              if (text === '' || regex.test(text)) {
                setRateNumber(text);
              }
            }}
            value={rateNumber.toString()}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.maxRatingText}>/10</Text>
        </View>
        <View style={styles.actionButtonsContainer}>
          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>CANCELAR</Text>
          </Pressable>
          <Pressable
            disabled={rateNumber === ''}
            onPress={() => {
              onConfirm(rateNumber);
              onClose();
            }}
            style={[
              styles.confirmButton,
              // eslint-disable-next-line react-native/no-inline-styles
              { backgroundColor: rateNumber !== '' ? 'black' : '#C4C4C4' },
            ]}
          >
            <Text
              style={[
                styles.confirmButtonText,
                // eslint-disable-next-line react-native/no-inline-styles
                { color: rateNumber !== '' ? 'white' : '#8E8E8E' },
              ]}
            >
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
