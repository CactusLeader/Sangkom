export const dateParser = (time) => {
  let options = { year: "numeric", month: "short" };

  let timestamp = Date.parse(time);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const dateParserPost = (time) => {
  const oneHour = 3600;
  const oneDay = 86400;
  let timePassed = Date.now() - Date.parse(time);

  let options = {};
  let date = "";

  if (timePassed < oneHour) {
    options = { minute: "numeric" };
    date = new Date(timePassed).toLocaleDateString("fr-Fr", options);
  } else if (timePassed >= oneHour && timePassed < oneDay) {
    options = { hour: "numeric" };
    date = new Date(timePassed).toLocaleDateString("fr-Fr", options);
  } else {
    options = { day: "numeric", month: "short" };
    date = new Date(timePassed).toLocaleDateString("fr-Fr", options);
  }

  return date.toString();
};

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
