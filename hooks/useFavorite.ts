import { FavoriteHookProps } from "@/lib/appTypes";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo, MouseEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useFavorite = ({ listingId, currentUser }: FavoriteHookProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleState = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (isFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.put(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
      } catch (e) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, isFavorite, listingId, loginModal, router]
  );

  return {
    isFavorite,
    toggleState,
  };
};

export default useFavorite;
