'use client';

import { useState, useEffect } from 'react';
import { useUpdateMessageMutation } from '@/lib/messagesApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditMessageDialogProps {
  message: { id: number; content: string } | null;
  onClose: () => void;
}

export function EditMessageDialog({ message, onClose }: EditMessageDialogProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [updateMessage, { isLoading }] = useUpdateMessageMutation();

  useEffect(() => {
    if (message) {
      setContent(message.content);
      setError('');
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Treść wiadomości jest wymagana');
      return;
    }

    if (!message) return;

    try {
      await updateMessage({ id: message.id, content: content.trim() }).unwrap();
      onClose();
    } catch {
      setError('Błąd podczas aktualizacji wiadomości');
    }
  };

  return (
    <Dialog open={message !== null} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj wiadomość</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-content">Treść wiadomości</Label>
              <Input
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Wpisz treść wiadomości..."
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Anuluj
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Zapisywanie...' : 'Zapisz'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}