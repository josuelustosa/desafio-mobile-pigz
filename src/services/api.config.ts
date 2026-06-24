import axios, {
  AxiosHeaders,
  isAxiosError,
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { getMockTablesResponse } from './mocks/tables.mock';

const API_TIMEOUT_MS = 8000;
const API_BASE_URL = 'https://local.mock.pigz';

const normalizeRoute = (url: string | undefined): string =>
  url?.replace(/^https?:\/\/[^/]+/, '') ?? '';

const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const headers = AxiosHeaders.from(config.headers);
  headers.set('X-App-Client', 'pigz-mobile');
  config.headers = headers;

  return config;
};

const mockAdapter: AxiosAdapter = async config => {
  const method = config.method?.toLowerCase() ?? 'get';
  const route = normalizeRoute(config.url);

  if (method === 'get' && route === '/tables') {
    const data = getMockTablesResponse(config.params);

    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: { 'x-mock-response': 'true' },
      config,
    };

    return response;
  }

  const notFoundResponse: AxiosResponse = {
    data: {
      message: `Route ${method.toUpperCase()} ${
        route || '/'
      } not implemented in local mock API.`,
    },
    status: 404,
    statusText: 'Not Found',
    headers: { 'x-mock-response': 'true' },
    config,
  };

  return notFoundResponse;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  adapter: mockAdapter,
});

apiClient.interceptors.request.use(requestInterceptor);

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    const responseMessage =
      typeof error.response?.data === 'object' &&
      error.response?.data !== null &&
      'message' in error.response.data &&
      typeof error.response.data.message === 'string'
        ? error.response.data.message
        : null;

    const message = responseMessage ?? error.message ?? 'Unexpected API error.';
    return Promise.reject(new Error(message));
  },
);
