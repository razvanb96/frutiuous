import React, {EventHandler} from 'react';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import {Nutrients} from './App'

const parser_app_id = '';
const parser_app_key = '';


class SearchBar extends React.Component<any, { searchString: string }> {
    state = {searchString: ''};
    handleSearch = async (event: any) => {
        event.preventDefault();
        let searchStringVar = this.state.searchString;
        this.setState(({searchString: ''}));
        const response = await axios.get('https://api.edamam.com/api/food-database/parser', {
            params: {
                app_id: parser_app_id,
                app_key: parser_app_key,
                ingr: searchStringVar
            }
        });
        if(await response.status === 200) {
            this.props.onSubmit(new Nutrients(await JSON.stringify(response.data.parsed), searchStringVar));
        }

    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <form onSubmit={this.handleSearch} className="form-inline my-2 my-lg-0">
                <input
                    className="form-control mr-sm-2"
                    id="search"
                    type="search"
                    placeholder="Search for fruit..."
                    value={this.state.searchString}
                    onChange={event => this.setState({searchString: event.target.value})}
                    required/>
                <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
            </form>

        );
    }
}

export default SearchBar;