import EventsList from '@/components/EventsList';
import { notFound } from 'next/navigation';

export default async function EventsPage() {
  try {
    const response = await fetch('http://localhost:4000/events?limit=1000');

    const data = await response.json();

    console.log(data);

    return <EventsList events={data} />;
  } catch (error) {
    return notFound();
  }
}
