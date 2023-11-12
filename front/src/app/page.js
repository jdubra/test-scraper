'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

function addDays(date, days) {
  const returnDate = new Date(date);
  returnDate.setDate(returnDate.getDate() + days);
  return returnDate;
}

function formatDateToString(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export default function Home() {
  const router = useRouter();
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(
    addDays(selectedFromDate, 7),
  );
  const [dateFromString, dateToString] = useMemo(
    () => [
      formatDateToString(selectedFromDate),
      formatDateToString(selectedToDate),
    ],
    [selectedFromDate, selectedToDate],
  );
  const [ignoreDate, setIgnoreDate] = useState(false);

  useEffect(() => {
    if (selectedToDate < selectedFromDate) {
      setSelectedToDate(selectedFromDate);
    }
  }, [selectedFromDate, selectedToDate]);

  const handleSearch = useCallback(() => {
    let route = '/events';

    if (!ignoreDate) {
      route += `?from_date=${dateFromString}&to_date=${dateToString}`;
    }

    router.push(route);
  }, [dateFromString, dateToString, ignoreDate]);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 h-screen">
      <div className="mx-auto max-w-2xl"></div>
      <div className="text-center">
        <h1
          className="text-4xl font-bold tracking-tight text-gray-900
                     sm:text-6xl"
        >
          Cartelera asombrosa
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Selecciona una fecha para buscar espectáculos
        </p>
        <div className="flex flex-col">
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <label htmlFor="from" className="inline-flex flex-col items-start">
              Desde
              <input
                name="from"
                className="rounded border p-1 h-10"
                type="date"
                value={dateFromString}
                min={formatDateToString(new Date())}
                onChange={({ target: { value } }) => {
                  const [year, month, day] = value.split('-');
                  setSelectedFromDate(new Date(year, month - 1, day));
                }}
                disabled={ignoreDate}
              />
            </label>
            <label htmlFor="from" className="inline-flex flex-col items-start">
              Hasta
              <input
                name="to"
                className="rounded border p-1 h-10"
                type="date"
                min={formatDateToString(selectedFromDate)}
                value={dateToString}
                onChange={({ target: { value } }) => {
                  const [year, month, day] = value.split('-');
                  setSelectedToDate(new Date(year, month - 1, day));
                }}
                disabled={ignoreDate}
              />
            </label>
            <button
              onClick={handleSearch}
              className="mt-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm
                         font-semibold text-white shadow-sm hover:bg-indigo-500
                         focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-2
                         focus-visible:outline-indigo-600"
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
