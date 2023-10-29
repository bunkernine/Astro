import dotenv from 'dotenv';
dotenv.config();
const API_URL = process.env.WP_URL;

async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();
    if (json.errors) {
        console.log(json.errors);
        throw new Error('Failed to fetch API');
    }

    return json.data;
}

export async function getAllWriters() {
    const data = await fetchAPI(`
    {
      writers(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
    `);
    return data?.writers;
}