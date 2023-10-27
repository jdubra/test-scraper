const monthMapColon = {
  "ENERO": 0, "JANUARY": 0,
  "FEBRERO": 1, "FEBRUARY": 1,
  "MARZO": 2, "MARCH": 2,
  "ABRIL": 3, "APRIL":3,
  "MAYO": 4, "MAY": 4,
  "JUNIO": 5, "JUNE": 5,
  "JULIO": 6, "JULY": 6,
  "AGOSTO": 7, "AUGUST": 7,
  "SEPTIEMBRE": 8, "SEPTEMBER": 8,
  "OCTUBRE": 9, "OCTOBER": 9,
  "NOVIEMBRE": 10, "NOVEMBER": 10,
  "DICIEMBRE": 11, "DECEMBER": 11
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
    const allMonthDate = element.split(" ").filter((el) => el !== "");
    const month = monthMapColon[allMonthDate[0]];
    const days = [...allMonthDate].slice(1);
    days.forEach(unparsedDay => {
      const day = unparsedDay.replaceAll(",", "");
      const date = new Date();
      date.setFullYear(new Date().getFullYear());
      date.setDate(day);
      date.setMonth(month);
      dates.push(date)
    })
  });
  return dates;
}

const parseDatesNacion = (dateStringArray) => {
  const dates = []
  dateStringArray.map((dateString) => {
    const parts = dateString.split(".");
    const day = parseInt(parts[0]);
    const month = parts[1] - 1;
    const year = parts[2];
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    dates.push(date)
  })
  return dates
}

const parseDates = (dates, source) => {
  if (source === 'colon') {
    return removeDuplicates(parseDatesColon(dates))
  } else if (source === 'nacion') {
    return removeDuplicates(parseDatesNacion(dates))
  }
}

module.exports = parseDates;
