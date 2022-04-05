import {
  Table,
  Button,
} from 'reactstrap';

function CarList(props) {
  const {
    list = [], setModal, user, setSelectedCar,
  } = props;
  return (
    <Table striped responsive className="mt-3">
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            ID
          </th>
          <th>
            Make
          </th>
          <th>
            Model
          </th>
          <th>
            Year
          </th>
          <th>
            Mileage
          </th>
          <th>
            Color
          </th>
          <th>
            Condition
          </th>
          <th>
            Price
          </th>
          <th>
            Location
          </th>
          <th>
            OwnerId
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <tr key={`${item.make}-${item.email}`}>
            <th scope="row">
              {index + 1}
            </th>
            <td>
              <Button
                style={{ paddingTop: 0, borderTop: 0 }}
                color="link"
                onClick={() => { setModal(user ? 'select_car' : 'user'); setSelectedCar(item); }}
              >
                {item.id}
              </Button>
            </td>
            <td>
              {item.make}
            </td>
            <td>
              {item.model}
            </td>
            <td>
              {item.year}
            </td>
            <td>
              {item.mileage}
            </td>
            <td>
              <span style={{ backgroundColor: item.color }}>
                {item.color}
              </span>
            </td>
            <td>
              {item.condition}
            </td>
            <td>
              {`${item.price}$`}
            </td>
            <td>
              {item.location}
            </td>
            <td>
              {item.ownerId}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CarList;
