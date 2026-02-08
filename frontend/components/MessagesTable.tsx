'use client';

import { useState } from 'react';
import {
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from '@/lib/messagesApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
import { EditMessageDialog } from './EditMessageDialog';

export function MessagesTable() {
  const { data: messages, isLoading, error } = useGetMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();
  
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editMessage, setEditMessage] = useState<{ id: number; content: string } | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMessage(deleteId);
      setDeleteId(null);
    }
  };

  if (isLoading) {
    return <p className="text-center py-4">Ładowanie...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">Błąd ładowania wiadomości</p>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Wiadomość</TableHead>
            <TableHead className="w-40 text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages?.map((message) => (
            <TableRow key={message.id}>
              <TableCell className="font-medium">{message.id}</TableCell>
              <TableCell>{message.content}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMessage({ id: message.id, content: message.content })}
                >
                  Edytuj
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteId(message.id)}
                >
                  Usuń
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {messages?.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">
                Brak wiadomości
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć?</AlertDialogTitle>
            <AlertDialogDescription>
              Wiadomość zostanie trwale usunięta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Usuń</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditMessageDialog
        message={editMessage}
        onClose={() => setEditMessage(null)}
      />
    </>
  );
}