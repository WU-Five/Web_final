import React, { useState, useContext, useRef } from 'react';
import { userContext } from '../context/userIndex';
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


const UploadFile = () => {
  const { userstate } = useContext(userContext);
  const { filestate, dispatch } = useContext(fileContext);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState('');
  const uploadError = useRef('');

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    setFile(e.target.files[0]);
  }

  const onSubmit = e => {
    e.preventDefault();
    if(file){
      const dataForm = new FormData();
      dataForm.append('file', file);
      axios
        .post(`/api/files/${localStorage.getItem('name')}`, dataForm)
        .then(res => {
          console.log(`Success upload ${res.data.name}`);
          dispatch({ type: 'ADD_FILE', payload: res.data });
        })
        .catch(err => console.log(err));
        toggle();
    }
    else{
      uploadError.current.innerHTML = 'No File Selected';
    }      
    
  }

  return (
    <div>
      <Button
        color='dark'
        style={{ marginBottom: '2rem', marginTop: '2rem' }}
        onClick={toggle}
      >
        Upload File
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Choose File to Upload</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                type='file'
                name='name'
                id='item'
                onChange={onChange}
              />
              <p style={{ textAlign: 'left', height: '25px', marginTop: '0.5rem', color: 'red' }} ref={uploadError} />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Upload
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UploadFile;