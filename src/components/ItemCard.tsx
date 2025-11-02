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
      className="block w-full text-[var(--text-primary)] border border-gray-30 rounded-xl"
    >
      <div className="cursor-pointer flex flex-col items-start gap-4 bg-[var(--card)] p-6 rounded-xl w-full h-full shadow-lg hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center gap-4">
          <img src={logo} alt={name} className="w-12 h-12 object-contain rounded-lg" />
          <h3 className="text-xl font-semibold text-[var(--text-primary)">{name}</h3>
        </div>


        <p className="text-[var(--text-secondary) text-lg text-justify"><span>&nbsp;&nbsp;</span>{description}</p>
      </div>
    </a>
  );
};

export default ItemCard;
