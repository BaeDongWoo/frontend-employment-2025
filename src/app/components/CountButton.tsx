'use client';
import { useEffect, useState } from 'react';
import { useThemeStore } from '../stores/useThemeStore';

export const CountButton = () => {
  const [count, setCount] = useState<number>(0);
  const { isMode, setIsMode } = useThemeStore();
  const increment = () => {
    if (count < 10) {
      setCount((prev) => prev + 1);
    }
  };
  const decrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setCount(Number(localStorage.getItem('count')));
  }, []);

  useEffect(() => {
    localStorage.setItem('count', count.toString());
    if (count >= 5) {
      setIsMode(true);
      localStorage.setItem('isMode', 'dark');
      document.documentElement.classList.add('dark');
    } else if (count < 5) {
      setIsMode(false);
      localStorage.setItem('isMode', 'white');
      document.documentElement.classList.remove('dark');
    }
  }, [count]);

  return (
    <div
      className={`fixed bottom-4 right-4 rounded-full ${
        isMode ? 'bg-white' : 'bg-black'
      } p-2 flex flex-col justify-center items-center gap-2`}
    >
      <button onClick={increment} className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
        ▲
      </button>
      <p className={`font-bold ${isMode ? 'text-black' : 'text-white'}`}>{count}</p>
      <button onClick={decrement} className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white">
        ▼
      </button>
    </div>
  );
};
