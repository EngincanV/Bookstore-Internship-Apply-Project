import React, { Component } from 'react';
import books from '../datas/book.json';
import { authors } from "../datas/author.json";
import bookImg from '../images/book.jpg';
import { Card } from 'antd';
import { Link } from "react-router-dom";

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

        return author?.name;
    }
    render() {
        const bookList = this.state ? this.state.books.map(book => {
            return (
                <Link key={ book.id } to={{ pathname: `/detail/${book.id}`, state: { book: book } }} >
                    <Card hoverable style={{ width: "25vw", margin: "10px", display: "inline-block" }} cover={<img alt="example" src={bookImg} style={{height: "50vh"}}/>} >
                        <Meta title={book.title + " - " + book.year} description={this.getAuthor(book.authorId)} />
                    </Card>
                </Link>
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