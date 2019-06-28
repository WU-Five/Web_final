import React, { useState, useContext, useRef } from 'react';
// import { userContext } from '../context/userIndex';
import { fileContext } from '../context/fileIndex';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import axios from 'axios';

const FileUtil = (props) => {
  const { page, user, file } = props;
  const notitle = useRef('');
  const [modal_1, setModal_1] = useState(false);
  const [modal_2, setModal_2] = useState(false);
  const [iftext_2, setIftext_2] = useState(true);
  const [modal_3, setModal_3] = useState(false);
  
  const toggle_1 = () => {
    setModal_1(!modal_1);
  };

  const onSubmit_1 = e => {
    e.preventDefault();
    console.log('submit');
    toggle_1();
  }
  
  const toggle_2 = () => {
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
    console.log('submit_2');
    toggle_2();
  }  
  
  const toggle_3 = () => {
    setModal_3(!modal_3);
  };

  const onSubmit_3 = e => {
    e.preventDefault();
    console.log('submit_3');
    toggle_3();
  }

  return (
    <div className='col Utilpdf_wrap'>
      <h3 style={{color:'white'}}>新增項目</h3>
      <div className='row'>
        <Button className='col Utilpdf_btn' onClick={toggle_1}>問題</Button>
        <Button className='col Utilpdf_btn' onClick={toggle_2}>解釋</Button>
      </div>
      <Modal isOpen={modal_1} toggle={toggle_1}>
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
      </Modal>

      <Modal isOpen={modal_2} toggle={toggle_2}>
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
                <div>2</div>
              )} 
              
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal_3} toggle={toggle_3}>
        <ModalHeader toggle={toggle_3}>Write Answer</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit_3}>
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
      </Modal>
    </div>
	);
};

export default FileUtil;


