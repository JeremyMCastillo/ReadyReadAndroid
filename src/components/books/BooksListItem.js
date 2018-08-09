import React, { Component } from 'react';
import { Text } from 'react-native';

import { Card, CardSection } from '../common';

class BooksListItem extends Component {
    render() {
        const { title } = this.props.book;
        console.log('Rendering book list item.');
        console.log(title[0]);
        const titleValue = title[0];

        return (
            <Card>
                <CardSection>
                    <Text>{titleValue}</Text>
                </CardSection>
            </Card>
        );
    }
}

export default BooksListItem;
