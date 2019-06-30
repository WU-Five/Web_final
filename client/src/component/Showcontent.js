import React, { useState } from 'react';

import {
  Button,
  Collapse,
  ListGroupItem
} from 'reactstrap';

const Showcontent = props => {
    const { title, description ,user_u} = props;
    const [modal_1, setModal_1] = useState(false);

    const toggle_1 = () => {
        setModal_1(!modal_1);
      };

    return(
        <ListGroupItem style={{backgroundColor:'rgb(0,0,0,0)', marginBottom: '0.7rem' ,border:'solid',borderRadius:'1rem',borderColor:'antiquewhite',color:'antiquewhite',width:'90%',left:'6%'}}>
            <div style={{ float:'left', fontSize: '1rem',color:'antiquewhite'}}>{`${user_u}: ${title}`}</div>
            <Button style={{ marginLeft: '2rem' }} onClick={() => toggle_1()}>
                Watch
            </Button>
            <Collapse isOpen={modal_1}>
                <div style={{background: 'gray', wordBreak: 'break-word', marginTop: '1rem' }}>
                    {description}
                </div>
            </Collapse>
        </ListGroupItem>
    );
}

export default Showcontent;