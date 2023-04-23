import Notiflix from 'notiflix';

const API_URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  if (name.trim() === '') {
    return Promise.resolve();
  }

  return fetch(
    `${API_URL}/${name}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      if (res.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return;
      }
    }
    return res.json();
  });
}
