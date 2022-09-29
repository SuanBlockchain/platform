import React, { Component } from 'react';
// Amplify
import { withAuthenticator } from '@aws-amplify/ui-react'
// import '@aws-amplify/ui-react/styles.css'
// Bootstrap
import { Container, Button, Form, Row, Col, Table } from 'react-bootstrap'
// Auth css custom
import Bootstrap from "../../common/themes"
// GraphQL
import { API, graphqlOperation } from 'aws-amplify'
import { listFormulas, listFeatures } from '../../../graphql/queries'
import { createFormula, updateFormula } from '../../../graphql/mutations'
import { onCreateFormula, onUpdateFormula } from '../../../graphql/subscriptions'
import { v4 as uuidv4 } from 'uuid'

class Formulas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formulas: [],
            features:[],
            CRUDButtonName: 'CREATE',
            isCRUDButtonDisable: true,
            newFormula: {   
                            id: uuidv4().replaceAll('-','_'),
                            varID: '',
                            equation: '',
                            featureID: '',
                            unitOfMeasureID: ''
                        },
        }
        this.handleOnChangeInputForm = this.handleOnChangeInputForm.bind(this)
        this.handleCRUDFormula = this.handleCRUDFormula.bind(this)
        this.handleLoadEditFormula = this.handleLoadEditFormula.bind(this)
    }

    componentDidMount = async () => {
        await this.loadFormulas()
        await this.loadFeatures()

        // Subscriptions
        // OnCreate Formula
        let tempFormulas = this.state.formulas
        this.createFormulaListener = API.graphql(graphqlOperation(onCreateFormula))
        .subscribe({
            next: createdFormulaData => {
                let tempOnCreateFormula = createdFormulaData.value.data.onCreateFormula
                tempFormulas.push(tempOnCreateFormula)
                // Ordering categorys by name
                tempFormulas.sort((a, b) => (a.name > b.name) ? 1 : -1)
                // this.updateStateCategorys(tempCategorys)
                this.setState((state) => ({formulas: tempFormulas}))
            }
        })

        // OnUpdate Formula
        this.updateFormulaListener = API.graphql(graphqlOperation(onUpdateFormula))
        .subscribe({
            next: updatedFormulaData => {
                let tempFormulas = this.state.formulas.map((mapFormula) => {
                    if (updatedFormulaData.value.data.onUpdateFormula.id === mapFormula.id) {
                        return updatedFormulaData.value.data.onUpdateFormula
                    } else {
                        return mapFormula
                    }
                })
                // Ordering categorys by name
                tempFormulas.sort((a, b) => (a.name > b.name) ? 1 : -1)
                this.setState((state) => ({formulas: tempFormulas}))
            }
        })

    }

    async loadFormulas() {
        const listFormulasResult = await API.graphql(graphqlOperation(listFormulas))
        listFormulasResult.data.listFormulas.items.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.setState({formulas: listFormulasResult.data.listFormulas.items})
    }
    async loadFeatures() {
        const listFeaturesResult = await API.graphql(graphqlOperation(listFeatures))
        listFeaturesResult.data.listFeatures.items.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.setState({features: listFeaturesResult.data.listFeatures.items})
        }


    handleOnChangeInputForm = async(event) => {
        let tempNewFormula = this.state.newFormula
        if (event.target.name === 'formula.varID') {
            tempNewFormula.varID = event.target.value
        }
        if (event.target.name === 'formula.equation') {
            tempNewFormula.equation = event.target.value
        }
        if (event.target.name === 'formula.featureID') {
            tempNewFormula.featureID = event.target.value
            let auxUOM = this.state.features.filter(f => f.id === event.target.value)
            tempNewFormula.unitOfMeasureID = auxUOM[0].unitOfMeasureID
        }
        
        this.setState({newFormula: tempNewFormula})
        console.log(this.state.newFormula)
        this.validateCRUDFormula()
        
    }

    async validateCRUDFormula() {
        if (this.state.newFormula.id !== '' &&
            this.state.newFormula.varID !== '' &&
            this.state.newFormula.equation !== '' &&
            this.state.newFormula.featureID !== '') {

            this.setState({isCRUDButtonDisable: false})
        }
    }
    
    async handleCRUDFormula() {
        console.log('handleCRUDFormula')
        let tempNewFormula = this.state.newFormula

        if (this.state.CRUDButtonName === 'CREATE') {
            
            if(tempNewFormula.unitOfMeasureID === undefined ){
                tempNewFormula.unitOfMeasureID = ''
            }

            await API.graphql(graphqlOperation(createFormula, { input: tempNewFormula }))
            await this.cleanFormulaOnCreate()
        }

        if (this.state.CRUDButtonName === 'UPDATE') {
            delete tempNewFormula.createdAt
            delete tempNewFormula.updatedAt
            delete tempNewFormula.results
            delete tempNewFormula.unitOfMeasure
            delete tempNewFormula.feature
            await API.graphql(graphqlOperation(updateFormula, { input: this.state.newFormula }))
            await this.cleanFormulaOnCreate()
        }
    }
    

    handleLoadEditFormula= async(formula, event) => {

        this.setState({
            newFormula:  formula,
            CRUDButtonName: 'UPDATE',
            isCRUDButtonDisable: false
        })
        this.validateCRUDFormula()
    }

    async cleanFormulaOnCreate() {
         this.setState({
            CRUDButtonName: 'CREATE',
            isCRUDButtonDisable: true,
            newFormula: {   
                id: uuidv4().replaceAll('-','_'),
                varID: '',
                equation: '',
                featureID: '',
                unitOfMeasureID: ''
            },
        })
    }
    
    // RENDER
    render() {
        // State Varibles
        let {formulas, newFormula, CRUDButtonName} = this.state

        const renderFormulas = () => {
            if (formulas.length > 0) {
                return (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Variable ID</th>
                            <th>Equation</th>
                            <th>Feature ID</th>
                            <th>Unit of Measure ID</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {formulas.map(formula => (
                            <tr key={formula.id}>

                                <td>
                                    {formula.varID}
                                </td>
                                <td>
                                    {formula.equation}
                                </td>
                                <td>
                                    {formula.featureID}
                                </td>
                                <td>
                                    {formula.unitOfMeasure.engineeringUnit}
                                </td>
                                <td>
                                    <Button 
                                        variant='primary'
                                        size='lg' 
                                         
                                        onClick={(e) => this.handleLoadEditFormula(formula, e)}
                                    >Editar</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )
            }
        
        }


        return (
            
            <Container>
                {renderFormulas()}
                <br></br>
                <h2>{CRUDButtonName} Formula: {newFormula.name}</h2>
                <Form>
                    <Row className='mb-2'>
                        <Form.Group as={Col} controlId='formGridNewCategoryName'>
                            <Form.Label>Variable ID</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                name='formula.varID'
                                value={newFormula.varID}
                                onChange={(e) => this.handleOnChangeInputForm(e)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId='formGridNewCategoryName'>
                            <Form.Label>Equation</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ex. ANIMALS'
                                name='formula.equation'
                                value={newFormula.equation}
                                onChange={(e) => this.handleOnChangeInputForm(e)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId='formGridNewCategoryName'>
                            <Form.Label>Feature</Form.Label>
                            <Form.Select 
                                name='formula.featureID'
                                onChange={(e) => this.handleOnChangeInputForm(e)}>
                                    <option>-</option>
                                    {this.state.features.map((features, idx) => (<option value={features.id} key={idx}>{features.name}</option>))}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className='mb-1'>
                        <Button
                        variant='primary'
                         
                        onClick={this.handleCRUDFormula}
                        disabled={this.state.isCRUDButtonDisable}
                        >{CRUDButtonName}</Button>
                    </Row>
                </Form>

            </Container>
        
        )
    }
}

export default withAuthenticator(Formulas, {
    theme: Bootstrap,
    includeGreetings: true,
    signUpConfig: {
        hiddenDefaults: ['phone_number'],
        signUpFields: [
        { label: 'Name', key: 'name', required: true, type: 'string' }
    ]
}})
