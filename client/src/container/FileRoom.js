import React,{ Component} from 'react';
import { Container, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class FileRoom extends Component {

  test = () => {
    const { user, path} = this.props.match.params
    return (
      `${user}:  ${path}`
    );
  }

  render(){
    return (
      <Container>
        <div>{this.test()}</div>
        <Button style={{ margin: '10px' }} to={'/SelfRoom'} tag={NavLink}>
          Back
        </Button>
      </Container>
    );
  }

}

export default FileRoom;