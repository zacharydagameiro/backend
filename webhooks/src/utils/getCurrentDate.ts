export function getCurrentDate(time = false): string {
  const date = new Date();
  const timeZoneOffset = -7; // Pacific Standard Time is 7 hours behind UTC

  // Adjust the date object to Pacific Standard Time
  date.setHours(date.getHours() + timeZoneOffset);
  console.log("date");
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let monthS;
  let dayS;
  if (month < 10) {
    monthS = `0${month}`;
  }

  if (day < 10) {
    dayS = `0${day}`;
  }
  if (time) {
    return `${year}-${monthS}-${dayS} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  } else {
    // return `${year}-${monthS}-${dayS}`;
    console.log("HI");
    const vancouverTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Vancouver",
    });
    const date = new Date(vancouverTime);
    return date.toISOString().slice(0, 10);
  }
}
