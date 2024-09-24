import axios, {
  isAxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';

// Alias for brevity
export type HttpResponse<T> = Promise<T | HttpError>;

export type HttpError =
  | { type: 'NETWORK_ERROR'; error: Error }
  | { type: 'VALIDATION_ERROR'; error: Error }
  | { type: 'HTTP_ERROR'; status: number; body: any };

type HttpMethod = 'GET' | 'POST';

export interface HttpRequestConfig {
  method: HttpMethod;
  url: string;
  data?: any;
  headers?: Record<string, string>;
}

const isSuccessfulStatus = (status: number): boolean =>
  status >= 200 && status < 300;

const handleAxiosError = (error: unknown): HttpError => {
  if (isAxiosError(error)) {
    return {
      type: 'HTTP_ERROR',
      status: error.response?.status ?? 0,
      body: error.response?.data ?? {},
    };
  }

  return { type: 'NETWORK_ERROR', error: error as Error };
};

const toAxiosConfig = (config: HttpRequestConfig): AxiosRequestConfig => ({
  method: config.method,
  url: config.url,
  data: config.data,
  headers: config.headers,
});

const processResponse = (response: AxiosResponse): any | HttpError => {
  if (isSuccessfulStatus(response.status)) {
    return response.data;
  }

  return {
    type: 'HTTP_ERROR',
    status: response.status,
    body: response.data,
  };
};

export type HttpClient = {
  request: <T>(config: HttpRequestConfig) => HttpResponse<T>;
};

export const createAxiosHttpClient = (
  axiosInstance: AxiosInstance,
): HttpClient => {
  return {
    request: async <T>(config: HttpRequestConfig): HttpResponse<T> => {
      try {
        const response = await axiosInstance(toAxiosConfig(config));
        return processResponse(response);
      } catch (error) {
        return handleAxiosError(error);
      }
    },
  };
};

export const httpClient = createAxiosHttpClient(axios);
