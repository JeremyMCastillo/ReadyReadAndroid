import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';

import { syncGoodreadsList } from '../../actions';
import { Card, CardSection, Button, Spinner } from '../common';
import BooksListItem from './BooksListItem';

class BooksList extends Component {
    constructor(props) {
        super(props);

        this.createDataSource(this.props);
    }

    state = { loading: false }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    onGoodreadsListSync() {
        const { readyreadAuthToken, goodreadsUserId } = this.props;

        this.props.syncGoodreadsList({ readyreadAuthToken, goodreadsUserId });
    }

    createDataSource({ books }) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.dataSource = ds.cloneWithRows(books);
    }

    renderRow(book) {
        console.log('Calling renderRow');
        console.log(book);
        return <BooksListItem book={book} />;
    }

    renderSyncButton() {
        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <Button
                onPress={this.onGoodreadsListSync.bind(this)}
            >
                Sync Goodreads Reading List
            </Button>
        );
    }

    render() {
        return (
            <View>
                <ListView 
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                <Card>
                    <CardSection>
                        {this.renderSyncButton()}
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { books } = state.books;
    console.log(books);
    const { readyreadAuthToken, goodreadsUserId } = state.auth;

    return { books, readyreadAuthToken, goodreadsUserId };
};

export default connect(mapStateToProps, {
    syncGoodreadsList
})(BooksList);
