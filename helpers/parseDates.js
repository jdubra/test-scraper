const monthMapPlateanet = {
  "ENE": 0, "FEB": 1, "MAR": 2, "ABR": 3, "MAY": 4, "JUN": 5,
  "JUL": 6, "AGO": 7, "SEP": 8, "OCT": 9, "NOV": 10, "DIC": 11
};

const monthMapColon = {
  "ENERO": 0, "FEBRERO": 1, "MARZO": 2, "ABRIL": 3, "MAYO": 4, "JUNIO": 5,
  "JULIO": 6, "AGOSTO": 7, "SEPTIEMBRE": 8, "OCTUBRE": 9, "NOVIEMBRE": 10, "DICIEMBRE": 11
}

function removeDuplicates(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}

const parseDatesColon = (dateString) => {
  if (dateString === 'No disponible' || dateString === '') {
    return []
  }
  const splitByMonth = dateString.split("/");
  const dates = []
  splitByMonth.forEach(element => {
    const allMonthDate = element.split(" ");
    const month = monthMapColon[allMonthDate[0]];
    const days = [...allMonthDate].slice(1);
    days.forEach(day => {
      const date = new Date();
      date.setFullYear(new Date().getFullYear());
      date.setDate(day);
      date.setMonth(month);
      dates.push(date)
    })
  });
  return dates;
}

const parseDatesPlateanet = (dateStringArray) => {
  const dates = []
  dateStringArray.map((dateString) => {
    const parts = dateString.split(" ");
    const day = parseInt(parts[1]);
    const month = monthMapPlateanet[parts[2]];
    const date = new Date();
    date.setFullYear(new Date().getFullYear());
    date.setMonth(month);
    date.setDate(day);
    dates.push(date)
  })
  return dates
}

const parseDates = (dates, source) => {
  if (source === 'colon') {
    return removeDuplicates(parseDatesColon(dates))
  } else if (source === 'plateanet') {
    return removeDuplicates(parseDatesPlateanet(dates))
  }
}

module.exports = parseDates;
