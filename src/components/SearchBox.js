import React from 'react';
import { Search } from 'semantic-ui-react';


function SearchBox(props) {
    return (
        <Search onSearchChange={props.handleSearchChange} />
    );
}

export default SearchBox;