import { Text } from '@react-navigation/elements';
import { View } from 'react-native';

export default function Details({ route }: any) {
  const params = route.params;
  return (
    <View>
      <Text>Detalhes do filme/serie</Text>
    </View>
  );
}
