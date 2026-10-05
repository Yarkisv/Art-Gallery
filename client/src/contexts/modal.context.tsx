import { createContext, useContext, useState, type ReactNode } from "react";

interface IModalContext {
  isAddArtworkModalOpen: boolean;
  openAddArtworkModal: () => void;
  closeAddArtworkModal: () => void;
}

interface IModalProviderProps {
  children: ReactNode;
}

const ModalsContext = createContext<IModalContext>({
  isAddArtworkModalOpen: false,
  openAddArtworkModal: () => {},
  closeAddArtworkModal: () => {},
});

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [isAddArtworkModalOpen, setAddArtworkModalOpen] =
    useState<boolean>(false);

  const openAddArtworkModal = () => {
    setAddArtworkModalOpen(true);
  };

  const closeAddArtworkModal = () => {
    setAddArtworkModalOpen(false);
  };

  return (
    <ModalsContext.Provider
      value={{
        isAddArtworkModalOpen,
        openAddArtworkModal,
        closeAddArtworkModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export const useModal = () => useContext(ModalsContext);
