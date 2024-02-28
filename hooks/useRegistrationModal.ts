import { RegistrationModalStoreProps } from "@/lib/appTypes";
import { create } from "zustand";

const useRegistrationModal = create<RegistrationModalStoreProps>((set) => ({
  isOpen: false,
  onOpen: async () => set({ isOpen: true }),
  onClose: async () => set({ isOpen: false }),
}));

export default useRegistrationModal;
