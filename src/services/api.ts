import axios from 'axios';

// EXAMPLE API REQUEST

export async function exampleApiRequest(): Promise<void> {
	const headers: any = {};
	await axios.post('https://myApiUrl.com', null, { headers });
}
