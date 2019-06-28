import React, { useState, useContext, useRef, useLayoutEffect } from 'react';
import DisplayVideos from './DisplayVideos'
import { utilContext } from '../context/utilIndex';
// import { userContext } from '../context/userIndex';
// import { fileContext } from '../context/fileIndex';
import Record from './Record';
import {
  Button,
  Collapse,
  ListGroup, 
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import axios from 'axios';

const FileUtil = (props) => {
  const { page, user, file } = props;
  const { utilstate, dispatch } = useContext(utilContext);
  const { utils } = utilstate;
  const notitle = useRef('');
  const [utilName, setUtilName] = useState('');
  const [title, setTitle] = useState('');
  const video_name = useRef('');
  const [description, setDescription] = useState('');
  const [modal_1, setModal_1] = useState(false);
  const [modal_2, setModal_2] = useState(false);
  const [iftext_2, setIftext_2] = useState(true);
  const [modal_3, setModal_3] = useState(false);
  const [iftext_3, setIftext_3] = useState(true);

  useLayoutEffect(() => {
		axios
			.get(`/api/utils/${user}/${file}/${page}`)
			.then(res => {
				dispatch({ type: 'GET_UTILS', payload: res.data });
			})
			.catch(err => console.log(err));
  }, [dispatch, utilstate]);
  
  const createName = () => {
    setUtilName(Date.now())
  }

  const createTitle = e => {
    setTitle(e.target.value);
  }

  const createDes = e => {
    setDescription(e.target.value);
  }

  const getcommenttype = type => {
    return type === 0 ? true : false;
  }

  const toggle_1 = () => {
    createName();
    if(!modal_1 && modal_2){
      toggle_2();
    }
    setModal_1(!modal_1);
  };

  const onSubmit_1 = e => {
    e.preventDefault();
    axios
      .post('/api/utils', { 
        user: user,
        file: file,
        page: page,
        title: title,
        comment_type: 0
      })
      .then(res => {
        console.log('success upload util')
        dispatch({ type: 'ADD_Util', payload: res.data }); 
      })
      .catch(err => {
        console.log(err)
    });
    setTitle('');
    setDescription('');
    toggle_1();
  }
  
  const toggle_2 = () => {
    createName();
    if(!modal_2 && modal_1){
      toggle_1();
    }
    setModal_2(!modal_2);
  };
  
  const text_2 = e => {
    setIftext_2(true);
  }

  const video_2 = e => {
    setIftext_2(false);
  }

  const onSubmit_2 = e => {
    e.preventDefault();
    if(iftext_2){
      axios
        .post('/api/utils', { 
          user: user,
          file: file,
          page: page,
          title: title,
          comment_type: 2,
          isvideo: false,
          description: description
        })
        .then(res => {
          console.log('success upload util')
          dispatch({ type: 'ADD_Util', payload: res.data });          
        })
        .catch(err => {
          console.log(err)
      });
    }
    else{
      axios
        .post('/api/utils', { 
          user: user,
          file: file,
          page: page,
          title: title,
          comment_type: 2,
          isvideo: true,
          video_path: video_name.current
        })
        .then(res => {
          console.log('success upload util')
          dispatch({ type: 'ADD_Util', payload: res.data }); 
          
        })
        .catch(err => {
          console.log(err)
      });
    }
    setTitle('');
    setDescription('');
    toggle_2();
  }  
  
  const toggle_3 = () => {
    createName();
    setModal_3(!modal_3);
  };

  const text_3 = e => {
    setIftext_3(true);
  }

  const video_3 = e => {
    setIftext_3(false);
  }
  const onSubmit_3 = e => {
    e.preventDefault();
    if(iftext_3){
      axios
        .post('/api/utils', { 
          user: user,
          file: file,
          page: page,
          title: title,
          comment_type: 1,
          isvideo: false,
          description: description
        })
        .then(res => {
          console.log('success upload util')
          dispatch({ type: 'ADD_Util', payload: res.data });           
        })
        .catch(err => {
          console.log(err);
      });
    }
    else{
      axios
        .post('/api/utils', { 
          user: user,
          file: file,
          page: page,
          title: title,
          comment_type: 1,
          isvideo: true,
          video_path: video_name.current
        })
        .then(res => {
          console.log('success upload util')
          dispatch({ type: 'ADD_Util', payload: res.data });             
        })
        .catch(err => {
          console.log(err)
      });
    }
    setTitle('');
    setDescription('');
    toggle_3();
  }

  return (
    <div className='col-md-4 Utilpdf_wrap'>
      <h3 style={{color:'white'}}>新增項目</h3>
      <div className='row'>
        <Button className='col Utilpdf_btn' onClick={toggle_1}>問題</Button>
        <Button className='col Utilpdf_btn' onClick={toggle_2}>解釋</Button>
      </div>

      {/* <Modal isOpen={modal_1} toggle={toggle_1}>
        <ModalHeader toggle={toggle_1}>Write Question</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit_1}>
            <FormGroup>
              <Label for='item'>Title</Label>
              <Input type='text' id='item'/>
              <p style={{ textAlign: 'left', height: '15px', marginTop: '0.5rem', color: 'red' }} ref={notitle} />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal> */}

            {/* <Modal  isOpen={modal_2} toggle={toggle_2}>
        <ModalHeader toggle={toggle_2}>Write Explanation</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit_2}>
            <FormGroup>
              <Label for='item'>Title</Label>
              <Input type='text' id='item'/>
              <p style={{ textAlign: 'left', height: '10px', marginTop: '0.5rem', color: 'red' }} ref={notitle} />
              <Label for='chooseinput'>Choose input type</Label>
              <div id='chooseinput'>
                <div className="radio">
                  <label>
                    <input type="radio" name='inputtype' value="text" onChange={text_2} checked={iftext_2}/>
                    Text
                  </label>
                  <label style={{ marginLeft: '1rem' }}>
                    <input type="radio" name='inputtype' value="video" onChange={video_2} checked={!iftext_2}/>
                    Video
                  </label>
                </div>
              </div>
              {iftext_2 ? (
                <Input type="textarea" />
              ):(
                <Record />
              )} 
              
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal> */}
      
      <Collapse isOpen={modal_1} >
        <div style={{background: 'white'}}>
          <h4>Write Question</h4>
          <Form onSubmit={onSubmit_1}>
            <FormGroup>
              <Label for='item' style={{ marginTop: '0.5rem' }}>Question</Label>
              <Input type='text' id='item' value={title} onChange={createTitle}/>
              <p style={{ textAlign: 'left', height: '15px', marginTop: '0.5rem', color: 'red' }} ref={notitle}/>
              <Button color='dark' style={{ margin: 'auto', width: '5rem'}} block>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </div>
      </Collapse>

      <Collapse isOpen={modal_2} >
        <div style={{background: 'white'}}>
          <h4>Write Explanation</h4>
          <Form onSubmit={onSubmit_2}>
            <FormGroup>
              <Label for='item'>Title</Label>
              <Input type='text' id='item' value={title} onChange={createTitle}/>
              <p style={{ textAlign: 'left', height: '10px', marginTop: '0.5rem', color: 'red' }} ref={notitle} />
              <Label for='chooseinput'>Choose input type</Label>
              <div id='chooseinput'>
                <div className="radio">
                  <label>
                    <input type="radio" name='inputtype' value="text" onChange={text_2} checked={iftext_2}/>
                    Text
                  </label>
                  <label style={{ marginLeft: '1rem' }}>
                    <input type="radio" name='inputtype' value="video" onChange={video_2} checked={!iftext_2}/>
                    Video
                  </label>
                </div>
              </div>
              {iftext_2 ? (
                <Input type="textarea" value={description} onChange={createDes}/>
              ):(
                <Record pdf_name={file} page_num={page} util_name={utilName} Ref={video_name}/>
              )}
             
              <Button color='dark' style={{ margin: 'auto', marginTop:'2rem', width: '5rem'}} block>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </div>
      </Collapse>

      <Collapse isOpen={modal_3} >
        <div style={{background: 'white'}}>
          <h4>Write Explanation</h4>
          <Form onSubmit={onSubmit_3}>
            <FormGroup>
              <Label for='item'>Title</Label>
              <Input type='text' id='item' value={title}/>
              <p style={{ textAlign: 'left', height: '10px', marginTop: '0.5rem', color: 'red' }} ref={notitle} />
              <Label for='chooseinput'>Choose input type</Label>
              <div id='chooseinput'>
                <div className="radio">
                  <label>
                    <input type="radio" name='inputtype' value="text" onChange={text_3} checked={iftext_3}/>
                    Text
                  </label>
                  <label style={{ marginLeft: '1rem' }}>
                    <input type="radio" name='inputtype' value="video" onChange={video_3} checked={!iftext_3} />
                    Video
                  </label>
                </div>
              </div>
              {iftext_3 ? (
                <Input type="textarea" value={description}/>
              ):(
                <Record />
              )}
             
              <Button color='dark' style={{ margin: 'auto', marginTop:'2rem', width: '5rem'}} block>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </div>
      </Collapse>      


      <DisplayVideos />

      <ListGroup>
				{utils.map(({ title, comment_type, _id }) =>(
          getcommenttype(comment_type)?(
            <ListGroupItem key={_id} style={{backgroundColor: 'red'}}>
						  <span style={{ float: 'left', marginTop: '0.2rem' }}>{title}</span>
					  </ListGroupItem>
          ):(
            <ListGroupItem key={_id} style={{backgroundColor: 'green'}}>
						  <span style={{ float: 'left', marginTop: '0.2rem' }}>{title}</span>
					  </ListGroupItem>
          )
				))}
			</ListGroup>

    </div>
	);
};

export default FileUtil;


