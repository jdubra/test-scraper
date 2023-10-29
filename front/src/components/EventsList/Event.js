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
  evenRow,
}) {
  return (
    <tr className={`${evenRow ? '' : 'bg-gray-100'}`}>
      <td className="text-xl bold text-blue-500">{title}</td>
      <td className="line-clamp-2 hover:line-clamp-none">
        {synopsis.length > 0 ? synopsis : notAvailable}
      </td>
      <td className="text-center capitalize">
        {category?.toLowerCase() ?? notAvailable}
      </td>
      <td className="text-center capitalize">
        {location?.toLowerCase() ?? notAvailable}
      </td>
      <td className="whitespace-pre text-center">
        {dates?.length > 0
          ? dates.map((date) => getDate(date)).join('\n')
          : notAvailable}
      </td>
      <td>{prices === 'No disponible' ? notAvailable : prices}</td>
      <td className="text-center">
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
      </td>
    </tr>
  );
}
