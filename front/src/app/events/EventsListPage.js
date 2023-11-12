'use client';

import EventsList from '@/components/EventsList';
import { FilterForm } from '@/components/FilterForm';
import { Pagination } from 'flowbite-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function getFilters(searchParams) {
  const title = searchParams.get('title') ?? '';
  const location = searchParams.get('location') ?? '';
  const category = searchParams.get('category') ?? '';

  return {
    title,
    location,
    category,
  };
}

export default function EventsListPage({ events, totalCount }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const page = Number(searchParams.get('page') ?? 1);
  const sortBy = searchParams.get('sort_by') ?? 'date';
  const sortDirection = searchParams.get('sort_direction') ?? 'asc';
  const filters = getFilters(searchParams);

  const handleSort = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('sort_by');
    newSearchParams.delete('sort_direction');

    newSearchParams.append('sort_by', value);

    if (sortBy !== value) {
      newSearchParams.append('sort_direction', 'asc');
    } else {
      newSearchParams.append(
        'sort_direction',
        sortDirection === 'asc' ? 'desc' : 'asc',
      );
    }

    router.push(`${path}?${newSearchParams.toString()}`);
  };

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    newSearchParams.append('page', page);

    router.push(`${path}?${newSearchParams.toString()}`);
  };

  const handleFilter = (newFilters) => {
    const newSearchParams = new URLSearchParams(searchParams);

    [
      'title',
      'category',
      'location',
      'page',
      'sort_by',
      'sort_direction',
    ].forEach((filter) => {
      newSearchParams.delete(filter);
    });

    Object.entries(newFilters)
      .filter(([_key, value]) => !!value.trim())
      .forEach(([key, value]) => newSearchParams.append(key, value));

    router.push(`${path}?${newSearchParams.toString()}`);
  };

  return (
    <>
      <h1 className="mt-8 text-3xl text-center mb-10 text-gray-600 bold">
        Resultados ({totalCount})
      </h1>
      <FilterForm onSubmit={handleFilter} filters={filters} />
      <EventsList
        events={events}
        onSort={handleSort}
        sortBy={searchParams.get('sort_by')}
        sortDirection={sortDirection}
      />
      <div className="flex mt-10 justify-center">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalCount / 10)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
