import { FC } from "react";

interface ItemCardProps {
  logo: string; // image URL only
  name: string;
  description: string;
  link: string;
}

const ItemCard: FC<ItemCardProps> = ({ logo, name, description, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <div className="cursor-pointer flex flex-col items-start gap-4 bg-white/5 hover:bg-white/10 transition p-6 rounded-xl w-full h-full">
        <img src={logo} alt={name} className="w-12 h-12 object-contain rounded-lg" />
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </a>
  );
};

export default ItemCard;
