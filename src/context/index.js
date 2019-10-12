import React, { createContext, Component } from 'react';
import keys from './../sources/keys.json';

const API_KEY = process.env.API_KEY || keys.API_KEY;

const Context = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'SEARCH_TRACK':
			return {
				...state,
				track_list: action.payload,
				heading: 'Search Results',
			};
		default:
			return state;
	}
};

class Provider extends Component {
	state = {
		track_list: [],
		heading: 'Top 10 tracks!',
		changeTrackList: action => this.setState(state => reducer(state, action)),
	};

	async componentDidMount() {
		const { track_list } = this.state;
		if (track_list.length < 1 || track_list === undefined) {
			try {
				const baseUrl = 'https://api.musixmatch.com/ws/1.1/';
				const tracks = await fetch(
					`https://cors-anywhere.herokuapp.com/${baseUrl}chart.tracks.get?chart_name=top&page=1&page_size=10&country=it&f_has_lyrics=1&apikey=${API_KEY}`
				);
				const parsedTracks = await tracks.json();
				const track_list = parsedTracks.message.body.track_list;
				this.setState({
					track_list,
				});
			} catch {
				throw new Error('Oops! The fetch went wrong!');
			}
		}
	}

	render() {
		return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
	}
}

const Consumer = Context.Consumer;

export { Provider, Consumer };
