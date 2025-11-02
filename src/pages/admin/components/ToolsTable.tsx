import { useState } from "react";
import { Pencil, Trash2, ExternalLink, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EditToolDialog } from "./EditToolDialog";
import { Badge } from "@/components/ui/badge";
import type { Tool, CreateToolRequest } from "../adminTypes";

type ToolsTableProps = {
    tools: Tool[];
    categories: string[];
    onUpdate: (id: string, tool: CreateToolRequest) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
};

export function ToolsTable({ tools, categories, onUpdate, onDelete }: ToolsTableProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editTool, setEditTool] = useState<Tool | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleDelete = async () => {
        if (deleteId) {
            setDeletingId(deleteId);
            try {
                await onDelete(deleteId);
                setDeleteId(null);
            } catch (error) {
                // Error is handled by parent component
            } finally {
                setDeletingId(null);
            }
        }
    };

    const handleUpdate = async (id: string, updatedTool: CreateToolRequest) => {
        setUpdatingId(id);
        try {
            await onUpdate(id, updatedTool);
            setEditTool(null);
        } catch (error) {
            // Error is handled by parent component, re-throw to let dialog handle it
            throw error;
        } finally {
            setUpdatingId(null);
        }
    };

    const getCategoryColor = (category: string) => {
        const colors = {
            'Design 3D': 'from-blue-500 to-purple-500',
            'Code 3D': 'from-green-500 to-emerald-500',
            'Animate 3D': 'from-orange-500 to-red-500'
        };
        return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
    };

    return (
        <>
            <div className="rounded-xl border border-border bg-background/50 backdrop-blur-sm overflow-hidden shadow-lg relative">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-muted/50 bg-muted/30">
                            <TableHead className="text-foreground py-4"></TableHead>
                            <TableHead className="text-foreground py-4">Icon</TableHead>
                            <TableHead className="text-foreground py-4">Name</TableHead>
                            <TableHead className="text-foreground py-4">Description</TableHead>
                            <TableHead className="text-foreground py-4">Category</TableHead>
                            <TableHead className="text-foreground py-4">URL</TableHead>
                            <TableHead className="text-foreground py-4 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tools.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-muted-foreground py-16 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <Zap className="h-12 w-12 text-muted-foreground/50" />
                                        <p>No tools found. Add your first tool to get started.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            tools.map((tool, index) => (
                                <TableRow
                                    key={tool.id}
                                    className="border-border hover:bg-muted/30 transition-all duration-200 group relative"
                                >
                                    <TableCell className="py-4">
                                        <div className="text-3xl transform group-hover:scale-110 transition-transform duration-200">
                                            {tool.icon}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-foreground font-medium py-4">
                                        {tool.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground max-w-md py-4">
                                        {tool.description}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge
                                            className={`bg-gradient-to-r ${getCategoryColor(tool.category)} text-white text-sm px-3 py-1 shadow-sm`}
                                        >
                                            {tool.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <a
                                            href={tool.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent)]/80 hover:underline text-sm group/link"
                                        >
                                            <ExternalLink className="h-3 w-3 group-hover/link:rotate-12 transition-transform" />
                                            <span className="truncate max-w-[200px]">{tool.url}</span>
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right py-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setEditTool(tool)}
                                                disabled={updatingId === tool.id}
                                                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                            >
                                                {updatingId === tool.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Pencil className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteId(tool.id)}
                                                disabled={deletingId === tool.id}
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-muted"
                                            >
                                                {deletingId === tool.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteId !== null} onOpenChange={() => !deletingId && setDeleteId(null)}>
                <AlertDialogContent className="bg-background text-foreground border-border shadow-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl flex items-center gap-2">
                            <Zap className="h-5 w-5 text-[var(--accent)]" />
                            Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground mt-2">
                            This action cannot be undone. This will permanently delete the tool
                            from your collection.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={deletingId !== null}
                            className="px-4 py-2"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deletingId !== null}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2"
                        >
                            {deletingId ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit Tool Dialog */}
            {editTool && (
                <EditToolDialog
                    tool={editTool}
                    open={editTool !== null}
                    onOpenChange={(open) => !open && setEditTool(null)}
                    onSubmit={(updatedTool: any) => handleUpdate(editTool.id, updatedTool)}
                    categories={categories}
                />
            )}
        </>
    );
}