import { useState, useCallback } from 'react';
import apiClient from 'apiClient';
import { AxiosRequestConfig } from 'axios';

const makeApi = <D>(initialConfig: AxiosRequestConfig, initialData: D) => () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<D>(initialData);
  const [error, setError] = useState<Error | null>(null);

  const request = useCallback(
    (reqConfig: AxiosRequestConfig) => {
      setLoading(true);

      apiClient({ ...initialConfig, ...reqConfig })
        .then(({ data }) => {
          setData(data);
          setLoading(false);
          setLoaded(true);
        })
        .catch(err => {
          setError(err);
        });
    },
    []
  );

  return { loading, loaded, data, error, request };
};

export default makeApi;
