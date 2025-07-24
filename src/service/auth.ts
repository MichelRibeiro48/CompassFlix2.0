import axios from "axios";
import { GetLoginResponseDTO, GetSessionIDResponseDTO, GetTokenResponseDTO, postLoginParams } from "../types/postLoginDTO";
import { api } from "./api";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV()
export const getToken = async (): Promise<GetTokenResponseDTO | undefined> => {
  try {
    const response = await api.get<GetTokenResponseDTO>("/authentication/token/new");
    return response.data;
  } catch (error) {
    console.log(`Erro na rota de token ${error}`);
    return undefined;
  }
};

export const getSessionID = async (): Promise<GetSessionIDResponseDTO | undefined> => {
  try {
    const response = await api.get<GetSessionIDResponseDTO>("/authentication/session/new", {
      params: {
        request_token: storage.getString('token')
      }
    });
    return response.data;
  } catch (error) {
    console.log(`Erro na rota de token ${error}`);
    return undefined;
  }
};

export const postLogin = async ({username, password, request_token}: postLoginParams): Promise<GetTokenResponseDTO | undefined> => {
  try {
    const response = await api
    .post<GetLoginResponseDTO>(`/authentication/token/validate_with_login`, {
      username: username,
      password: password,
      request_token: request_token,
    })
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined
  }
};