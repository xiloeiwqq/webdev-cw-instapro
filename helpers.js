export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

function getDeclension(number, forms) {
  const n10 = number % 10;
  const n100 = number % 100;

  if (n100 >= 11 && n100 <= 19) {
    return forms[2];
  }

  if (n10 === 1) {
    return forms[0];
  }

  if (n10 >= 2 && n10 <= 4) {
    return forms[1];
  }

  return forms[2];
}

export function formatDistanceToNow(dateString) {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) {
    return "только что";
  }

  if (minutes < 60) {
    return `${minutes} ${getDeclension(minutes, ["минуту", "минуты", "минут"])} назад`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${getDeclension(hours, ["час", "часа", "часов"])} назад`;
  }

  const days = Math.floor(hours / 24);
  return `${days} ${getDeclension(days, ["день", "дня", "дней"])} назад`;
}
