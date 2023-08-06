import React from "react";
import { useEffect, useState } from "react";
import GifList from "./GifList";
import GifSearch from "./GifSearch";

const request_url =
	"https://api.giphy.com/v1/gifs/trending?api_key=RLH6uvGK2KyyVc5ts9jJaWiAndkpALVw&rating=g";

function GifListContainer() {
	const [imageUrls, setImageUrls] = useState([]);

	useEffect(() => {
		fetch(request_url)
			.then((r) => r.json())
			.then((data) => {
				console.log(data.data);
				const theData = data.data;
				const topThree = theData.slice(0, 4);
				console.log(topThree);
				setImageUrls(topThree.map((urls) => urls.images.original.url));
				console.log(topThree[1].images.original.url);
				
			});
	}, []);


	function handleSearch(searchInput) {
		let searchUrl = `https://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=RLH6uvGK2KyyVc5ts9jJaWiAndkpALVw&rating=g`;

		fetch(searchUrl)
			.then((r) => r.json())
			.then((data) => {
				const searchedUrls = data.data.map((gif) => gif.images.original.url);
				setImageUrls(() => searchedUrls);
			});
	}

	return (
		<div>
			<GifSearch handleSearch={handleSearch} />
			<GifList imageUrls={imageUrls} />
		</div>
	);
}

export default GifListContainer;