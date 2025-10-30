import { useState, useEffect } from "react";
import { ToolsTable } from "./components/ToolsTable";
import { AddToolDialog } from "./components/AddToolDialog";
import { Plus, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // or your preferred toast library
import { toolsApi } from "./services/toolsApi";
import type { Tool, CreateToolRequest } from "./adminTypes";

const AdminDashboard = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch tools and categories on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [toolsData, categoriesData] = await Promise.all([
                toolsApi.getAllTools(),
                toolsApi.getCategories()
            ]);

            setTools(toolsData);
            setCategories(categoriesData);
        } catch (err) {
            console.error('Failed to fetch data:', err);
            setError('Failed to load tools and categories');
            toast.error('Failed to load data from server');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTool = async (toolData: CreateToolRequest) => {
        try {
            const newTool = await toolsApi.createTool(toolData);
            setTools(prev => [...prev, newTool]);
            setIsAddDialogOpen(false);
            toast.success('Tool created successfully!');
        } catch (err) {
            console.error('Failed to create tool:', err);
            toast.error('Failed to create tool');
            throw err; // Re-throw to let the dialog handle the error
        }
    };

    const handleUpdateTool = async (id: string, updatedToolData: CreateToolRequest) => {
        try {
            const updatedTool = await toolsApi.updateTool(id, updatedToolData);
            setTools(prev => prev.map(tool =>
                tool.id === id ? { ...updatedTool, id } : tool
            ));
            toast.success('Tool updated successfully!');
        } catch (err) {
            console.error('Failed to update tool:', err);
            toast.error('Failed to update tool');
            throw err; // Re-throw to let the dialog handle the error
        }
    };

    const handleDeleteTool = async (id: string) => {
        try {
            await toolsApi.deleteTool(id);
            setTools(prev => prev.filter(tool => tool.id !== id));
            toast.success('Tool deleted successfully!');
        } catch (err) {
            console.error('Failed to delete tool:', err);
            toast.error('Failed to delete tool');
        }
    };

    const filteredTools = selectedCategory === "all"
        ? tools
        : tools.filter(tool => tool.category === selectedCategory);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
                    <p className="text-foreground/80">Loading tools...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <p className="text-red-500 text-lg">{error}</p>
                    <Button
                        onClick={fetchData}
                        className="bg-[var(--accent)] hover:bg-[var(--accent)]/90"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

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
                        {categories.map((category) => (
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
                        categories={categories}
                        onUpdate={handleUpdateTool}
                        onDelete={handleDeleteTool}
                    />
                </div>

                {/* Add Tool Dialog */}
                <AddToolDialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                    onSubmit={handleAddTool}
                    categories={categories}
                />
            </section>
        </>
    );
}

export default AdminDashboard;