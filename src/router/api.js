const BASE_URL = 'http://localhost:3000'; // Reemplaza esta URL con tu URL base

export function fetchWithBaseUrl(url, options = {}) {
  // Combina la URL base con la ruta relativa
  const fullUrl = `${BASE_URL}${url}`;

  // Realiza la petición Fetch con la URL completa y las opciones proporcionadas
  return fetch(fullUrl, options);
}
