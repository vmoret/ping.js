// I hold the SAP OData API base URI.
const sapApiBase = '';

// I hold the API methods to the SAP OData based service.
export const SapService = {
  
  findProject({name}) {
    return fetch(`${sapApiBase}/projects/${number}`);
  },
  
  findSalesOrder({number}) {
    return fetch(`${sapApiBase}/salesOrders/${number}`);
  }
};