import { useState, useEffect } from 'react';

/**
 * Hook genérico para manejar peticiones asíncronas con estados de carga y error.
 * Recibe una función asincrónica que retorna los datos y una lista de
 * dependencias para volver a ejecutar la petición cuando cambien.
 *
 * @template T
 * @param {() => Promise<T>} asyncFunction
 * @param {Array} deps
 * @returns {{ data: T | null, loading: boolean, error: any, setData: (data: T) => void }}
 */
const useFetch = (asyncFunction, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      try {
        const result = await asyncFunction();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, setData };
};

export default useFetch;
