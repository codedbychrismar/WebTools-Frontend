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
            <DialogContent className="bg-background text-foreground border-border sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <Zap className="h-5 w-5 text-[var(--accent)]" />
                        Add New Tool
                    </DialogTitle>
                    <DialogDescription className="text-foreground/70">
                        Add a new tool to your collection
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm">
                                Name *
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="e.g., Figma"
                                className="h-10"
                            />
                            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="icon" className="text-sm">
                                    Icon *
                                </Label>
                                <Input
                                    id="icon"
                                    value={formData.icon}
                                    onChange={(e) => handleChange("icon", e.target.value)}
                                    placeholder="🎨"
                                    className="h-10 text-lg"
                                />
                                {errors.icon && <p className="text-red-400 text-sm">{errors.icon}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="category" className="text-sm">
                                    Category *
                                </Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleChange("category", value)}
                                >
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && (
                                    <p className="text-red-400 text-sm">{errors.category}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-sm">
                                Description *
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Describe what this tool does..."
                                className="resize-none"
                                rows={2}
                            />
                            {errors.description && (
                                <p className="text-red-400 text-sm">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="url" className="text-sm">
                                URL *
                            </Label>
                            <Input
                                id="url"
                                type="url"
                                value={formData.url}
                                onChange={(e) => handleChange("url", e.target.value)}
                                placeholder="https://example.com"
                                className="h-10"
                            />
                            {errors.url && <p className="text-red-400 text-sm">{errors.url}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="px-4 py-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 px-4 py-2"
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