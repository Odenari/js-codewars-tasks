//A separate function to interact with serverside (database)
const postData = async (url, data) => {
	const promise = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});
	return await promise.json();
};

//? A separate function to get data for future creating of card HTML elements

 const getResource = async (url) => {
	const promise = await fetch(url);

	if(!promise.ok) {
		throw new Error(`Couldn't fetch data from ${url}, status: ${promise.status}`);
	}

	return await promise.json();
};

export { getResource };
export default postData;