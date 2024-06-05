export const server_calls = {
    get: async (parentID: string) => {
      const response = await fetch(`http://127.0.0.1:5000/info?parentID=${parentID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }
  
      return await response.json();
    }
  };
  