import React, { ChangeEvent, FormEvent } from 'react';
import jsonfile from "jsonfile";
import { subjects } from '../datas/subject.json';
import { publishers } from "../datas/publisher.json";
import { authors } from "../datas/author.json";
import books from "../datas/book.json";
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { SelectValue } from 'antd/lib/select';

const Option = Select.Option;

const validateMessages = {
    required: 'This field is required!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
    },
};

interface IAddPageProps {
    history: { push: (path: string) => any }
}

interface IAddPageState {
    subjects: Array<{ id: number, name: string }>;
    publishers: Array<{ id: number, name: string }>;
    authors: Array<{ id: number, name: string }>;
    title: string;
    subject: number;
    publisher: number;
    author: number;
    year: number;
}

class AddPage extends React.Component<IAddPageProps, IAddPageState> {
    componentDidMount() {
        this.setState({
            subjects: subjects,
            publishers: publishers,
            authors: authors,
        });
    }
    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { author, title, publisher, subject, year } = this.state;
        let newBook = {
            id: books.length + 1,
            title,
            authorId: parseInt(author.toString()),
            publisherId: parseInt(publisher.toString()),
            subjectId: parseInt(subject.toString()),
            year
        };
        books.push(newBook);
        this.props.history.push("/");
    }
    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState<any>({
            title: event.target.value
        });
    }
    handleSelectChange = (value: SelectValue, option: any) => {
        this.setState<any>({
            [option.className]: value
        });
    }
    render() {
        return (
            <Form onSubmitCapture={this.handleSubmit} style={{ marginLeft: "auto", marginRight: "auto", width: "50vw", paddingTop: "10vh" }} name="nest-messages" validateMessages={validateMessages}>
                <h2 style={{ textAlign: "center" }}>Add New Book</h2> <br />
                <Form.Item name={['book', 'name']} label="Book Name" rules={[{ required: true }]}>
                    <Input name="title" onChange={this.handleChange} />
                </Form.Item>
                <Form.Item name={['book', 'year']} label="Book Year" rules={[{required: true}]}>
                    <DatePicker style={{ width: "100%" }} picker="year" name="year" onChange={(value: any, dateString: string) => this.setState({ year: parseInt(dateString) })}></DatePicker>
                </Form.Item>
                <Form.Item name={['book', 'subject']} label="Book Subject" rules={[{ required: true }]}>
                    <Select style={{ width: '100%' }} onChange={this.handleSelectChange}>
                        {
                            this.state ? this.state.subjects.map(subject => {
                                return (
                                    <Option key={subject.id} className="subject" value={subject.id}>{subject.name}</Option>
                                );
                            }) : null
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={['book', 'publisher']} label="Publisher" rules={[{ required: true }]}>
                    <Select onChange={this.handleSelectChange}>
                        {
                            this.state ? this.state.publishers.map(publisher => {
                                return (
                                    <Option key={publisher.id} className="publisher" value={publisher.id}>{publisher.name}</Option>
                                );
                            }) : null
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={['book', 'author']} label="Author" rules={[{ required: true }]}>
                    <Select onChange={this.handleSelectChange}>
                        {
                            this.state ? this.state.authors.map(author => {
                                return (
                                    <Option className="author" key={author.id} value={author.id}>{author.name}</Option>
                                );
                            }) : null
                        }
                    </Select>
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};

export default AddPage;