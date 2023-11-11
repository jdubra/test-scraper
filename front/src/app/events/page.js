import { notFound } from 'next/navigation';
import EventsListPage from './EventsListPage';

export default async function EventsPage({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page') ?? 1);
  const date = params.get('date');
  const sortBy = params.get('sort_by') ?? 'date';
  const sortDirection = params.get('sort_direction') ?? 'desc';

  try {
    const requestParams = new URLSearchParams();

    if (date) {
      requestParams.append('date', date);
    }

    requestParams.append('sort_by', sortBy);
    requestParams.append('sort_direction', sortDirection);
    requestParams.append('limit', 10);
    requestParams.append('offset', (page - 1) * 10);

    const requestUrl = `http://localhost:4000/events?${requestParams.toString()}`;
    const response = await fetch(requestUrl);
    const { events, totalCount } = await response.json();

    return (
      <>
        <EventsListPage events={events} totalCount={totalCount} />
      </>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
