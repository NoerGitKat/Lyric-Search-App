import React, { Fragment } from 'react';
import Track from './Track';
import Spinner from './layout/Spinner';

// Context
import { Consumer } from './../context';

const Tracks = () => {
	return (
		<Consumer>
			{value => {
				const { track_list, heading } = value;
				if (track_list.length === 0 || track_list === undefined) {
					return <Spinner />;
				} else {
					return (
						<Fragment>
							<h3 className="text-center mb-4">{heading}</h3>
							<div className="row">
								{track_list.map(track => {
									const { track_id, track_name, album_name, artist_name } = track.track;
									return (
										<Track
											key={track_id}
											trackId={track_id}
											trackName={track_name}
											albumName={album_name}
											artistName={artist_name}
										/>
									);
								})}
							</div>
							)
						</Fragment>
					);
				}
			}}
		</Consumer>
	);
};

export default Tracks;
