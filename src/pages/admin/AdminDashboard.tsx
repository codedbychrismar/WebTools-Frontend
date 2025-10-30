import { useState } from "react";
import { ToolsTable } from "./components/ToolsTable";
import { AddToolDialog } from "./components/AddToolDialog";
import { Plus, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
        <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0d1131] to-[#0a0e27] text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8b7dd8] opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4f7aff] opacity-10 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <header className="border-b border-gray-800/50 bg-[#0d1131]/80 backdrop-blur-xl relative z-10">
                <div className="container mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Wrench className="h-12 w-12 text-[#8b7dd8]" />
                                <Zap className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-3xl bg-gradient-to-r from-[#8b7dd8] to-[#4f7aff] bg-clip-text text-transparent">
                                    Web Tools Admin
                                </h1>
                                <p className="text-sm text-gray-500 mt-0.5">Supercharge your workflow</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsAddDialogOpen(true)}
                            className="bg-gradient-to-r from-[#4f7aff] to-[#6b8fff] hover:from-[#6b8fff] hover:to-[#8b9dff] shadow-lg shadow-[#4f7aff]/30 text-lg px-6 py-6"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Add Tool
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-8 py-12 relative z-10">
                <div className="mb-10">
                    <h2 className="mb-3 text-3xl text-white">Tools Management</h2>
                    <p className="text-lg text-gray-400">Manage your web tools collection with style</p>
                </div>

                {/* Category Tabs */}
                <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedCategory}>
                    <TabsList className="bg-[#1a1f3a]/50 backdrop-blur-sm border border-gray-800/50 p-1.5 h-auto">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b7dd8] data-[state=active]:to-[#9b8de8] data-[state=active]:shadow-lg text-base px-6 py-3"
                        >
                            <Zap className="mr-2 h-4 w-4" />
                            All Tools ({tools.length})
                        </TabsTrigger>
                        {mockCategories.map((category) => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8b7dd8] data-[state=active]:to-[#9b8de8] data-[state=active]:shadow-lg text-base px-6 py-3"
                            >
                                {category} ({tools.filter(t => t.category === category).length})
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value={selectedCategory} className="mt-8">
                        <ToolsTable
                            tools={filteredTools}
                            categories={mockCategories}
                            onUpdate={handleUpdateTool}
                            onDelete={handleDeleteTool}
                        />
                    </TabsContent>
                </Tabs>
            </main>

            {/* Add Tool Dialog */}
            <AddToolDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onSubmit={handleAddTool}
                categories={mockCategories}
            />
        </div>
    );
}


export default AdminDashboard;