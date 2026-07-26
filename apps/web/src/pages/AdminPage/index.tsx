import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Download, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { API_URL } from '@/lib/api';

export function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('admin-token'));
  const stats = useQuery({
    queryKey: ['admin-stats', token],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('No autorizado');
      return response.json();
    },
  });
  const login = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('No se pudo iniciar sesión');
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('admin-token', data.accessToken);
      setToken(data.accessToken);
    },
  });
  const loginForm = useForm({ defaultValues: { email: 'admin@boda.local', password: 'change-me' } });
  const cards = useMemo(
    () =>
      stats.data
        ? [
            ['Confirmados', stats.data.confirmed],
            ['Pendientes', stats.data.pending],
            ['No asisten', stats.data.declined],
            ['Alergias', stats.data.allergyCount],
            ['Canciones', stats.data.songRequests],
          ]
        : [],
    [stats.data],
  );
  return (
    <main className="min-h-screen bg-linen py-12">
      <div className="section-shell">
        <a href="/" className="text-sm font-semibold text-olive">Volver a la web</a>
        <h1 className="mt-8 font-serif text-5xl font-semibold text-olive">Panel de administración</h1>
        {!token ? (
          <Card className="mt-8 max-w-md">
            <form className="grid gap-4" onSubmit={loginForm.handleSubmit((values) => login.mutate(values))}>
              <Input type="email" {...loginForm.register('email')} />
              <Input type="password" {...loginForm.register('password')} />
              <Button type="submit"><LogIn className="h-4 w-4" /> Entrar</Button>
            </form>
          </Card>
        ) : (
          <div className="mt-8 grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {cards.map(([label, value]) => (
                <Card key={label as string}><p className="text-sm font-semibold text-olive">{label}</p><p className="mt-2 font-serif text-4xl">{value as number}</p></Card>
              ))}
            </div>
            <div className="grid gap-6">
              <Card><h2 className="font-serif text-3xl">Invitados pendientes</h2><pre className="mt-4 whitespace-pre-wrap text-sm">{JSON.stringify(stats.data?.pendingGuests, null, 2)}</pre></Card>
            </div>
            <Button asChild variant="secondary"><a href={`${API_URL}/admin/export`}><Download className="h-4 w-4" /> Exportar RSVPs</a></Button>
          </div>
        )}
      </div>
    </main>
  );
}
