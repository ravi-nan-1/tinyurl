'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Clipboard,
  ClipboardCheck,
  MoreHorizontal,
  Trash,
  Edit,
  BarChart,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { deleteLink, updateLink } from '@/lib/actions';
import type { Link as LinkType } from '@/lib/data';
import { Input } from '../ui/input';

function DataTableRowActions({ row }: { row: LinkType }) {
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [newAlias, setNewAlias] = React.useState(row.id);
  const [isEditing, setIsEditing] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: 'Copied to clipboard!',
      description: text,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    await deleteLink(row.id);
    toast({
      title: 'Link deleted',
      description: `The link ${row.shortUrl} has been deleted.`,
    });
    setShowDeleteDialog(false);
  };

  const handleUpdate = async () => {
    setIsEditing(true);
    const result = await updateLink(row.id, newAlias);
    if(result.error) {
       toast({
        variant: 'destructive',
        title: 'Error updating link',
        description: result.error,
      });
    } else {
      toast({
        title: 'Link updated',
        description: `The alias has been updated to ${newAlias}.`,
      });
      setShowEditDialog(false);
    }
    setIsEditing(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(row.shortUrl)}>
            {copied ? (
              <ClipboardCheck className="mr-2 h-4 w-4" />
            ) : (
              <Clipboard className="mr-2 h-4 w-4" />
            )}
            Copy Short Link
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
              <Link href={`/dashboard/${row.id}`}>
                <BarChart className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the link{' '}
              <span className="font-mono font-medium">{row.shortUrl}</span> and
              all its analytics data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            <DialogDescription>
              Update the custom alias for your short link.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
               <label htmlFor="alias" className="text-right">Alias</label>
               <Input id="alias" value={newAlias} onChange={(e) => setNewAlias(e.target.value)} className="col-span-3"/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={isEditing}>{isEditing ? 'Saving...' : 'Save changes'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function UrlTable({ data }: { data: LinkType[] }) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short URL</TableHead>
            <TableHead className="hidden md:table-cell">Original URL</TableHead>
            <TableHead className="hidden sm:table-cell">Clicks</TableHead>
            <TableHead className="hidden lg:table-cell">Created</TableHead>
            <TableHead className="hidden lg:table-cell">Expires</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length ? (
            data.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <a
                    href={`http://${link.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-medium text-primary hover:underline"
                  >
                    {link.shortUrl}
                  </a>
                </TableCell>
                <TableCell className="hidden max-w-sm truncate md:table-cell">
                  {link.originalUrl}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary">{link.clicks.toLocaleString()}</Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(link.createdAt)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(link.expiresAt)}
                </TableCell>
                <TableCell>
                  <DataTableRowActions row={link} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No links yet. Create one from the home page!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
