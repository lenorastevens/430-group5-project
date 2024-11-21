import Image, { StaticImageData } from "next/image";
import cart from "../../../public/navigation/cart.svg";
import search from "../../../public/navigation/search.svg";
import user from "../../../public/navigation/user.svg";
import login from "../../../public/navigation/login.svg";

interface IconItem {
  icon: StaticImageData;
  alt: string;
}

const icons: IconItem[] = [
  { icon: cart, alt: "cart icon" },
  { icon: search, alt: "search icon" },
  { icon: user, alt: "user icon" },
  { icon: login, alt: "login icon" },
];

export default function IconNav() {
  return (
    <>
      {icons.map((icon, index) => (
        <Image
          key={index} // Add a unique key for each element
          src={icon.icon} // The image source
          alt={icon.alt} // The alt text for accessibility
          width={10} // Adjust the width as needed
          height={10} // Adjust the height as needed
        />
      ))}
    </>
  );
}
