import { Image, Text, View, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles";
import Input from "../../components/Input";
import { LoginSchemaForm } from "../../types/LoginSchemaForm";
import { loginSchema } from "../../schema/LoginSchema";
import { getSessionID, getToken, postLogin } from "../../service/auth";
import { useNavigation } from "@react-navigation/native";
import { MMKV } from "react-native-mmkv";
import { isValidSessionResponse, isValidTokenResponse } from "../../helpers/isValidTokens";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: '',
      password: ''
    }
  });
  const storage = new MMKV()
  const navigation = useNavigation()


const onSubmit = async (data: LoginSchemaForm) => {
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
      Alert.alert('Erro', loginRes?.status_message ?? 'Erro ao efetuar o login');
      return;
    }

    storage.set('token', tokenRes.request_token);

    const sessionRes = await getSessionID();

    if (!isValidSessionResponse(sessionRes)) {
      Alert.alert('Erro', sessionRes?.status_message ?? 'Erro ao obter sessão');
      return;
    }

    storage.set('sessionID', sessionRes.session_id);

    navigation.reset({
      index: 0,
      routes: [{ name: 'AppTab' as never }],
    });

  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../../images/Banner.png')} style={styles.banner} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Entre na sua conta para continuar.</Text>

      <View style={{ gap: 18, marginTop: 24 }}>
        <Controller
          control={control}
          name="user"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                placeholder="Usuário"
                iconName="user"
                color={errors.user ? 'red' : "#000"}
                onChangeText={onChange}
                placeholderTextColor={errors.user ? 'red' : "#FFFFFF80"}
                value={value}
              />
              {errors.user && (
                <Text style={{ color: "red", marginTop: -12 }}>{errors.user.message}</Text>
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
                placeholderTextColor={errors.user ? 'red' : "#FFFFFF80"}
                color={errors.user ? 'red' : "#000"}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
              {errors.password && (
                <Text style={{ color: "red", marginTop: -12 }}>{errors.password.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ marginTop: 24, padding: 12, paddingHorizontal: 24, backgroundColor: '#E9A6A6', borderRadius: 12 }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
