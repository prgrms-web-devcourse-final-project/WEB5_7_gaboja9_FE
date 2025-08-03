import { useState, useEffect, useRef } from 'react';

export const useStockSocket = (stockCodes) => {
  const [stockData, setStockData] = useState(null);
  const [socketError, setSocketError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const stompClient = useRef(null);
  const subscriptions = useRef({});

  useEffect(() => {
    if (typeof window.Stomp === 'undefined' || typeof window.SockJS === 'undefined') {
      console.error('Stomp 또는 SockJS 라이브러리를 찾을 수 없습니다. index.html을 확인하세요.');
      return;
    }

    const codes = Array.isArray(stockCodes) ? stockCodes.filter(Boolean) : [stockCodes].filter(Boolean);

    if (codes.length === 0) {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect(() => {
          console.log('[STOMP] Disconnected');
          setIsConnected(false);
          stompClient.current = null;
        });
      }
      return;
    }

    if (!stompClient.current) {
      const socket = new window.SockJS('https://mockstocks.duckdns.org/ws-stock');

      const client = window.Stomp.over(socket);

      client.debug = null;

      stompClient.current = client;

      client.connect(
        {},
        (frame) => {
          console.log('[STOMP] Connected: ' + frame);
          setIsConnected(true);
          setSocketError(null);

          client.subscribe('/user/queue/errors', (message) => {
            const error = JSON.parse(message.body);
            console.error('소켓 에러 수신:', error);
            setSocketError(error);
          });

          codes.forEach((stockCode) => {
            if (!subscriptions.current[stockCode]) {
              console.log(`구독 시도: /topic/stock/${stockCode}`);
              subscriptions.current[stockCode] = client.subscribe(`/topic/stock/${stockCode}`, (message) => {
                const data = JSON.parse(message.body);
                console.log(`수신된 데이터: ${stockCode}`, data);
                setStockData(data);
              });
            }
          });
        },
        (error) => {
          console.error('[STOMP] Connection error: ' + error);
          setIsConnected(false);
          setSocketError(error);
          stompClient.current = null;
        },
      );
    }

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        console.log('[STOMP] Disconnecting...');
        stompClient.current.disconnect(() => {
          console.log('[STOMP] Cleanly disconnected.');
          setIsConnected(false);
        });
      }
    };
  }, [JSON.stringify(stockCodes)]);

  return { stockData, socketError, isConnected };
};
