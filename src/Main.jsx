import React, { useState, useEffect } from 'react'
import Cards from './Cards'
const API_key = '&api_key=84743ee32095533fcd630a3079c2d3f0',
	base_url = 'https://api.themoviedb.org/3'
let url = `${base_url}/discover/movie?sort_by=popularity.desc${API_key}`
let arr = ['Popular', 'Sci-Fi', 'Fantasy', 'Drama', 'Comedy', 'Animation', 'Horror']
const Main = () => {
	const [movieData, setData] = useState([])
	const [url_set, setUrl] = useState(url)
	const [search, setSearch] = useState()
	useEffect(() => {
		fetch(url_set)
			.then((res) => res.json())
			.then((data) => {
				setData(data.results)
			})
	}, [url_set])

	const getData = (movieType) => {
		if (movieType == 'Popular') {
			url = base_url + '/discover/movie?sort_by=popularity.desc' + API_key
		}
		if (movieType == 'Fantasy') {
			url = base_url + '/discover/movie?with_genres=14' + API_key
		}
		if (movieType == 'Sci-Fi') {
			url = base_url + '/discover/movie?with_genres=878&sort_by=popularity.desc' + API_key
		}
		if (movieType == 'Drama') {
			url = base_url + '/discover/movie?with_genres=18&primary_release_year=2014' + API_key
		}
		if (movieType == 'Comedy') {
			url = base_url + '/discover/movie?with_genres=35&sort_by=revenue.desc' + API_key
		}
		if (movieType == 'Animation') {
			url = base_url + '/discover/movie?with_genres=16&sort_by=revenue.desc' + API_key
		}
			if (movieType == 'Horror') {
			url = base_url + '/discover/movie?with_genres=27&sort_by=revenue.desc' + API_key
		}
		setUrl(url)
	}
	const searchMovie = (e) => {
		if (e.key == 'Enter') {
			url = base_url + '/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=' + search
			setUrl(url)
			setSearch('')
		}
	}
	return (
		<>
			<div className="header">
				<nav>
					<ul>
						{arr.map((value, pos) => {
							return (
								<li>
									<a
										href="#"
										key={pos}
										name={value}
										onClick={(e) => {
											getData(e.target.name)
										}}
									>
										{value}
									</a>
								</li>
							)
						})}
					</ul>
				</nav>
				<form>
					<div className="search-btn">
						<input
							type="text"
							placeholder="Enter Movie Name"
							className="inputText"
							onChange={(e) => {
								setSearch(e.target.value)
							}}
							value={search}
							onKeyPress={searchMovie}
						></input>
					</div>
				</form>
			</div>

			<div className="container">
				{movieData.length == 0 ? (
					<p className="notfound">Not Found</p>
				) : (
					movieData.map((res, pos) => {
						return <Cards info={res} key={pos} />
					})
				)}
			</div>
		</>
	)
}
export default Main
