import { Client } from '@stomp/stompjs';
import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

export const useStockSocket = (stockCode) => {
  const [stockData, setStockData] = useState(null);
  const [socketError, setSocketError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const stompClient = useRef(null);
  const subscription = useRef(null);

  useEffect(() => {
    if (!stockCode) {
      return;
    }
    console.log('Connecting to stock socket for code:', stockCode);

    // const socket = new SockJS('https://mockstocks.duckdns.org/ws-stock');

    const client = new Client({
      brokerURL: 'wss://mockstocks.duckdns.org/ws-stock/websocket',

      heartbeatIncoming: 0, // 하트비트 설정도 함께 테스트
      heartbeatOutgoing: 0,

      // webSocketFactory: () => socket,
      debug: (str) => {
        console.log(new Date(), str);
      },
      onConnect: () => {
        console.log(`[STOMP] ${stockCode}에 대한 구독을 시도합니다.`);

        setIsConnected(true);
        setSocketError(null);

        // 1. 에러 구독
        client.subscribe('/user/queue/errors', (message) => {
          const error = JSON.parse(message.body);
          console.error('소켓 에러 수신:', error);
          setSocketError(error);
        });

        // 2. 특정 주식 데이터 구독
        if (subscription.current) {
          subscription.current.unsubscribe();
        }

        subscription.current = client.subscribe(`/topic/stock/${stockCode}`, (message) => {
          const data = JSON.parse(message.body);
          setStockData(data);
          console.log('주식 데이터 수신:', data);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        setSocketError({ code: 'STOMP_ERROR', message: frame.headers['message'] });
        setIsConnected(false);
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, [stockCode]);

  return { stockData, socketError, isConnected };
};
