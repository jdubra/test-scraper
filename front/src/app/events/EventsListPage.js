'use client';

import EventsList from '@/components/EventsList';
import { Pagination } from 'flowbite-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function EventsListPage({ events, totalCount }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const page = Number(searchParams.get('page') ?? 1);
  const sortBy = searchParams.get('sort_by') ?? 'date';
  const sortDirection = searchParams.get('sort_direction') ?? 'asc';

  const handleSort = (value) => {
    const newSearchParams = new URLSearchParams();

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

  return (
    <>
      <h1 className="text-3xl text-center mb-10 text-gray-600 bold">
        Resultados ({totalCount})
      </h1>
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
