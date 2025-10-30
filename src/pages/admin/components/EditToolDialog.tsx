import { useState, useEffect } from "react";
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
import { Pencil, Loader2 } from "lucide-react";
import type { Tool, CreateToolRequest } from "../adminTypes";

type EditToolDialogProps = {
    tool: Tool;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (id: string, tool: CreateToolRequest) => Promise<void>;
    categories: string[];
};

export function EditToolDialog({
    tool,
    open,
    onOpenChange,
    onSubmit,
    categories,
}: EditToolDialogProps) {
    const [formData, setFormData] = useState<CreateToolRequest>({
        name: tool.name,
        description: tool.description,
        icon: tool.icon,
        category: tool.category,
        url: tool.url,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            setFormData({
                name: tool.name,
                description: tool.description,
                icon: tool.icon,
                category: tool.category,
                url: tool.url,
            });
            setErrors({});
        }
    }, [open, tool]);

    const handleSubmit = async (e: React.FormEvent) => {
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

        setIsSubmitting(true);
        try {
            await onSubmit(tool.id, formData);
        } catch (error) {
            // Error is handled by parent component, just re-throw
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-background text-foreground border-border sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <Pencil className="h-5 w-5 text-[var(--accent)]" />
                        Edit Tool
                    </DialogTitle>
                    <DialogDescription className="text-foreground/70">
                        Update the tool information
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name" className="text-sm">
                                Name *
                            </Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="e.g., Figma"
                                className="h-10"
                                disabled={isSubmitting}
                            />
                            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-icon" className="text-sm">
                                    Icon *
                                </Label>
                                <Input
                                    id="edit-icon"
                                    value={formData.icon}
                                    onChange={(e) => handleChange("icon", e.target.value)}
                                    placeholder="🎨"
                                    className="h-10 text-lg"
                                    disabled={isSubmitting}
                                />
                                {errors.icon && <p className="text-red-400 text-sm">{errors.icon}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="edit-category" className="text-sm">
                                    Category *
                                </Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleChange("category", value)}
                                    disabled={isSubmitting}
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
                            <Label htmlFor="edit-description" className="text-sm">
                                Description *
                            </Label>
                            <Textarea
                                id="edit-description"
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Describe what this tool does..."
                                className="resize-none"
                                rows={2}
                                disabled={isSubmitting}
                            />
                            {errors.description && (
                                <p className="text-red-400 text-sm">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit-url" className="text-sm">
                                URL *
                            </Label>
                            <Input
                                id="edit-url"
                                type="url"
                                value={formData.url}
                                onChange={(e) => handleChange("url", e.target.value)}
                                placeholder="https://example.com"
                                className="h-10"
                                disabled={isSubmitting}
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
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 px-4 py-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Pencil className="mr-2 h-4 w-4" />
                            )}
                            {isSubmitting ? "Updating..." : "Update Tool"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}