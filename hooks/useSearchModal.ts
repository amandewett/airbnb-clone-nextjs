import { UseSearchModalProps } from "@/lib/appTypes";
import { create } from "zustand";

const useSearchModal = create<UseSearchModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
