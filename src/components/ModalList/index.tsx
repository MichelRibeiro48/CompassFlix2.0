import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { RadioButton } from 'react-native-paper';
import Icon from '@react-native-vector-icons/fontawesome6';
import { MediaListResult } from '../../types/userDTO';
interface ModalRatingProps {
  listOptions?: MediaListResult[];
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (e: string) => void;
}
export default function ModalList({
  listOptions,
  isVisible,
  onClose,
  onConfirm,
}: ModalRatingProps) {
  const [checked, setChecked] = useState('');
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitleText}>Salvar filme em...</Text>
          <Pressable onPress={onClose}>
            <Icon name="x" size={12} color={'#000'} iconStyle="solid" />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          {listOptions && listOptions.length > 0 && (
            <FlatList
              data={listOptions}
              renderItem={({ item }) => (
                <View style={styles.listRadio}>
                  <RadioButton
                    value={item.id.toString()}
                    status={
                      checked === item.id.toString() ? 'checked' : 'unchecked'
                    }
                    color="#000"
                    onPress={() => setChecked(item.id.toString())}
                  />
                  <Text>{item.name}</Text>
                </View>
              )}
            />
          )}
        </View>
        <Pressable
          onPress={() => {
            onConfirm(checked);
            onClose();
          }}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmButtonText}>SALVAR</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
