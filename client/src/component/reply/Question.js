import React, { useState, useContext, useRef, useEffect } from 'react';
import { Button, Collapse, UncontrolledCollapse, ListGroup, ListGroupItem, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { answerContext } from '../../context/answerIndex';
import Record from '../Record';
import ShowVideo from '../ShowVideo';
import Showcontent from '../Showcontent';

const Question = props => {
	const { user_u, title, comment_type, _id, isvideo, video_path, page, user, file, video_name } = props;
	const [modal_3, setModal_3] = useState(false);
	const [iftext_3, setIftext_3] = useState(true);
	const [questionName, setQuestionName] = useState('');
	const { answerstate, answerdispatch } = useContext(answerContext);
	const { answers } = answerstate;
	const [description, setDescription] = useState('');
	const [utilName, setUtilName] = useState('');

	useEffect(() => {
		axios
			.get(`/api/answers/${file}/${page}`)
			.then(res => {
				answerdispatch({ type: 'GET_ANSWERS', payload: res.data });
			})
			.catch(err => console.log(err));
	}, [answerdispatch, file, page]);

	const createName = () => {
		setUtilName(Date.now());
	};

	const toggle_3 = title => {
		createName();
		setQuestionName(title);
		setModal_3(!modal_3);
	};
	const text_3 = e => {
		setIftext_3(true);
	};

	const video_3 = e => {
		setIftext_3(false);
	};

	const createDes = e => {
		setDescription(e.target.value);
	};

	const matchquestion = (question_o, question_i) => {
		if (question_o === question_i) {
			return true;
		} else return false;
	};

	const onSubmit_3 = e => {
		e.preventDefault();
		if (iftext_3) {
			axios
				.post('/api/answers', {
					user: user,
					file: file,
					page: page,
					question_name: questionName,
					isvideo: false,
					description: description,
				})
				.then(res => {
					console.log('success upload answer');
					answerdispatch({ type: 'ADD_ANSWER', payload: res.data });
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			axios
				.post('/api/answers', {
					user: user,
					file: file,
					page: page,
					question_name: questionName,
					isvideo: true,
					video_path: video_name.current,
				})
				.then(res => {
					console.log('success upload answer');
					answerdispatch({ type: 'ADD_ANSWER', payload: res.data });
				})
				.catch(err => {
					console.log(err);
				});
		}
		setDescription('');
		toggle_3();
	};

	if (!comment_type)
		return (
			<ListGroupItem>
				<ListGroup>
					<ListGroupItem style={{ backgroundColor: 'red' }}>
						<span style={{ float: 'left', marginTop: '0.2rem' }}>{`${user_u}: ${title}`}</span>
						<Button style={{ marginLeft: '2rem' }} onClick={() => toggle_3(title)}>
							Reply
						</Button>
						<Collapse isOpen={modal_3}>
							<div style={{ background: 'white' }}>
								<h4>Write Reply</h4>
								<Form onSubmit={onSubmit_3}>
									<FormGroup>
										<Label for="chooseinput">Choose input type</Label>
										<div id="chooseinput">
											<div className="radio">
												<label>
													<input
														type="radio"
														name="inputtype"
														value="text"
														onChange={text_3}
														checked={iftext_3}
													/>
													Text
												</label>
												<label style={{ marginLeft: '1rem' }}>
													<input
														type="radio"
														name="inputtype"
														value="video"
														onChange={video_3}
														checked={!iftext_3}
													/>
													Video
												</label>
											</div>
										</div>
										{iftext_3 ? (
											<Input type="textarea" value={description} onChange={createDes} />
										) : (
											<Record pdf_name={file} page_num={page} util_name={utilName} Ref={video_name} />
										)}

										<Button
											type="submit"
											color="dark"
											style={{ margin: 'auto', marginTop: '2rem', width: '5rem' }}
											block>
											Submit
										</Button>
									</FormGroup>
								</Form>
							</div>
						</Collapse>
					</ListGroupItem>
					{answers.map(
						({ user_q, question_name, isvideo_q, video_path_q, description_q }, idx) =>
							matchquestion(title, question_name) &&
							(isvideo_q ? (
								<ShowVideo user={user} path={video_path_q} pdf_name={file} title={''} user_u={user_q} key={idx} />
							) : (
								<ListGroupItem key={idx}>
									<div style={{ float: 'left' }}>{`${user_q}:`}</div>
									<div>{description_q}</div>
								</ListGroupItem>
							))
					)}
				</ListGroup>
			</ListGroupItem>
		);
	if (comment_type) {
		return isvideo ? (
			<ShowVideo user={user} path={video_path} pdf_name={file} title={title} user_u={user_u} />
		) : (
			<Showcontent title={title} description={description} user_u={user_u} />
		);
	}
};

export default Question;