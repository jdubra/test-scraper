import Event from './Event';
import './index.css';

export default function EventsList({ events }) {
  return (
    <table className="events-list border border-black bg-gray-200">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="text-left">Título</th>
          <th>Sinopsis</th>
          <th>Categoría</th>
          <th>Teatro</th>
          <th>Fechas</th>
          <th>Precios</th>
          <th>Entradas</th>
        </tr>
      </thead>
      <tbody>
        {events.map(({ id, ...event }, index) => (
          <Event key={id} data={event} evenRow={index % 2 === 0} />
        ))}
      </tbody>
    </table>
  );
}
