import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Jumbotron, Container, Row, Col, Form, Table } from 'react-bootstrap';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      showContent: 0,
      carYear: "",
      carMake: "",
      carModel: "",
      serverResponse: [] 
    }
    this.handleButtonExpand = this.handleButtonExpand.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    handleButtonExpand(){
      console.log("Render Form");
      if(this.state.showContent === 0){
        console.log("Yes");
        this.setState({showContent: 1});
      }
      else{
        this.setState({showContent: 0});
      }
      console.log(this.state.showContent);
    }

    handleFormSubmission(e){
      e.preventDefault();
      axios.post('http://10.0.0.146:8020/cars/findParts/', {'year': this.state.carYear, 'make': this.state.carMake, 'model': this.state.carModel}).then(function(response){this.setState({serverResponse: response.data}); console.log(this.state.serverResponse[0]); this.setState({showContent: 2});}.bind(this));

    }

    handleChange(e){
      this.setState({[e.target.name]: e.target.value });
    }

  render(){

    const showContent = this.state.showContent;
    let content;

    if(showContent === 1){
      content = (
        <div id="car-form">
          <h3>Find your Car</h3>
          <Form className="pt-5" onSubmit={this.handleFormSubmission}>
          <Form.Group as={Row} controlId='formGroupYear'>
              <Form.Label column sm={3}>Vehicle Year:</Form.Label>
              <Col sm={7}>
                <Form.Control name="carYear" onChange={this.handleChange} type="text"></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='formGroupMake'>
              <Form.Label column sm={3}>Vehicle Make:</Form.Label>
              <Col sm={7}>
                <Form.Control name="carMake" onChange={this.handleChange} type="text"></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='formGroupModel'>
              <Form.Label column sm={3}>Vehicle Model:</Form.Label>
              <Col sm={7}>
                <Form.Control name="carModel" onChange={this.handleChange} type="text"></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='submit'>
              <Col className="text-center pt-5">
                <Button type="submit">Find Parts</Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      );
    }

    if(showContent === 2){

      var serverData = this.state.serverResponse;
      var Brakes = JSON.parse(serverData[0]);
      var Tires = JSON.parse(serverData[1]);
      var Headlights = JSON.parse(serverData[2]);
      var WindshieldWipers = JSON.parse(serverData[3]);
      var Transmission = JSON.parse(serverData[4]);
      var Engine = JSON.parse(serverData[5]);
      var Battery = JSON.parse(serverData[6]);
      var Axle = JSON.parse(serverData[7]);

      content = (
        <div id="car-results">
          <h3>Parts for your: {this.state.carYear + ' ' + this.state.carMake + ' ' + this.state.carModel}</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Store Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Brakes.item_name}</td>
                <td>{Brakes.item_price}</td>
                <td><a href={Brakes.store_link}>Here</a></td>
              </tr>
              <tr>
                <td>{Tires.item_name}</td>
                <td>{Tires.item_price}</td>
                <td><a href={Tires.store_link}>Here</a></td>
              </tr>
              <tr>
                <td>{Headlights.item_name}</td>
                <td>{Headlights.item_price}</td>
                <td><a href={Headlights.store_link}>Here</a></td>
              </tr>
              <tr>
                <td>{WindshieldWipers.item_name}</td>
                <td>{WindshieldWipers.item_price}</td>
                <td><a href={WindshieldWipers.store_link}>Here</a></td>
              </tr>
              <tr>
                <td>{Transmission.item_name}</td>
                <td>{Transmission.item_price}</td>
                <td><a href={Transmission.store_link}>Here</a></td>
              </tr>
              <tr>
                <td>{Engine.item_name}</td>
                <td>{Engine.item_price}</td>
                <td><a href={Engine.store_link}>Here</a></td>
              </tr>
              <tr>
                <td>{Battery.item_name}</td>
                <td>{Battery.item_price}</td>
                <td><a href={Battery.store_link}>Here</a></td>
              </tr>
              <tr>
                <td>{Axle.item_name}</td>
                <td>{Axle.item_price}</td>
                <td><a href={Axle.store_link}>Here</a></td>
              </tr>
            </tbody>
          </Table>
        </div>
      )
    }

    return(
      <div id="Containment">
        <Navbar bg="dark">
          <Navbar.Brand style={{color: "white"}}>Cheapest Car Parts</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col className="text-center pt-5">
              <h1>Find Parts For Your Car</h1>
              <p>Use this site for sourcing the least expensive parts for your vehicle, to get going on the road fastest.</p>
            </Col>
          </Row>
          <Row>
            <Col className="text-center pt-5">
              <Button variant="primary" onClick={this.handleButtonExpand}>Find your Car</Button>
            </Col>
          </Row>
          <Row>
            <Col className="text-center pt-5">{content}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
