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
        <ListGroupItem>
            <div style={{ float:'left', fontSize: '1rem'}}>{`${user_u}: ${title}`}</div>
            <Button style={{ marginLeft: '2rem' }} onClick={() => toggle_1()}>
                Watch
            </Button>
            <Collapse isOpen={modal_1} >
                <div style={{background: 'yellow'}}>
                    {description}
                </div>
            </Collapse>
        </ListGroupItem>
    );
}

export default Showcontent;