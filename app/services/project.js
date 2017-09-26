import {apiBase as defApiBase} from '../config';

export const ProjectService = {
  find(name, apiBase = defApiBase) {
    return fetch(
      `${apiBase}/projects/${name}`, {
        method: 'get'
      })
      .then(response => response.json());
  }
};