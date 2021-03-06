import React, { useState, useContext, useRef, useEffect } from 'react';
import { utilContext } from '../context/utilIndex';
// import { answerContext } from '../context/answerIndex';
import Record from './Record';
import { Button, Collapse, ListGroup, ListGroupItem, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Question from './reply/Question';

const FileUtil = props => {
	const { page, user, file } = props;
	const self = localStorage.getItem('name');
	const { utilstate, dispatch } = useContext(utilContext);
	const { utils } = utilstate;
	const [utilName, setUtilName] = useState(Date.now());
	const [title, setTitle] = useState('');
	const video_name = useRef('');
	const notitle = useRef('');
	const [description_u, setDescription_u] = useState('');
	const [modal_1, setModal_1] = useState(false);
	const [modal_2, setModal_2] = useState(false);
	const [iftext_2, setIftext_2] = useState(true);
	console.log(utils);
	useEffect(() => {
		axios
			.get(`/api/utils/${file}/${page}`)
			.then(res => {
				dispatch({ type: 'GET_UTILS', payload: res.data });
			})
			.catch(err => console.log(err));
		createName();
	}, [dispatch, file, page]);

	const createName = () => {
		setUtilName(Date.now());
	};

	const createTitle = e => {
		setTitle(e.target.value);
	};

	const createDes = e => {
		setDescription_u(e.target.value);
	};

	const toggle_1 = () => {
		createName();
		if (!modal_1 && modal_2) {
			toggle_2();
		}
		setModal_1(!modal_1);
	};

	const onSubmit_1 = e => {
		e.preventDefault();
		axios
			.post('/api/utils', {
				user: self,
				file: file,
				page: page,
				title: title,
				comment_type: 0,
			})
			.then(res => {
				console.log('success upload util');
				dispatch({ type: 'ADD_UTIL', payload: res.data });
			})
			.catch(err => {
				console.log(err);
			});
		setTitle('');
		setDescription_u('');
		toggle_1();
	};

	const toggle_2 = () => {
		createName();
		if (!modal_2 && modal_1) {
			toggle_1();
		}
		setModal_2(!modal_2);
	};

	const text_2 = e => {
		setIftext_2(true);
	};

	const video_2 = e => {
		setIftext_2(false);
	};
	console.log(utilName);
	const onSubmit_2 = e => {
		e.preventDefault();
		if (iftext_2) {
			axios
				.post('/api/utils', {
					user: self,
					file: file,
					page: page,
					title: title,
					comment_type: 2,
					isvideo: false,
					description: description_u,
				})
				.then(res => {
					console.log('success upload util');
					dispatch({ type: 'ADD_UTIL', payload: res.data });
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			axios
				.post('/api/utils', {
					user: self,
					file: file,
					page: page,
					title: title,
					comment_type: 2,
					isvideo: true,
					video_path: video_name.current,
				})
				.then(res => {
					console.log('success upload util');
					dispatch({ type: 'ADD_UTIL', payload: res.data });
				})
				.catch(err => {
					console.log(err);
				});
		}
		setTitle('');
		setDescription_u('');
		toggle_2();
	};

	return (
		<div className="col-md-4 Utilpdf_wrap">
			<h3 style={{ color: 'antiquewhite', fontFamily: '標楷體' }}>新增項目</h3>
			<div className="row">
				<Button className="col Utilpdf_btn" onClick={toggle_1} style={{ fontFamily: '標楷體' }}>
					問題
				</Button>
				<Button className="col Utilpdf_btn" onClick={toggle_2} style={{ fontFamily: '標楷體' }}>
					解釋
				</Button>
			</div>

			<Collapse isOpen={modal_1}>
				<div style={{ background: 'none' }}>
					<h4 style={{ color: 'antiquewhite' }}>Write Question</h4>
					<Form onSubmit={onSubmit_1}>
						<FormGroup>
							<Label for="item" style={{ marginTop: '0.5rem', color: 'antiquewhite' }}>
								Question
							</Label>
							<Input type="text" id="item" value={title} onChange={createTitle} style={{ fontFamily: 'Monaco' }} />
							<p
								style={{ textAlign: 'left', height: '15px', marginTop: '0.5rem', color: 'darkred' }}
								ref={notitle}
							/>
							<Button color="dark" style={{ margin: 'auto', width: '5rem' }} block>
								Submit
							</Button>
						</FormGroup>
					</Form>
				</div>
			</Collapse>

			<Collapse isOpen={modal_2}>
				<div style={{ background: 'none' }}>
					<h4 style={{ color: 'antiquewhite' }}>Write Explanation</h4>
					<Form onSubmit={onSubmit_2}>
						<FormGroup>
							<Label for="item" style={{ color: 'antiquewhite' }}>
								Title
							</Label>
							<Input type="text" id="item" value={title} onChange={createTitle} style={{ fontFamily: 'Monaco' }} />
							<p
								style={{ textAlign: 'left', height: '10px', marginTop: '0.5rem', color: 'darkred' }}
								ref={notitle}
							/>
							<Label for="chooseinput" style={{ color: 'antiquewhite' }}>
								Choose input type
							</Label>
							<div id="chooseinput">
								<div className="radio">
									<label style={{ color: 'antiquewhite' }}>
										<input
											type="radio"
											name="inputtype"
											value="text"
											onChange={text_2}
											checked={iftext_2}
											style={{ fontFamily: 'Monaco' }}
										/>
										Text
									</label>
									<label style={{ marginLeft: '1rem', color: 'antiquewhite' }}>
										<input
											type="radio"
											name="inputtype"
											value="video"
											onChange={video_2}
											checked={!iftext_2}
											style={{ fontFamily: 'Monaco' }}
										/>
										Video
									</label>
								</div>
							</div>
							{iftext_2 ? (
								<Input
									type="textarea"
									value={description_u}
									onChange={createDes}
									style={{ fontFamily: 'Monaco' }}
								/>
							) : (
								<Record pdf_name={file} page_num={page} util_name={utilName} Ref={video_name} />
							)}
							<Button color="dark" style={{ margin: 'auto', marginTop: '2rem', width: '5rem' }} block>
								Submit
							</Button>
						</FormGroup>
					</Form>
				</div>
			</Collapse>

			<ListGroup>
				{utils.map(({ user_u, title, comment_type, _id, isvideo, video_path, description }, idx) => (
					<Question
						user_u={user_u}
						title={title}
						comment_type={comment_type}
						_id={_id}
						isvideo={isvideo}
						video_path={video_path}
						key={idx}
						page={page}
						user={user}
						self={self}
						file={file}
						video_name={video_name}
						description={description}
					/>
				))}
			</ListGroup>
		</div>
	);
};

export default FileUtil;
