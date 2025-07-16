import React, { Component } from 'react'
import s from './DragArea.module.css'
class DragAreaJustImages extends Component{
  constructor(props) {
    super(props)
    this.state = {
      ImageSelectedPrevious: null,
      imageError: ''
    }
    this.selectImage = this.props.selectImage.bind(this)
    this.cleanDragArea = this.props.cleanDragArea.bind(this)
  }
  componentDidMount(){
    if(this.props.idFile !== ''){
      this.setState({ImageSelectedPrevious: this.props.idFile})
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.idFile !== prevProps.idFile){
    this.setState({ImageSelectedPrevious: this.props.idFile})
    }
  }

  changeImage = (e, id) => {
    const file = e.target.files[0];
    if (file.size > 5000000) { // limite de 5 MB
      this.setState({ imageError: 'La imagen excede el límite de tamaño. Tamaño máximo 5mb'})
    } else {
      if (e.target.files[0] !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
          e.preventDefault();
          this.setState({ImageSelectedPrevious: file.name})
        };
        this.selectImage(e, id)
      }
    }
    
  };
  deleteFile = () =>{
    this.setState({
      ImageSelectedPrevious: null,
      imageError: ''
    })
    this.cleanDragArea(this.props.id)
  }
  render(){
    return (
      <div className={s.container}>
        <div>
          <br />
          <div className={s.image_upload_wrap}>
            <input
              className={s.file_upload_input}
              type="file"
              accept="image/*"
              /* multiple */
              onChange={(e) => {
                this.changeImage(e, this.props.id);
              }}
            />
            <div className={s.text_information}>
              
              {this.state.imageError.length > 0?<h3>{this.state.imageError}</h3>: <h3>{this.state.ImageSelectedPrevious !== null?
              <div className={s.fileAdded}>File {this.state.ImageSelectedPrevious} added<button onClick={() => {this.deleteFile()}}>Delete</button></div>
              : "Drag and drop a file or select add Image"}</h3>}
            </div>
          </div>
        </div >
      </div>
    );
 }
  
}

export default DragAreaJustImages;
