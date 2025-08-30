import { createContext, useContext } from 'react';

export const UserContext = createContext(null);

// Кастомный хук, чтобы проще было доставать контекст
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser должен вызываться внутри UserProvider");
  }
  return ctx;
};