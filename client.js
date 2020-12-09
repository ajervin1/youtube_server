const axios = require('axios')
axios.defaults.adapter = require('axios/lib/adapters/http')

// Convert Url
async function convertUrl (url) {
	try {
		const { data } = await axios.post('http://localhost:4000/convert', { youtube_url: url })
		console.log(data)
	} catch (e) {
		console.log(e)
	}
}

// Download



