import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import styles from "./styles";
import Icon from '@react-native-vector-icons/evil-icons'

export default function Input({
  placeholder,
  iconName,
  color,
  onChangeText,
  value,
  ...rest
}: {
  placeholder: string;
  iconName: any;
  color: string;
  onChangeText: (e: string) => void;
  value: string;
} & TextInputProps) {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={24} color={color} style={{ bottom: 2 }} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#FFFFFF80"}
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
    </View>
  );
}
