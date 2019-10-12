import React, { Fragment } from 'react';
import SearchForm from './../SearchForm';
import Tracks from './../Tracks';

const Index = () => {
	return (
		<Fragment>
			<SearchForm />
			<Tracks />
		</Fragment>
	);
};

export default Index;
