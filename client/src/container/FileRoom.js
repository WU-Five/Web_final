import React,{ Component} from 'react';
import '../stylesheets/FileRoom.css';
import { Container, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import FileUtil from '../component/FileUtil';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class FileRoom extends Component {

  state = {
    numPages: null,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  goToPrevPage = () =>{
    if(this.state.pageNumber > 1){
      this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    }    
  }
  

  goToNextPage = () =>{
    if(this.state.pageNumber < this.state.numPages){
      this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    }  
  }

  getisprivate = (isprivate) => {
		return isprivate === 'true' ? true : false;
  }
  
  print_detail = () => {
    const { user, path} = this.props.match.params;
    return (
      `${user}:  ${path}`
    );
  }

  render(){
    const { pageNumber, numPages } = this.state;
    const { user, path, isprivate} = this.props.match.params;
    return (
      <Container className= "container pdf_wrap">
        <div className='row'>
          <FileUtil page={this.state.pageNumber} user={user} file={path}/>
          <div className='col-md-8 Showpdf_wrap'>
            <div>
              <Document
                file= {`/api/files/${user}/${path}`}
                onLoadSuccess={this.onDocumentLoadSuccess}
                className= "Showpdf_doc"
              >
                <Page scale={1.2} pageNumber={pageNumber} />
              </Document>
            </div>
            <div className='row Showpdf_footer'>
              <div className='col'><Button onClick={this.goToPrevPage}>Prev</Button></div>          
              <div className='col' style={{ marginTop: '0.7rem'}} >Page {pageNumber} of {numPages}</div>
              <div className='col'><Button onClick={this.goToNextPage}>Next</Button></div>          
            </div>
            {this.getisprivate(isprivate)?(
              <Button style={{ margin: '2rem' }} to={'/SelfRoom'} tag={NavLink}>
              Back
              </Button>
            ):(
              <Button style={{ margin: '2rem' }} to={'/PublicRoom'} tag={NavLink}>
              Back
              </Button>
            )}
            
          </div>

        </div>

      </Container>
    );
  }

}

export default FileRoom;