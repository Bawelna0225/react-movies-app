import React, { useState, useEffect } from 'react'

import Cards from './Cards'
const API_key = '&api_key=84743ee32095533fcd630a3079c2d3f0',
	base_url = 'https://api.themoviedb.org/3'
let url = `${base_url}/discover/movie?sort_by=popularity.desc${API_key}`
let categories = ['Popular', 'Sci-Fi', 'Fantasy', 'Drama', 'Comedy', 'Animation', 'Horror']

const Main = () => {
	const [movieData, setData] = useState([])
	const [url_set, setUrl] = useState(url)
	const [search, setSearch] = useState()
	const [sideNavOpen, setSideNavOpen] = useState(false)
	const [modalData, setModalData] = useState({})
	useEffect(() => {
		fetch(url_set)
			.then((res) => res.json())
			.then((data) => {
				setData(data.results)
			})
	}, [url_set])

	const getData = (movieType) => {
		switch (movieType) {
			case 'Popular':
				url = `${base_url}/discover/movie?sort_by=popularity.desc${API_key}`
				break
			case 'Fantasy':
				url = `${base_url}/discover/movie?with_genres=14${API_key}`
				break
			case 'Sci-Fi':
				url = `${base_url}/discover/movie?with_genres=878&sort_by=popularity.desc${API_key}`
				break
			case 'Drama':
				url = `${base_url}/discover/movie?with_genres=18&primary_release_year=2014${API_key}`
				break
			case 'Comedy':
				url = `${base_url}/discover/movie?with_genres=35&sort_by=revenue.desc${API_key}`
				break
			case 'Animation':
				url = `${base_url}/discover/movie?with_genres=16&sort_by=revenue.desc${API_key}`
				break
			case 'Horror':
				url = `${base_url}/discover/movie?with_genres=27&sort_by=revenue.desc${API_key}`
				break
		}
		setUrl(url)
	}
	const searchMovie = (e) => {
		if (e.key == 'Enter') {
			e.preventDefault()
			url = `${base_url}/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=${search}`
			setUrl(url)
			setSearch('')
		}
	}

	const toggleSideMenu = () => {
		setSideNavOpen(!sideNavOpen)
	}

	const [isModalOpen, setModalOpen] = useState(false)

	const handleCloseModal = () => {
		setModalOpen(false)
	}
	// ---------------------------------------------------------------
	const Modal = (modalData) => {
		return (
			<div className={isModalOpen ? 'modal open' : 'modal'}>
				<div className="modal-box">
					<div className="modal-header">
						<button onClick={handleCloseModal}>
							<span class="material-symbols-outlined">close</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="left-side">
							<div className="poster">
								<img src={`https://image.tmdb.org/t/p/w500/${modalData.poster_path}`} alt="" />
							</div>
						</div>
						<div className="right-side">
							<h2 className="title">{modalData.title}</h2>
							<div className="user-score">
								<div
									className="rating"
									style={{
										background: `conic-gradient(${modalData.vote_average > 7 ? 'green' : modalData.vote_average < 3 ? 'red' : 'yellow'} ${modalData.vote_average * 10}%, #444 ${modalData.vote_average * 10}%)`,
									}}
								>
									<span className="rating-value">{modalData.vote_average}</span>
								</div>
								<p>User Score</p>
							</div>

							<div className="overview">
								<h3>Overview</h3>
								<p>{modalData.overview}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	// ---------------------------------------------------------------------
	const updateModal = (title, vote_average, poster_path, overview) => {
		setModalData({ title, vote_average, poster_path, overview })
		setModalOpen(true)
	}
	return (
		<>
			<div className="header">
				<div className="logo">MOVIE APP</div>
				<nav>
					<div className={sideNavOpen ? 'wrapper-menu open' : 'wrapper-menu'} id="toggle-menu" onClick={toggleSideMenu}>
						<div className="line-menu half start"></div>
						<div className="line-menu"></div>
						<div className="line-menu half end"></div>
					</div>
					<div className={sideNavOpen ? 'nav' : 'nav hide'} id="side-nav">
						<ul>
							{categories.map((value, pos) => {
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
					</div>
					<ul className="navbar">
						{categories.map((value, pos) => {
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
			<div id="modal-here"></div>
			<Modal {...modalData} />
			<div className="container">
				{movieData.length === 0 ? (
					<div className="notfound">No Matching Movies Found!</div>
				) : (
					movieData.map((res, pos) => {
						return <Cards movie={res} key={pos} updateModal={updateModal} />
					})
				)}
			</div>
		</>
	)
}
export default Main
