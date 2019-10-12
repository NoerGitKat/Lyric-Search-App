import React from 'react';
import { MdAlbum, MdPlayArrow, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Track = ({ trackId, trackName, albumName, artistName }) => {
	return (
		<div className="col-md-6">
			<div className="card mb-4 shadow-sm">
				<div className="card-body">
					<h5>{artistName}</h5>
					<p className="cart-text">
						<strong>
							<MdPlayArrow /> Track
						</strong>
						: {trackName}
						<br />
						<strong>
							<MdAlbum /> Album
						</strong>
						: {albumName}
					</p>
					<Link to={`lyrics/track/${trackId}`} className="btn btn-dark btn-block">
						<MdChevronRight /> View Lyrics
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Track;
