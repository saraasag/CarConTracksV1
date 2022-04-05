import {
  Modal, ModalHeader, ModalBody, Button,
  ModalFooter, Input, Label, Row, Col,
} from 'reactstrap';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const carTemplate = {
  id: '',
  make: '',
  model: '',
  year: '',
  mileage: 0,
  color: '',
  condition: '',
  price: 0,
  location: '',
  ownerId: '',
  rentedBy: '',
};

function CarModal(props) {
  const {
    isOpen, dismiss, onSubmit, user,
  } = props;
  if (!isOpen) return (<div />);
  const [data, setData] = useState({ ...carTemplate, id: uuidv4().slice(0, 8), ownerId: user.id });
  const onChange = (key, val) => setData((prev) => ({ ...prev, [key]: val }));
  return (
    <Modal
      isOpen={Boolean(isOpen)}
      size="xl"
      scrollable
      centered
    >
      <ModalHeader>
        Rent your car!
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col sm="6">
            <Label>Make</Label>
            <Input
              placeholder="Make"
              onChange={(e) => onChange('make', e.target.value)}
            />
            <Label>Model</Label>
            <Input
              placeholder="Model"
              onChange={(e) => onChange('model', e.target.value)}
            />
            <Label>Year</Label>
            <Input
              placeholder="Year"
              type="month"
              onChange={(e) => onChange('year', e.target.value)}
            />
            <Label>Mileage</Label>
            <Input
              type="number"
              placeholder="Mileage"
              onChange={(e) => onChange('mileage', e.target.value)}
            />
          </Col>
          <Col sm="6">
            <Label>Color</Label>
            <Input
              placeholder="Color"
              type="color"
              onChange={(e) => onChange('color', e.target.value)}
            />
            <Label>Condition</Label>
            <Input
              placeholder="Condition"
              type="select"
              onChange={(e) => onChange('condition', e.target.value)}
            >
              <option value="Like New">
                Like New
              </option>
              <option value="Great">
                Great
              </option>
              <option value="Good">
                Good
              </option>
              <option value="Acceptable">
                Acceptable
              </option>
            </Input>
            <Label>Price</Label>
            <Input
              placeholder="Price"
              type="number"
              onChange={(e) => onChange('price', e.target.value)}
            />
            <Label>Location</Label>
            <Input
              placeholder="Location"
              type="location"
              onChange={(e) => onChange('location', e.target.value)}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => { onSubmit(data); dismiss(); }}
        >
          Submit
        </Button>
        {' '}
        <Button onClick={dismiss}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CarModal;
