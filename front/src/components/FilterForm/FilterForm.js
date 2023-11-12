'use client';

import { useCallback, useState } from 'react';

export function FilterForm({ onSubmit, filters }) {
  const [title, setTitle] = useState(filters.title);
  const [category, setCategory] = useState(filters.category);
  const [location, setLocation] = useState(filters.location);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      onSubmit({ title, location, category });
    },
    [title, location, category],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-2 mb-5 justify-center align-bottom"
    >
      <label htmlFor="title" className="inline-flex flex-col align-start">
        Título
        <input
          className="p-2 rounded border"
          name="title"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
      </label>
      <label htmlFor="title" className="inline-flex flex-col align-start">
        Categoría
        <input
          className="p-2 rounded border"
          name="category"
          value={category}
          onChange={({ target: { value } }) => setCategory(value)}
        />
      </label>
      <label htmlFor="location" className="inline-flex flex-col align-start">
        Teatro
        <input
          className="p-2 rounded border"
          name="location"
          value={location}
          onChange={({ target: { value } }) => setLocation(value)}
        />
      </label>
      <button
        type="submit"
        className="mt-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm
                   font-semibold text-white shadow-sm hover:bg-indigo-500
                   focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-2
                   focus-visible:outline-indigo-600"
      >
        Filtrar
      </button>
    </form>
  );
}
