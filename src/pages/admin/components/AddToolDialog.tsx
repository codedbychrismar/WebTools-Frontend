import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Zap } from "lucide-react";

type AddToolDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (tool: Omit<any, "id">) => void;
    categories: string[];
};

export function AddToolDialog({
    open,
    onOpenChange,
    onSubmit,
    categories,
}: AddToolDialogProps) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        icon: "",
        category: "",
        url: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.icon.trim()) newErrors.icon = "Icon is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.url.trim()) newErrors.url = "URL is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(formData);
        setFormData({
            name: "",
            description: "",
            icon: "",
            category: "",
            url: "",
        });
        setErrors({});
    };

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gradient-to-br from-[#0d1131] to-[#1a1f3a] border-gray-800/50 text-white sm:max-w-[550px] shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        <Zap className="h-6 w-6 text-yellow-400" />
                        Add New Tool
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 text-base">
                        Add a new tool to your collection. Fill in all the required fields.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-5 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-gray-200 text-base">
                                Name *
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="e.g., Figma"
                                className="bg-[#1a1f3a] border-gray-700 text-white placeholder:text-gray-500 text-base h-12"
                            />
                            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="icon" className="text-gray-200 text-base">
                                Icon (emoji) *
                            </Label>
                            <Input
                                id="icon"
                                value={formData.icon}
                                onChange={(e) => handleChange("icon", e.target.value)}
                                placeholder="e.g., 🎨"
                                className="bg-[#1a1f3a] border-gray-700 text-white placeholder:text-gray-500 text-2xl h-12"
                            />
                            {errors.icon && <p className="text-red-400 text-sm">{errors.icon}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-gray-200 text-base">
                                Description *
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Describe what this tool does..."
                                className="bg-[#1a1f3a] border-gray-700 text-white placeholder:text-gray-500 text-base"
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-red-400 text-sm">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category" className="text-gray-200 text-base">
                                Category *
                            </Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => handleChange("category", value)}
                            >
                                <SelectTrigger className="bg-[#1a1f3a] border-gray-700 text-white h-12 text-base">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1f3a] border-gray-700 text-white">
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category} className="text-base">
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category && (
                                <p className="text-red-400 text-sm">{errors.category}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="url" className="text-gray-200 text-base">
                                URL *
                            </Label>
                            <Input
                                id="url"
                                type="url"
                                value={formData.url}
                                onChange={(e) => handleChange("url", e.target.value)}
                                placeholder="https://example.com"
                                className="bg-[#1a1f3a] border-gray-700 text-white placeholder:text-gray-500 text-base h-12"
                            />
                            {errors.url && <p className="text-red-400 text-sm">{errors.url}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="text-gray-300 hover:bg-[#1a1f3a] hover:text-white text-base px-6 py-5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-[#4f7aff] to-[#6b8fff] hover:from-[#6b8fff] hover:to-[#8b9dff] text-base px-6 py-5 shadow-lg shadow-[#4f7aff]/30"
                        >
                            <Zap className="mr-2 h-4 w-4" />
                            Add Tool
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
