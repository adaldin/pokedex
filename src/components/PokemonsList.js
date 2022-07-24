// React
import { useState } from "react";
// Bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function PokemonsList() {
  // -----States:
  const [types, setTypes] = useState({});
  const [loadingTypes, setLoadingTypes] = useState(true);
  // -----Logic:
  function filterByName(e) {
    console.log(e);
    // const { value } = e.target;
    // const filteredNames = props.pokemons.filter((p) =>
    //   p.name.startsWith(value)
    // );
    // props.setFilteredPokemon(filteredNames);
  }
  return (
    <Container>
      <Row as={Form} className="gap-2">
        <Col xs={12}>
          <input
            placeholder="Find your pokemon"
            className="w-100"
            onChange={filterByName}
          />
        </Col>
        <Col xs={12} className="mx-auto">
          {loadingTypes ? (
            <p>Loading...</p>
          ) : (
            types.map((type, i) => (
              <Button
                className="me-2 mb-2"
                variant="outline-dark"
                key={i}
                name={type}
              >
                {type.name}
              </Button>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default PokemonsList;
