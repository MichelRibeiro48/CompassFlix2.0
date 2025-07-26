import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
interface ModalRatingProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: ({
    nameList,
    descList,
  }: {
    nameList: string;
    descList: string;
  }) => void;
}
export default function ModalNewList({
  isVisible,
  onClose,
  onConfirm,
}: ModalRatingProps) {
  const [nameList, setNameList] = useState('');
  const [descList, setDescList] = useState('');
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.avaliationText}>Nova Lista</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => {
              setNameList(text);
            }}
            value={nameList.toString()}
            style={styles.inputNameList}
            placeholder="Nome da lista"
          />
          <TextInput
            onChangeText={text => {
              setDescList(text);
            }}
            value={descList.toString()}
            style={styles.inputDescList}
            numberOfLines={3}
            multiline
            placeholder="Descrição"
          />
        </View>
        <View style={styles.actionButtonsContainer}>
          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>CANCELAR</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              onConfirm({ nameList, descList });
              setNameList('');
              setDescList('');
              onClose();
            }}
            style={[
              styles.confirmButton,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor:
                  nameList !== '' && descList !== '' ? 'black' : '#C4C4C4',
              },
            ]}
          >
            <Text
              style={[
                styles.confirmButtonText,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  color:
                    nameList !== '' && descList !== '' ? 'white' : '#8E8E8E',
                },
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
