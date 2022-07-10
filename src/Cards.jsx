const Card = ({movie, updateModal}) => {
	const handleCardClick = (e) => {
		updateModal(movie.title, movie.vote_average, movie.poster_path, movie.overview)
	}
	let img_path = 'https://image.tmdb.org/t/p/w500'
	return (
		<div>
			<div className="movie-card"  onClick={handleCardClick}>
				<img src={img_path + movie.poster_path} className="poster"></img>
				<button className="show-more">
					<span class="material-symbols-outlined">
						more_horiz
					</span>
				</button>
				<div className="movie-details">
					<div className="box">
						<h4 className="title">{movie.title}</h4>
						<div
							className="rating"
							style={{
								background: `conic-gradient(${movie.vote_average > 7 ? 'green' : movie.vote_average < 3 ? 'red' : 'yellow'} ${movie.vote_average * 10}%, #444 ${movie.vote_average * 10}%)`,
							}}
						>
							<span className="rating-value">{movie.vote_average}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Card
