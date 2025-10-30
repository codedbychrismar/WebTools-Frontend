import { useState } from "react";
import { Pencil, Trash2, ExternalLink, Zap } from "lucide-react";
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
import type { Tool } from "../adminTypes";

type ToolsTableProps = {
    tools: Tool[];
    categories: string[];
    onUpdate: (id: string, tool: Omit<Tool, "id">) => void;
    onDelete: (id: string) => void;
};

export function ToolsTable({ tools, categories, onUpdate, onDelete }: ToolsTableProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editTool, setEditTool] = useState<Tool | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            onDelete(deleteId);
            setDeleteId(null);
        }
    };

    return (
        <>
            <div className="rounded-xl border border-gray-800/50 bg-gradient-to-br from-[#0d1131]/80 to-[#1a1f3a]/40 backdrop-blur-sm overflow-hidden shadow-2xl shadow-[#8b7dd8]/10 relative">
                {/* Lightning decorations */}
                <div className="absolute top-4 right-4 opacity-20">
                    <Zap className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="absolute bottom-4 left-4 opacity-10">
                    <Zap className="h-6 w-6 text-yellow-400 rotate-180" />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-800/50 text-center hover:bg-[#1a1f3a]/60 bg-[#0d1131]/40">
                            <TableHead className="text-gray-300 text-base py-6"></TableHead>
                            <TableHead className="text-gray-300 text-base py-6">Icon</TableHead>
                            <TableHead className="text-gray-300 text-base py-6">Name</TableHead>
                            <TableHead className="text-gray-300 text-base py-6">Description</TableHead>
                            <TableHead className="text-gray-300 text-base py-6">Category</TableHead>
                            <TableHead className="text-gray-300 text-base py-6">URL</TableHead>
                            <TableHead className="text-gray-300 text-base py-6 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tools.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className=" text-gray-500 py-16 text-lg">
                                    <div className="flex flex-col items-center gap-3">
                                        <Zap className="h-12 w-12 text-gray-600 opacity-50" />
                                        <p>No tools found. Add your first tool to get started.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            tools.map((tool, index) => (
                                <TableRow
                                    key={tool.id}
                                    className="border-gray-800/50 hover:bg-gradient-to-r hover:from-[#1a1f3a]/80 hover:to-[#1a1f3a]/40 transition-all duration-200 group relative"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Lightning effect on hover */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
                                    </div>

                                    <TableCell className="py-6">
                                        <div className="text-4xl transform group-hover:scale-110 transition-transform">
                                            {tool.icon}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-white text-lg py-6">{tool.name}</TableCell>
                                    <TableCell className="text-gray-300 text-base max-w-md py-6">
                                        {tool.description}
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <Badge className="bg-gradient-to-r from-[#8b7dd8] to-[#9b8de8] hover:from-[#9b8de8] hover:to-[#ab9df8] text-white text-sm px-4 py-1.5 shadow-lg shadow-[#8b7dd8]/30">
                                            <Zap className="h-3 w-3 mr-1 inline" />
                                            {tool.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <a
                                            href={tool.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[#4f7aff] hover:text-[#6b8fff] hover:underline text-base group/link"
                                        >
                                            <ExternalLink className="h-4 w-4 group-hover/link:rotate-12 transition-transform" />
                                            <span className="truncate max-w-[200px]">{tool.url}</span>
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right py-6">
                                        <div className="flex justify-end gap-3">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setEditTool(tool)}
                                                className="text-gray-400 hover:text-white hover:bg-[#1a1f3a] h-10 w-10"
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteId(tool.id)}
                                                className="text-gray-400 hover:text-red-400 hover:bg-[#1a1f3a] h-10 w-10"
                                            >
                                                <Trash2 className="h-5 w-5" />
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
            <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent className="bg-gradient-to-br from-[#0d1131] to-[#1a1f3a] border-gray-800/50 text-white shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl flex items-center gap-2">
                            <Zap className="h-6 w-6 text-yellow-400" />
                            Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300 text-base mt-2">
                            This action cannot be undone. This will permanently delete the tool
                            from your collection.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-gray-700 text-gray-300 hover:bg-[#1a1f3a] hover:text-white text-base px-6 py-5">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-base px-6 py-5 shadow-lg shadow-red-600/30"
                        >
                            Delete
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
                    onSubmit={(updatedTool) => {
                        onUpdate(editTool.id, updatedTool);
                        setEditTool(null);
                    }}
                    categories={categories}
                />
            )}
        </>
    );
}
