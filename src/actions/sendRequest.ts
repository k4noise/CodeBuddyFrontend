import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { logoutUser } from './auth';

const ERROR_PAGES = [401, 403, 404];

interface ResponseData<T> {
  data: T | null;
  error: number | null;
}

enum AxiosMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  HEAD = 'head',
  OPTIONS = 'options',
}

const sendRequest = async <ResType>(
  url: string,
  method: AxiosMethod,
  needAuth: boolean,
  body?: Object
): Promise<ResponseData<ResType>> => {
  let data: ResType | null = null;
  let error: number | null = null;

  try {
    let response;
    const config: AxiosRequestConfig = {
      validateStatus(status) {
        return status >= 200 && status < 303;
      },
    };
    if (needAuth) {
      config.withCredentials = true;
    }

    if (method === 'get') response = await axios[method](url, config);
    else response = await axios[method](url, body, config);
    data = response.data;
  } catch (err) {
    if (err.response?.status === 401 && sessionStorage.getItem('profileType'))
      logoutUser();
    if (axios.isAxiosError(err)) {
      const axiosError: AxiosError = err;
      console.error(axiosError);
      error = Number(axiosError.response?.status ?? 500);
    }
  }

  return { data, error };
};

const handleError = (error: number, navigate: NavigateFunction) => {
  if (ERROR_PAGES.includes(error)) {
    navigate(`/${error}`);
  }
};

export { sendRequest, handleError, AxiosMethod };
