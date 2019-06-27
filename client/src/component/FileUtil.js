import React from 'react';
import { Button } from 'reactstrap';

const FileUtil = (props) => {


  return (
    <div className='col Utilpdf_wrap'>
      <h3>新增項目</h3>
      <div className='row'>
        <Button className='col Utilpdf_btn'>問題</Button>
        <Button className='col Utilpdf_btn'>解釋</Button>
      </div>
    </div>
	);
};

export default FileUtil;


