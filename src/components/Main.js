import React, {Component} from 'react';
import { Grid, Header, Container, Table } from 'semantic-ui-react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import SearchBox from './SearchBox';
import API from '../utils/api';

class Main extends Component {

    state = {
        employees: [{}],
        matched: [{}],
        sortDir: 'descend'
    }

    columnHeading = [
        { title: "Photo", width: "20%" },
        { title: "Name", width: "20%" },
        { title: "Email", width: "30%" },
        { title: "Phone", width: "30%" }
    ]    

    componentDidMount() {
        API.getEmployees().then(results => {
            this.setState({
                employees: results.data.results,
                matched: results.data.results
            });
            console.log(this.state.matched)
        });
    }

    handleSearchChange = event => {
        console.log(event.target.value);
        const match = event.target.value;
        const matches = this.state.employees.filter(item => {

            let values = Object.values(item)
                .join("")
                .toLowerCase();
            return values.indexOf(match.toLowerCase()) !== -1;
        });
        this.setState({ matched: matches });
    }

    handleSortClick = columnHeading => {
        if (this.state.sortDir === 'descend') {
            this.setState({
                sortDir: 'ascend'
            })
        } else {
            this.setState({
                sortDir: 'descend'
            })
        }

        const handleCompare = (a, b) => {
            if (this.state.sortDir === "ascend") {
                if (a[columnHeading] === undefined) { return 1; }
                else if (b[columnHeading] === undefined) { return -1; }
                else if (columnHeading === "Name") { return a[columnHeading].first.localeCompare(b[columnHeading].first); } 
                else { return a[columnHeading] - b[columnHeading]; }
            } else {
                if (a[columnHeading] === undefined) { return 1; } 
                else if (b[columnHeading] === undefined) { return -1; }
                else if (columnHeading === "name") { return b[columnHeading].first.localeCompare(a[columnHeading].first); } 
                else { return b[columnHeading] - a[columnHeading]; }
            }
        }

        const sortedUsers = this.state.matched.sort(handleCompare);
        this.setState({ matched: sortedUsers });              
    }  

    render() {
        return ( 
            <Container className='' textAlign='justified'>

                <Grid className='top-section'>
                    <Grid.Row>
                        <Grid.Column width={9}>
                            <Header as='h1' inverted>Employee Directory</Header>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <SearchBox handleSearchChange={this.handleSearchChange} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Table>
                                <TableHeader  
                                    columnHeading={this.columnHeading}
                                    handleSortClick={this.handleSortClick} />
                                <TableBody employees={this.state.matched} />
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        );
    }
}

export default Main;