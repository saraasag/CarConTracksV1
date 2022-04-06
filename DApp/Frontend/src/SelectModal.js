import {
  Modal, ModalHeader, ModalBody, Button,
  ModalFooter, Input, Label, Row, Col,
} from 'reactstrap';

function SelectModal(props) {
  const {
    isOpen, dismiss, selectedCar,
  } = props;
  if (!isOpen) return (<div />);

  return (
    <Modal
      isOpen={Boolean(isOpen)}
      centered
      size="xl"
    >
      <ModalHeader>
        {`${selectedCar.make} ${selectedCar.model}`}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col sm="6">
            <Label>Make</Label>
            <Input
              value={selectedCar.make}
              disabled
            />
            <Label>Model</Label>
            <Input
              placeholder="Model"
              value={selectedCar.model}
              disabled
            />
            <Label>Year</Label>
            <Input
              placeholder="Year"
              type="month"
              value={selectedCar.year}
              disabled
            />
            <Label>Mileage</Label>
            <Input
              type="number"
              placeholder="Mileage"
              value={selectedCar.mileage}
              disabled
            />
          </Col>
          <Col sm="6">
            <Label>Color</Label>
            <Input
              placeholder="Color"
              type="color"
              value={selectedCar.color}
              disabled
            />
            <Label>Condition</Label>
            <Input
              placeholder="Condition"
              type="select"
              value={selectedCar.condition}
              disabled
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
              value={selectedCar.price}
              disabled
            />
            <Label>Location</Label>
            <Input
              placeholder="Location"
              type="location"
              value={selectedCar.location}
              disabled
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="info">
          Cancel
        </Button>
        <Button color="success">
          Confirm
        </Button>
        <Button color="danger" className="me-5">
          Return
        </Button>
        <Button className="ms-5" onClick={dismiss}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default SelectModal;
