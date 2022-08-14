import { Pagination, Container } from 'react-bootstrap';
import { render } from 'react-dom';


function PaginationAttendance() {
  return (
    <Container className="d-flex justify-content-center">
      <Pagination size="sm">
        <Pagination.First disabled />
        <Pagination.Prev disabled />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item >{2}</Pagination.Item>
        <Pagination.Item >{3}</Pagination.Item>
        <Pagination.Item >{4}</Pagination.Item>
        <Pagination.Item >{5}</Pagination.Item>
        <Pagination.Ellipsis disabled />
        <Pagination.Item >{11}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Container >
  );
}

export default PaginationAttendance;