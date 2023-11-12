'use client';

import { Table } from 'flowbite-react';

const { Cell, Row } = Table;

function getDate(rawDate) {
  const date = new Date(rawDate);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

const notAvailable = (
  <span className="text-gray-600 italic">No disponible</span>
);

export default function Event({
  data: { title, location, synopsis, dates, prices, category, pageUrl },
}) {
  return (
    <Row>
      <Cell className="bold text-black">{title}</Cell>
      <Cell>{synopsis.length > 0 ? synopsis : notAvailable}</Cell>
      <Cell className="text-center capitalize">
        {category?.toLowerCase() ?? notAvailable}
      </Cell>
      <Cell className="text-center capitalize">
        {location?.toLowerCase() ?? notAvailable}
      </Cell>
      <Cell className="whitespace-pre text-center">
        {dates?.length > 0
          ? dates.map((date) => getDate(date)).join('\n')
          : notAvailable}
      </Cell>
      <Cell>{prices === 'No disponible' ? notAvailable : prices}</Cell>
      <Cell className="text-center">
        {pageUrl ? (
          <a
            className="inline-block p-2 rounded bg-blue-500 hover:bg-blue-400 text-white"
            href={pageUrl}
            target="_blank"
          >
            Comprar
          </a>
        ) : (
          <span className="inline-block p-2 rounded bg-gray-500 text-white cursor-not-allowed hover:bg-gray-400">
            No disponible
          </span>
        )}
      </Cell>
    </Row>
  );
}
