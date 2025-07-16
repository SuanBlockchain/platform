import React, { Component } from 'react'
//Bootstrap
import {  Button,Form, Col, Table, Spinner} from 'react-bootstrap'

export default class CRUDProductImages extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleChangeProductImageProperty = this.props.handleChangeProductImageProperty.bind(this)
    }
  render() {
    let {CRUD_Product, isImageUploadingFile, urlS3Image} = this.props

    const renderCRUDProductImages = () => {
        return (
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Cargar</th>
                    <th>Imagen</th>
                    <th>URL</th>
                    <th>Titulo</th>
                    <th>Orden</th>
                    <th>¿Está On Carouse?l</th>
                    <th>Etiqueta Carrusel</th>
                    <th>Carousel Descripción </th>
                </tr>
                </thead>
                <tbody>
                {CRUD_Product.images.map(image => (
                    <tr key={image.id}>
                        <td>
                            <Form.Group controlId='formFile' className='mb-3'>
                                <Form.Control type='file' onChange={(e) => this.handleChangeProductImageProperty(e, image, 'carouselImage')} />
                            </Form.Group>
                            {renderIsisImageUploadingFile()}
                        </td>
                        <td>
                            {renderProductImage(image)}
                        </td>
                        <td>
                            {image.imageURL}
                        </td>
                        <td>
                            <Form.Group as={Col} controlId='formGridNewProductImageTitle'>
                                <Form.Control
                                    type='text'
                                    placeholder='Ex. Cats'
                                    name='newProductImageTitle'
                                    value={image.title}
                                    onChange={(e) => this.handleChangeProductImageProperty(e, image, 'newProductImageTitle')} />
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group as={Col} controlId='formGridNewProductImageOrder'>
                                <Form.Control
                                    type='number'
                                    placeholder='Ex. 1'
                                    name='newProductImageOrder'
                                    value={image.order}
                                    onChange={(e) => this.handleChangeProductImageProperty(e, image, 'newProductImageOrder')} />
                            </Form.Group>
                        </td>
                        <td>
                            <Form.Group as={Col} controlId='formGridCRUD_ProductIsOnCarousel'>
                                <Button 
                                    variant='primary'
                                    size='lg' 
                                     
                                    onClick={(e) => this.handleChangeProductImageProperty(e, image, 'isOnCarousel')}
                                >{image.isOnCarousel? 'YES' : 'NO'}</Button>
                            </Form.Group>
                        </td>
                        <td>
                            {renderCarouselLabelForm(image)}
                        </td>
                        <td>
                            {renderCarouselDescriptionForm(image)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
        
    }
    const renderIsisImageUploadingFile = () => {
        if (this.state.isImageUploadingFile) {
            return (
                <Spinner animation='border' variant='primary' />
            )
        }
    
    }
    const renderProductImage = (pImage) => {
        if (pImage.imageURL !== '' && !isImageUploadingFile) {
            return (
                <img
                    src={urlS3Image+pImage.imageURL}
                    alt={pImage.id}
                    height={100}
                    width={100}
                />
            )
        } else {
            <p>N/A</p>
        }
    }
    const renderCarouselLabelForm = (pImage) => {
        if (pImage.isOnCarousel) {
            return (
                <Form.Group as={Col} controlId='formGridCarouselLabel'>
                    <Form.Control
                        type='text'
                        placeholder='Ex. lorem ipsum label'
                        name='carouselLabel'
                        value={pImage.carouselLabel}
                        onChange={(e) => this.handleChangeProductImageProperty(e, pImage,'carouselLabel')} />
                </Form.Group>
            )
        }
    }
    const renderCarouselDescriptionForm = (pImage) => {
        if (pImage.isOnCarousel) {
            return (
                <Form.Group as={Col} controlId='formGridCarouselDescription'>
                    <Form.Control
                        type='text'
                        placeholder='Ex. lorem ipsum description'
                        name='carouselDescription'
                        value={pImage.carouselDescription}
                        onChange={(e) => this.handleChangeProductImageProperty(e,pImage,'carouselDescription')} />
                </Form.Group>
            )
        }
    }

    return (
      <>
        {renderCRUDProductImages()}
      </>
    )
  }
}
