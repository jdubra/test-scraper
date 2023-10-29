'use client';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateString = useMemo(
    () =>
      `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${selectedDate
        .getDate()
        .toString()
        .padStart(2, '0')}`,
    [selectedDate],
  );
  const [ignoreDate, setIgnoreDate] = useState(false);

  const handleSearch = useCallback(() => {
    let route = '/events';

    if (!ignoreDate) {
      route += `?date=${dateString}`;
    }

    router.push(route);
  }, [dateString, ignoreDate]);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 h-screen">
      <div className="mx-auto max-w-2xl"></div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Cartelera asombrosa
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Selecciona una fecha para buscar espectáculos
        </p>
        <div className="flex flex-col">
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <input
              className="rounded border p-1 h-10"
              type="date"
              value={dateString}
              onChange={({ target: { value } }) => {
                const [year, month, day] = value.split('-');
                setSelectedDate(new Date(year, month - 1, day));
              }}
              disabled={ignoreDate}
            />
            <button
              onClick={handleSearch}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Buscar
            </button>
          </div>
          <label className="mt-3">
            <input
              className="mr-2 rounded border"
              type="checkbox"
              checked={ignoreDate}
              onChange={({ target: { checked } }) => setIgnoreDate(checked)}
            />
            No me importa la fecha
          </label>
        </div>
      </div>
    </div>
  );
}
