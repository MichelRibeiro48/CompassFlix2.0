export interface postLoginParams {
  username: string;
  password: string;
  request_token: string;
}

export interface GetTokenResponseDTO {
  success: boolean;
  expires_at?: string;
  request_token?: string;
  status_code?: number;
  status_message?: string;
}
export interface GetSessionIDResponseDTO {
  success: boolean;
  failure?: boolean;
  session_id?: string;
  status_code?: number;
  status_message?: string;
}

export interface GetLoginResponseDTO {
  success: boolean;
  expires_at?: string;
  request_token?: string;
  status_code?: number;
  status_message?: string;
}