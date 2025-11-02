import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ToolsIcon from "../assets/toolsIcon.png";
import ItemCard from "@/components/ItemCard";

const BACKEND_URL = import.meta.env.VITE_API_URL;

interface Tool {
  tool_id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  url: string;
  created_at: string;
  updated_at: string;
}

const UserPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both tools and categories in parallel
        const [toolsRes, categoriesRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/tools`),
          fetch(`${BACKEND_URL}/api/tools/categories`)
        ]);

        const toolsJson = await toolsRes.json();
        const categoriesJson = await categoriesRes.json();

        if (toolsJson.success) setTools(toolsJson.data);
        if (categoriesJson.success)
          setCategories(["All", ...categoriesJson.data]);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTools =
    selectedCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading tools...
      </div>
    );
  }

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
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 leading-relaxed max-w-xl">
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

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 justify-start mt-8">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`${
              selectedCategory === category
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--bg-primary)] hover:bg-[var(--bg-primary)]/20 text-[var(--text-primary)]"
            } px-6 py-2 rounded-lg transition border border-gray-300`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {filteredTools.length > 0 ? (
          filteredTools.map((item, index) => (
            <ItemCard
              key={`${item.name}-${index}`}
              logo={item.icon}
              name={item.name}
              description={item.description}
              link={item.url}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 py-8">
            No tools found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
