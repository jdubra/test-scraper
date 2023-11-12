'use client';

import { Table } from 'flowbite-react';
import Event from './Event';
import './index.css';

const { Head, HeadCell, Body, Row, Cell } = Table;

export default function EventsList({ events, onSort, sortBy, sortDirection }) {
  const icon = (
    <span style={{ display: 'inline-block', width: '2rem' }}>
      {sortDirection === 'asc' ? '\u2191' : '\u2193'}
    </span>
  );

  return (
    <Table striped hoverable>
      <Head className="w-full sticky top-0">
        <HeadCell
          className="text-left cursor-pointer"
          onClick={() => onSort?.('title')}
        >
          Título {sortBy === 'title' && icon}
        </HeadCell>
        <HeadCell>Sinopsis</HeadCell>
        <HeadCell
          className="text-center cursor-pointer"
          onClick={() => onSort?.('category')}
        >
          Categoría {sortBy === 'category' && icon}
        </HeadCell>
        <HeadCell
          className="text-center cursor-pointer"
          onClick={() => onSort?.('location')}
        >
          Teatro {sortBy === 'location' && icon}
        </HeadCell>
        <HeadCell className="text-center">
          Fechas {sortBy === 'date' && icon}
        </HeadCell>
        <HeadCell
          className="text-center cursor-pointer"
          onClick={() => onSort?.('price')}
        >
          Precios desde {sortBy === 'price' && icon}
        </HeadCell>
        <HeadCell>Entradas</HeadCell>
      </Head>
      <Body>
        {events.map(({ id, ...event }, index) => (
          <Event key={id} data={event} />
        ))}
        {events.length === 0 && (
          <Row>
            <Cell className="p-8 text-center text-lg" colSpan={7}>
              No hay resultados para mostrar, intenta cambiar tus filtros
            </Cell>
          </Row>
        )}
      </Body>
    </Table>
  );
}
