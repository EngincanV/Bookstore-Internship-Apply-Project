import React, { Component } from 'react';
import { books } from '../datas/book.json';
import { authors } from "../datas/author.json";
import { Card, Avatar } from 'antd';

const { Meta } = Card;

interface IHomePageState {
    books: { id: number, title: string, year: number, authorId: number }[],
    authors: { id: number, name: string }[]
}

class HomePage extends Component<{}, IHomePageState> {
    componentDidMount() {
        this.setState({
            books, 
            authors
        });
    }
    getAuthor = (id: number) => {
        let author = authors.find(p => p.id === id);
        console.log(id, author);
        return author?.name;
    }
    render() {
        const bookList = this.state ? this.state.books.map(book => {
            return (
                <Card key={book.id}
                    style={{ width: "25vw", margin: "10px", display: "inline-block" }}>
                    <Meta
                        avatar={<Avatar src="https://image.flaticon.com/icons/svg/29/29302.svg" />}
                        title={book.title + " - " + book.year}
                        description={ this.getAuthor(book.authorId) }
                    />
                </Card>
            );
        }) : <li>Loading...</li>;
        return (
            <div className="homepage">
                {bookList}
            </div>
        );
    }
}

export default HomePage;