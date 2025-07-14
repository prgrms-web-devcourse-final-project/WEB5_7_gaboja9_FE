import { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

const useStockSocket = (stockId, initialData) => {
  const [liveData, setLiveData] = useState(initialData);

  useEffect(() => {
    if (!stockId) return;

    // --- 실제 소켓 연결 로직 ---
    // const socket = io("http://localhost:4000"); // 실제 소켓 서버 주소
    // socket.on('connect', () => {
    //   console.log('Socket connected!');
    //   socket.emit('joinRoom', stockId);
    // });
    // socket.on('update', (data) => {
    //   setLiveData(data);
    // });
    // return () => {
    //   socket.disconnect();
    // };

    // --- 시뮬레이션 로직 ---
    const interval = setInterval(() => {
      setLiveData((prevData) => {
        if (!prevData) return prevData;

        const newPrice = prevData.currentPrice + (Math.random() - 0.5) * 100;

        const newOrderBook = {
          asks: prevData.orderBook.asks.map((ask) => ({
            ...ask,
            quantity: Math.max(0, ask.quantity + Math.floor((Math.random() - 0.5) * 50)),
          })),
          bids: prevData.orderBook.bids.map((bid) => ({
            ...bid,
            quantity: Math.max(0, bid.quantity + Math.floor((Math.random() - 0.5) * 50)),
          })),
        };

        return {
          ...prevData,
          currentPrice: Math.round(newPrice),
          orderBook: newOrderBook,
        };
      });
    }, 2000); // 2초마다 데이터 업데이트

    return () => clearInterval(interval);
  }, [stockId]);

  return liveData;
};

export default useStockSocket;
