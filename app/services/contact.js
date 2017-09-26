import {apiBase} from '../config';

export const ContactService = {
  find(alias) {
    return fetch({
      url: `${apiBase}/contacts/${alias}`,
      method: 'get'
    })
    .then(response => response.json());
  }
};