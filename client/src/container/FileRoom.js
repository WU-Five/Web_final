import React, { Component } from 'react';
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
	};

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
	};

	goToPrevPage = () => {
		if (this.state.pageNumber > 1) {
			this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
			localStorage.setItem('pageNum', this.state.pageNumber - 1);
		}
	};

	goToNextPage = () => {
		if (this.state.pageNumber < this.state.numPages) {
			this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
			localStorage.setItem('pageNum', this.state.pageNumber + 1);
		}
	};

	getisprivate = isprivate => {
		return isprivate === 'true' ? true : false;
	};

	resetPage = () => {
		localStorage.setItem('pageNum', 1);
	};

	componentDidMount() {
		if (localStorage.getItem('pageNum')) {
			const num = Number(localStorage.getItem('pageNum'));
			this.setState(state => ({ pageNumber: num }));
		} else {
			localStorage.setItem('pageNum', 1);
		}
	}

	componentWillUnmount() {
		localStorage.setItem('pageNum', 1);
	}

	render() {
		const { numPages } = this.state;
		const { user, path, isprivate } = this.props.match.params;
		const pageNum = Number(localStorage.getItem('pageNum'));
		return (
			<Container className="container pdf_wrap">
				<div className="row">
					<FileUtil page={localStorage.getItem('pageNum')} user={user} file={path} />
					<div className="col-md-8 Showpdf_wrap">
						<div>
							<Document
								file={`/api/files/${user}/${path}`}
								onLoadSuccess={this.onDocumentLoadSuccess}
								className="Showpdf_doc">
								<Page scale={1.2} pageNumber={pageNum} />
							</Document>
						</div>
						<div className="row Showpdf_footer">
							<div className="col">
								<Button onClick={this.goToPrevPage}>Prev</Button>
							</div>
							<div className="col" style={{ marginTop: '0.7rem', color: 'antiquewhite' }}>
								Page {pageNum} of {numPages}
							</div>
							<div className="col">
								<Button onClick={this.goToNextPage}>Next</Button>
							</div>
						</div>
						{this.getisprivate(isprivate) ? (
							<Button style={{ margin: '2rem' }} to={'/SelfRoom'} tag={NavLink} onClick={() => this.resetPage()}>
								Back
							</Button>
						) : (
							<Button style={{ margin: '2rem' }} to={'/PublicRoom'} tag={NavLink} onClick={() => this.resetPage()}>
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
