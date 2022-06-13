import { render } from '@testing-library/react'
import react, { useState } from 'react'
import { useEffect } from 'react'

const Card = (movie) => {
	const [open, setOpen] = useState(false)
	const handleShowOverview = () => {
		setOpen(true)
	}
	const handleCloseOverview = () => {
		setOpen(false)
	}
	const handleCardClick = (e) => {
		console.log(e.target.parentNode.querySelector('img').src)
		console.log(e.target.parentNode.querySelector('.title'))
		console.log(e.target.parentNode.querySelector('.rating'))
		console.log(e.target.parentNode.querySelector('.overview p'))
	}
	let img_path = 'https://image.tmdb.org/t/p/w500'
	return (
		<div>
			<div className="movie-card"  onClick={handleCardClick}>
				<img src={img_path + movie.info.poster_path} className="poster"></img>
				<button className="show-more">
					<span onClick={handleShowOverview} class="material-symbols-outlined">
						more_horiz
					</span>
				</button>
				<div className="movie-details">
					<div className="box">
						<h4 className="title">{movie.info.title}</h4>
						<div
							className="rating"
							style={{
								background: `conic-gradient(${movie.info.vote_average > 7 ? 'green' : movie.info.vote_average < 3 ? 'red' : 'yellow'} ${movie.info.vote_average * 10}%, #444 ${movie.info.vote_average * 10}%)`,
							}}
						>
							<span className="rating-value">{movie.info.vote_average}</span>
						</div>
					</div>
				</div>
				<div className={open ? 'overview open' : 'overview'}>
					<p>{movie.info.overview}</p>
					<button className="close" onClick={handleCloseOverview}>
						Close
					</button>
				</div>
			</div>
		</div>
	)
}
export default Card
