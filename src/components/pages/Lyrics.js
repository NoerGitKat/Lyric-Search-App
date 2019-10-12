import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Spinner from './../layout/Spinner';

import keys from './../../sources/keys.json';

const API_KEY = process.env.API_KEY || keys.API_KEY;

class Lyrics extends Component {
	state = {
		track: {},
		lyrics: {},
	};

	async componentDidMount() {
		const { id } = this.props.match.params;

		const baseUrl = 'https://api.musixmatch.com/ws/1.1/';
		try {
			const lyrics = await fetch(
				`https://cors-anywhere.herokuapp.com/${baseUrl}track.lyrics.get?track_id=${id}&apikey=${API_KEY}`
			);
			const parsedLyrics = await lyrics.json();

			const track = await fetch(
				`https://cors-anywhere.herokuapp.com/${baseUrl}track.get?track_id=${id}&apikey=${API_KEY}`
			);
			const parsedTrack = await track.json();

			this.setState({
				lyrics: parsedLyrics.message.body.lyrics,
				track: parsedTrack.message.body.track,
			});
		} catch {
			throw new Error('Oops! The fetch went wrong!');
		}
	}

	render() {
		const { lyrics, track } = this.state;

		if (
			lyrics === undefined ||
			track === undefined ||
			Object.keys(lyrics).length === 0 ||
			Object.keys(track).length === 0
		) {
			return <Spinner />;
		} else {
			return (
				<Fragment>
					<Link to="/" className="btn btn-dark btn-sm mb-4">
						Go Back
					</Link>
					<div className="card">
						<h5 className="card-header">
							{track.track_name} by <span className="text-secondary">{track.artist_name}</span>
						</h5>
						<div className="card-body">
							<p className="card-text">{lyrics.lyrics_body}</p>
						</div>
					</div>

					<ul className="list-group mt-3">
						<li className="list-group-item">
							<strong>Album ID</strong>: {track.album_id}
						</li>
						<li className="list-group-item">
							<strong>Genre</strong>:{' '}
							{track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
						</li>
						<li className="list-group-item">
							<strong>Explicit Words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
						</li>
						<li className="list-group-item">
							<strong>Release Date</strong>:{' '}
							<Moment format="DD/MM/YYYY">{track.first_release_date}</Moment>
						</li>
					</ul>
				</Fragment>
			);
		}
	}
}

export default Lyrics;
