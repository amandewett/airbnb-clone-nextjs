import { AvatarProps } from "@/lib/appTypes";
import Image from "next/image";

const Avatar = ({ url }: AvatarProps) => {
  return (
    <>
      <Image
        className="rounded-full"
        height={30}
        width={30}
        alt="avatar"
        src={url ? url : "/images/placeholder.jpg"}
      />
    </>
  );
};
export default Avatar;
