import { useState } from "react";
import { ToolsTable } from "./components/ToolsTable";
import { AddToolDialog } from "./components/AddToolDialog";
import { Plus, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockTools = [
    {
        id: "1",
        name: "Figma",
        description: "Collaborative interface design tool",
        icon: "🎨",
        category: "Design 3D",
        url: "https://figma.com",
    },
    {
        id: "2",
        name: "VS Code",
        description: "Powerful code editor by Microsoft",
        icon: "💻",
        category: "Code 3D",
        url: "https://code.visualstudio.com",
    },
    {
        id: "3",
        name: "Blender",
        description: "Open source 3D creation suite",
        icon: "🎬",
        category: "Animate 3D",
        url: "https://blender.org",
    },
    {
        id: "4",
        name: "React",
        description: "A JavaScript library for building user interfaces",
        icon: "⚛️",
        category: "Code 3D",
        url: "https://react.dev",
    },
    {
        id: "5",
        name: "Tailwind CSS",
        description: "A utility-first CSS framework",
        icon: "🎨",
        category: "Design 3D",
        url: "https://tailwindcss.com",
    },
];

const mockCategories = ["Design 3D", "Code 3D", "Animate 3D"];

export type Tool = {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    url: string;
};

const AdminDashboard = () => {
    const [tools, setTools] = useState<Tool[]>(mockTools);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("Design 3D");

    const handleAddTool = (tool: Omit<Tool, "id">) => {
        const newTool = {
            ...tool,
            id: Date.now().toString(),
        };
        setTools([...tools, newTool]);
        setIsAddDialogOpen(false);
    };

    const handleUpdateTool = (id: string, updatedTool: Omit<Tool, "id">) => {
        setTools(tools.map((tool) => (tool.id === id ? { ...updatedTool, id } : tool)));
    };

    const handleDeleteTool = (id: string) => {
        setTools(tools.filter((tool) => tool.id !== id));
    };

    const filteredTools = selectedCategory === "all"
        ? tools
        : tools.filter(tool => tool.category === selectedCategory);

    return (
        <>
            <div className="min-h-screen transition-colors px-6 sm:px-10 md:px-16 lg:px-24 xl:px-48">

                {/* Header Section */}
                <div className="bg-transparent py-24 flex justify-center">
                    <main className="flex flex-col py-16 lg:flex-row items-start justify-between gap-12 w-full max-w-7xl">

                        {/* Text */}
                        <div className="flex-1 lg:flex-[0.6] flex flex-col items-center lg:items-start gap-4 text-center lg:text-left px-4 sm:px-0 py-4">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--accent)] leading-tight">
                                Manage Your Tools Collection
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 leading-relaxed max-w-xl">
                                Add, edit, and organize your web development tools in one place.
                            </p>
                            <Button
                                onClick={() => setIsAddDialogOpen(true)}
                                className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-foreground/80 px-6 py-6 mt-4 text-lg"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                Add New Tool
                            </Button>
                        </div>

                        {/* Image */}
                        <div className="flex-1 lg:flex-[0.4] flex justify-center lg:justify-end w-full lg:w-auto">
                            <img
                                src={"https://avatars.githubusercontent.com/u/171477192?v=4"}
                                alt="Admin Tools Icon"
                                className="w-64 h-64 rounded-3xl shadow-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 hidden sm:block"
                            />
                        </div>
                    </main>
                </div>

            </div>

            {/* TOOLS SECTIONS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex flex-col gap-6">

                    {/* Category Buttons */}
                    <div className="flex flex-wrap gap-4 justify-start mt-8">
                        <Button
                            onClick={() => setSelectedCategory("all")}
                            className={`${selectedCategory === "all"
                                ? "bg-[var(--accent)] text-foreground/80"
                                : "bg-white/10 text-foreground/80 hover:bg-white/20"
                                } px-6 py-2 rounded-lg transition`}
                        >
                            <Zap className="mr-2 h-4 w-4" />
                            All Tools ({tools.length})
                        </Button>
                        {mockCategories.map((category) => (
                            <Button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`${selectedCategory === category
                                    ? "bg-[var(--accent)] text-foreground/80"
                                    : "bg-white/10 text-foreground/80 hover:bg-white/20"
                                    } px-6 py-2 rounded-lg transition`}
                            >
                                {category} ({tools.filter(t => t.category === category).length})
                            </Button>
                        ))}
                    </div>



                </div>
                {/* Tools Table Section */}
                <div className="py-8">
                    <ToolsTable
                        tools={filteredTools}
                        categories={mockCategories}
                        onUpdate={handleUpdateTool}
                        onDelete={handleDeleteTool}
                    />
                </div>

                {/* Add Tool Dialog */}
                <AddToolDialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                    onSubmit={handleAddTool}
                    categories={mockCategories}
                />
            </section>

        </>

    );
}

export default AdminDashboard;