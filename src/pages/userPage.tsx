import { useState } from "react";
import { Button } from "@/components/ui/button";
import ToolsIcon from "../assets/toolsIcon.png";
import ItemCard from "@/components/ItemCard";

interface Item {
  logo: string;
  name: string;
  description: string;
  link: string;
}

const UserPage = () => {
  const [selectedButton, setSelectedButton] = useState<string>("Design 3D");

  const buttons: string[] = ["Design 3D", "Code 3D", "Animate 3D"];

  const items: Item[] = [
    {
      logo: ToolsIcon,
      name: "3D Builder",
      description: "A tool to design 3D models with ease.",
      link: "/builder",
    },
    {
      logo: ToolsIcon,
      name: "3D Animator",
      description: "Animate your 3D creations seamlessly.",
      link: "/animator",
    },
    {
      logo: ToolsIcon,
      name: "3D Playground",
      description: "Experiment and code in a 3D environment.",
      link: "/playground",
    },

        {
      logo: ToolsIcon,
      name: "3D Builder",
      description: "A tool to design 3D models with ease.",
      link: "/builder",
    },
    {
      logo: ToolsIcon,
      name: "3D Animator",
      description: "Animate your 3D creations seamlessly.",
      link: "/animator",
    },
    {
      logo: ToolsIcon,
      name: "3D Playground",
      description: "Experiment and code in a 3D environment.",
      link: "/playground",
    },
        {
      logo: ToolsIcon,
      name: "3D Builder",
      description: "A tool to design 3D models with ease.",
      link: "/builder",
    },
    {
      logo: ToolsIcon,
      name: "3D Animator",
      description: "Animate your 3D creations seamlessly.",
      link: "/animator",
    },
    {
      logo: ToolsIcon,
      name: "3D Playground",
      description: "Experiment and code in a 3D environment.",
      link: "/playground",
    },
  ];

  return (
    <div className="min-h-screen transition-colors px-6 sm:px-10 md:px-16 lg:px-24 xl:px-48">

      {/* Header Section */}
      <div className="bg-transparent py-24 flex justify-center">
        <main className="flex flex-col py-16 lg:flex-row items-start justify-between gap-12 w-full max-w-7xl">
          
          {/* Text */}
          <div className="flex-1 lg:flex-[0.6] flex flex-col items-center lg:items-start gap-4 text-center lg:text-left px-4 sm:px-0 py-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--accent)] leading-tight">
              Build and Code Smarter, Deliver Faster            
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-xl">
              Discover beautifully designed, open-source tools that make building web apps easier.
            </p>
          </div>


          {/* Image */}
          <div className="flex-1 lg:flex-[0.4] flex justify-center lg:justify-end w-full lg:w-auto">
            <img
              src={ToolsIcon}
              alt="Hero Icon"
              className="w-64 h-64 rounded-3xl shadow-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 hidden sm:block"
            />
          </div>
        </main>
      </div>

      <div className="flex flex-col gap-6"> 

            <div className="flex flex-wrap gap-4 justify-start mt-8">
              {buttons.map((btn) => (
                <Button
                  key={btn}
                  onClick={() => setSelectedButton(btn)}
                  className={`${
                    selectedButton === btn
                      ? "bg-[var(--accent)] text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  } px-6 py-2 rounded-lg transition`}
                >
                  {btn}
                </Button>
              ))}
            </div>

        {/* Items Section */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {items.map((item, index) => (
            <ItemCard
              key={`${item.name}-${index}`}
              logo={item.logo}
              name={item.name}
              description={item.description}
              link={item.link}
            />
          ))}
        </div>

      </div>



    </div>
  );
};

export default UserPage;
