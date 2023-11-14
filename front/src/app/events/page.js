import { notFound } from 'next/navigation';
import EventsListPage from './EventsListPage';

export default async function EventsPage({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page') ?? 1);
  const fromDate = params.get('from_date');
  const toDate = params.get('to_date');
  const sortBy = params.get('sort_by') ?? 'title';
  const sortDirection = params.get('sort_direction') ?? 'asc';
  const title = params.get('title');
  const location = params.get('location');
  const category = params.get('category');

  try {
    const requestParams = new URLSearchParams();

    Object.entries({
      title,
      location,
      category,
      from: fromDate,
      to: toDate,
      sort_by: sortBy,
      sort_direction: sortDirection,
      limit: 10,
    }).forEach(([key, value]) => {
      if (value) {
        requestParams.append(key, value);
      }
    });

    requestParams.append('offset', (page - 1) * 10);

    const requestUrl = `${
      process.env.BACKEND_URL
    }/events?${requestParams.toString()}`;
    console.log({ requestUrl });
    const response = await fetch(requestUrl, { cache: 'no-cache' });
    const { events, totalCount } = await response.json();
    console.log('events', events);
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
