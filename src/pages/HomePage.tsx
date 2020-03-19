import React, { Component, ChangeEvent } from 'react';
import books from '../datas/book.json';
import { authors } from "../datas/author.json";
import { publishers } from '../datas/publisher.json';
import bookImg from '../images/book.jpg';
import { Card, Input, Form, Button } from 'antd';
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface IHomePageState {
    books: { id: number, title: string, year: number, authorId: number }[];
    authors: { id: number, name: string }[];
    publishers: { id: number, name: string }[];
    search: string;
    searchType: string;
    visible: true | false;
}

class HomePage extends Component<{}, IHomePageState> {
    componentDidMount() {
        this.setState({
            books,
            authors,
            visible: false,
            publishers
        });
    }
    handleClick = (searchType: string) => {
        console.log(searchType);
        this.setState({
            searchType,
            visible: true
        });
    }
    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { searchType } = this.state;
        const searchText = event.target.value.toLowerCase();
        this.setState({
            search: searchText
        });
        switch (searchType) {
            case 'book':
                this.setState({
                    books: books.filter(b => b.title.toLowerCase().indexOf(searchText) !== -1)
                });
                break;
            case 'author':
                const author = authors.filter(a => a.name.toLowerCase().indexOf(searchText) !== -1);
                const booksByAuthor: Array<any> = [];
                author.forEach(a => {
                    let findBooks = books.filter(b => b.authorId === a.id);
                    findBooks.forEach(book => booksByAuthor.push(book));
                });
                this.setState({
                    books: booksByAuthor
                })
                break;
            case 'publisher':
                const publisher = publishers.filter(p => p.name.toLowerCase().indexOf(searchText) !== -1);
                const booksByPublisher: Array<any> = [];
                publisher.forEach(p => {
                    let findBooks = books.filter(b => b.publisherId === p.id);
                    findBooks.forEach(book => booksByPublisher.push(book));
                });
                this.setState({
                    books: booksByPublisher
                });
                break;
            default:
                break;
        }

    }
    getAuthor = (id: number) => {
        let author = authors.find(p => p.id === id);

        return author?.name;
    }
    render() {
        const bookList = this.state ? this.state.books.map(book => {
            return (
                <Link key={book.id} to={{ pathname: `/detail/${book.id}`, state: { book: book } }} >
                    <Card hoverable style={{ width: "25vw", margin: "10px", display: "inline-block" }} cover={<img alt="example" src={bookImg} style={{ height: "50vh" }} />} >
                        <Meta title={book.title + " - " + book.year} description={this.getAuthor(book.authorId)} />
                    </Card>
                </Link>
            );
        }) : <li>Loading...</li>;
        return (
            <div className="homepage">
                <Form style={{ paddingTop: "2rem" }}>
                    <Form.Item>
                        <h2>Search By Book Name, Author or Publisher</h2><br />
                        {this.state && this.state.visible ? (<Input placeholder={ `Search by ${ this.state.searchType } name...` } style={{ width: "50vw", borderRadius: "5px", display: "block", marginLeft: "auto", marginRight: "auto" }} onChange={this.handleChange} />) : <p></p>}
                        <br />
                        <Button onClick={() => { this.handleClick("book") }} type="primary" style={{ margin: "5px" }} icon={<SearchOutlined />}>
                            Search By Book Name
                        </Button>
                        <Button onClick={() => { this.handleClick("author") }} type="primary" style={{ margin: "5px" }} icon={<SearchOutlined />}>
                            Search By Author Name
                        </Button>
                        <Button onClick={() => { this.handleClick("publisher") }} type="primary" style={{ margin: "5px" }} icon={<SearchOutlined />}>
                            Search By Publisher Name
                        </Button>
                    </Form.Item>
                </Form>
                <div className="book-list">
                    {bookList}
                </div>
            </div>
        );
    }
}

export default HomePage;