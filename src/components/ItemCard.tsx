import { FC } from "react";

interface ItemCardProps {
  logo: string;
  name: string;
  description: string;
  link: string;
}

const ItemCard: FC<ItemCardProps> = ({ logo, name, description, link }) => {
  return (
    <div className="cursor-pointer flex flex-col items-start gap-4 bg-white/5 hover:bg-white/10 transition p-6 rounded-xl w-full">
      <img src={logo} alt={name} className="w-12 h-12 object-contain" />
      <h3 className="text-xl font-semibold text-foreground">{name}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  );
};

export default ItemCard;
