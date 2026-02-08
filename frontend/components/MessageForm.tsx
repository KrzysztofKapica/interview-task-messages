'use client';

import { useState } from 'react';
import { useAddMessageMutation } from '@/lib/messagesApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function MessageForm() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Treść wiadomości jest wymagana');
      return;
    }

    try {
      await addMessage({ content: content.trim() }).unwrap();
      setContent('');
    } catch {
      setError('Błąd podczas dodawania wiadomości');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="space-y-2">
        <Label htmlFor="content">Nowa wiadomość</Label>
        <div className="flex gap-2">
          <Input
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Wpisz treść wiadomości..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Dodawanie...' : 'Dodaj'}
          </Button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </form>
  );
}