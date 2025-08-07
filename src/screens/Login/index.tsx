import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles';
import Input from '../../components/Input';
import { LoginSchemaForm } from '../../types/LoginSchemaForm';
import { loginSchema } from '../../schema/LoginSchema';
import { getSessionID, getToken, postLogin } from '../../service/auth';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';
import {
  isValidSessionResponse,
  isValidTokenResponse,
} from '../../helpers/isValidTokens';
import { useEffect, useState } from 'react';
import { getDetailsProfile } from '../../service/profile';

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: '',
      password: '',
    },
  });
  const storage = new MMKV();
  const navigation = useNavigation();
  const [isloading, setisLoading] = useState(false);

  const onSubmit = async (data: LoginSchemaForm) => {
    setisLoading(true);
    try {
      const tokenRes = await getToken();

      if (!isValidTokenResponse(tokenRes)) {
        Alert.alert('Erro', tokenRes?.status_message ?? 'Erro ao obter token');
        return;
      }

      const loginRes = await postLogin({
        username: data.user,
        password: data.password,
        request_token: tokenRes.request_token,
      });

      if (!loginRes?.success) {
        Alert.alert(
          'Erro',
          loginRes?.status_message ?? 'Erro ao efetuar o login',
        );
        return;
      }

      storage.set('token', tokenRes.request_token);

      const sessionRes = await getSessionID();

      if (!isValidSessionResponse(sessionRes)) {
        Alert.alert(
          'Erro',
          sessionRes?.status_message ?? 'Erro ao obter sessão',
        );
        return;
      }

      storage.set('sessionID', sessionRes.session_id);

      const detailsUserRes = await getDetailsProfile();

      if (detailsUserRes?.success === false) {
        Alert.alert(
          'Erro',
          detailsUserRes?.status_message ?? 'Erro ao obter sessão',
        );
        return;
      }

      storage.set('userID', detailsUserRes?.id?.toString() || '0');

      navigation.reset({
        index: 0,
        routes: [{ name: 'AppTab' as never }],
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    const sessionID = storage.getString('sessionID');

    if (sessionID && sessionID?.length > 0) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AppTab' as never }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/Banner.png')}
        style={styles.banner}
      />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Entre na sua conta para continuar.</Text>

      <View style={styles.form}>
        <Controller
          control={control}
          name="user"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                placeholder="Usuário"
                iconName="user"
                color={errors.user ? 'red' : '#000'}
                onChangeText={onChange}
                placeholderTextColor={errors.user ? 'red' : '#FFFFFF80'}
                value={value}
              />
              {errors.user && (
                <Text style={styles.error}>{errors.user.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                placeholder="Senha"
                iconName="lock"
                placeholderTextColor={errors.user ? 'red' : '#FFFFFF80'}
                color={errors.user ? 'red' : '#000'}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </>
          )}
        />
      </View>

      {isloading ? (
        <ActivityIndicator
          size={'large'}
          color={'#fff'}
          style={{ marginTop: 24 }}
        />
      ) : (
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
