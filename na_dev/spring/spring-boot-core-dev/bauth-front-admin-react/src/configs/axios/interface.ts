import type { AxiosRequestConfig } from 'axios';

export interface CustomAxiosConfig extends AxiosRequestConfig {
  isSkipError?: boolean;
  isSkipLoading?: boolean;
}

// ParamError Class
export type paramError = {
  field: string,
  value: object
  reason: string
}

// ApiResponse Class
export type NaruApiResponse = {
  timestamp: string,
  txId: string,
  error: string,
  message: string,
  data: any, 
  paramErrors: paramError[],
}