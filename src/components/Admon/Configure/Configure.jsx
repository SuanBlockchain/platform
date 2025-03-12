import React, { Component } from 'react';

import { Storage } from 'aws-amplify';
import { Button, Card, Form, Row } from 'react-bootstrap';

export default class Configure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileToUpload: null,
            updatingLogo: false
        }
        this.handleInputUploadLogo = this.handleInputUploadLogo.bind(this)
        this.handleUploadLogo = this.handleUploadLogo.bind(this)
    }

    handleInputUploadLogo = (e) => {
        if(e.target.name === 'selected_file'){
            const { target: { files } } = e;
            const [file,] = files || [];
            if (!file) {
                return
            }
            this.setState({fileToUpload: file})
        }
    }
    handleUploadLogo = async() => {
          this.setState({updatingLogo: true})
          let uploadImageResult = null
          let fileNameSplitByDotfileArray = this.state.fileToUpload.name.split('.')
          // Getting extension
          let imageExtension = fileNameSplitByDotfileArray[fileNameSplitByDotfileArray.length-1]
          let imageName = 'logo.' + imageExtension
          // Uploading image TO DO  MOVE TO PRIVATE
          uploadImageResult = await Storage.put(imageName, this.state.fileToUpload, {
            level: "public/",
            contentType: "image/jpeg",
          });
          this.cleanState()


          
    }
    cleanState() {
        this.setState({
            fileToUpload: null,
            updatingLogo: false
        })
    }
    
  render() {
    const modalDocument = () => {
        return (
            <Card
                size="lg"
                >
                <Card.Header>
                    <Card.Title>
                       Change Logo
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row className='mb-3'>
                        <Form.Group>
                            <Form.Label>Choose file</Form.Label>
                            <Form.Control
                            type='file'
                            name='selected_file'
                            onChange={(e) => this.handleInputUploadLogo(e)}
                            />
                        </Form.Group>
                    </Row>
                    <Button disabled={this.state.updatingLogo?true:false} onClick={() => this.handleUploadLogo()}>{this.state.updatingLogo?'Uploading':'Upload'}</Button>
                </Card.Body>
            </Card>
        )
        
    }
    return (
        <>
        {modalDocument()}
        </>
    )
  }
}
