import { createContext, useState } from "react";

export const ModelCloseContext = createContext();

export const ModalCloseProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navClose, setNavClose] = useState(false);
  return (
    <ModelCloseContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        navClose, 
        setNavClose
      }}
    >
      {children}
    </ModelCloseContext.Provider>
  );
};
