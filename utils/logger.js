const getTime = () => {};
getTime.toString = () => {
  const date = new Date();
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

  const fullDate = [year, month, day].join('-');
  const fullTime = [[hours, minutes, seconds].join(':'), milliseconds].join(
    '.',
  );

  return `[${fullDate} @ ${fullTime}]`;
};

const getLogger = (name = '') => ({
  // eslint-disable-next-line no-console
  log: console.log.bind(
    console,
    `%s [${name.padEnd(15, ' ').slice(0, 15)}]:`,
    getTime,
  ),
});

module.exports = getLogger;
