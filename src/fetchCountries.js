import axios from 'axios';

export default function fetchCountries(url) {
  return axios.get(url);
}
