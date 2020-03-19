import React from 'react';
import { authors } from "../datas/author.json";
import { publishers } from "../datas/publisher.json";
import { subjects } from "../datas/subject.json";
import { Card, Avatar } from 'antd';
import bookImg from '../images/book.jpg';

const { Meta } = Card;

interface IDetailProps {
    match: { params: { id: number } };
    location: { state: { book: { subjectId: number, id: number, title: string, publisherId: number, authorId: number, year: number } } };
}

interface IDetailState {
    subject: string;
    author: string;
    publisher: string;
}

class DetailPage extends React.Component<IDetailProps, IDetailState> {
    book = this.props.location.state.book;
    bookId = this.props.match.params.id;

    getSubject = (subjectId: number) => subjects.find(s => s.id === subjectId)?.name;
    getAuthor = (authorId: number) => authors.find(a => a.id === authorId)?.name;
    getPublisher = (publisherId: number) => publishers.find(p => p.id === publisherId)?.name;

    render() {
        const { book } = this.props.location.state;
        return (
            <Card key={book.id} style={{ width: "calc(100vw-4rem)", margin: "4rem", textAlign: "center" }} >
                <Meta
                    avatar={<Avatar src={bookImg} style={{ width: "15vw", height: "25vh" }}/>}
                    title={book.title}
                    description={
                        <div>
                            <p>Year: {book.year}</p>
                            <p>Publisher: {this.getPublisher(book.publisherId)}</p>
                            <p>Author: {this.getAuthor(book.authorId)}</p>
                            <p>Subject: {this.getSubject(book.subjectId)}</p>
                        </div>
                    }
                />
            </Card>
        );
    }
}

export default DetailPage;