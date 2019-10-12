import React, { Component, Fragment } from 'react';
import { MdMusicNote } from 'react-icons/md';
import keys from './../sources/keys.json';

// Context
import { Consumer } from './../context';

const API_KEY = process.env.API_KEY || keys.API_KEY;

class SearchForm extends Component {
	state = {
		trackTitle: '',
	};

	titleChange = event => {
		this.setState({
			trackTitle: event.target.value,
		});
	};

	getTrackLyrics = async (event, changeTrackList) => {
		event.preventDefault();
		const { trackTitle } = this.state;

		try {
			const baseUrl = 'https://api.musixmatch.com/ws/1.1/';
			const tracks = await fetch(
				`https://cors-anywhere.herokuapp.com/${baseUrl}track.search?q_track=${trackTitle}&page_size=10&apikey=${API_KEY}`
			);
			const parsedTracks = await tracks.json();
			console.log(parsedTracks);

			changeTrackList({
				type: 'SEARCH_TRACK',
				payload: parsedTracks.message.body.track_list,
			});
		} catch {
			throw new Error('Oops! The fetch went wrong!');
		}
	};

	render() {
		return (
			<Consumer>
				{value => {
					const { trackTitle } = this.state;
					const { changeTrackList } = value;

					return (
						<div className="card card-body mb-4 p-4">
							<h1 className="display-4 text-center">
								<MdMusicNote /> Search For A Song
							</h1>
							<p className="lead text-center">Get the lyrics for any song!</p>
							<form onSubmit={event => this.getTrackLyrics(event, changeTrackList)}>
								<div className="form-group">
									<input
										type="text"
										className="form-control form-control-lg"
										placeholder="Song title..."
										name="trackTitle"
										value={trackTitle}
										onChange={event => {
											this.titleChange(event);
										}}
									/>
								</div>
								<button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
									Get Track Lyrics
								</button>
							</form>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default SearchForm;
