import {apiBase as defApiBase} from '../config';

export const DirectoryService = {
  find(project, path = [], apiBase = defApiBase) {
    return fetch(
      `${apiBase}/projects/${project.name}/directory`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(path)
      })
      .then(response => response.json());
  }
};
