// React
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// Components
import PokeItem from "./PokeItem";

function PokemonsList() {
  // -----States:
  const [types, setTypes] = useState({});
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([...pokemons]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  // -----Effects:
  useEffect(() => {
    getPokemons(); // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    getTypes();
  }, []);

  // -----Logic:
  async function getPokemons() {
    try {
      const r = await fetch(url);
      const d = await r.json();
      setPokemons(d.results);
      setNext(d.next);
      setPrev(d.previous);
    } catch (err) {
      console.log("Server failed: ", err);
    }
  }

  async function handleNextPrev(event) {
    const { name } = await event.target;
    if (name === "prevBtn") {
      prev !== null ? setUrl(prev) : console.log("Pokemons beggining");
    } else if (name === "nextBtn") {
      next !== null ? setUrl(next) : console.log("Pokemons end");
    }
  }

  async function getTypes() {
    const r = await fetch(" https://pokeapi.co/api/v2/type/");
    const d = await r.json();
    setTypes(d.results);
    setLoadingTypes(false);
  }

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
      <Row className=" justify-content-center align-items-center my-4">
        {pokemons.map((pokemon, index) => (
          <Col
            as={Link}
            to={`/${pokemon.name}`}
            key={index}
            className="p-3 text-decoration-none text-dark"
            xs={6}
            md={2}
          >
            <PokeItem pokemon={pokemon} />
          </Col>
        ))}
      </Row>
      <Row>
        <div className="d-flex gap-2 p-2 justify-content-center">
          <Button
            variant="outline-dark"
            name="prevBtn"
            onClick={handleNextPrev}
          >
            Prev
          </Button>
          <Button
            variant="outline-dark"
            name="nextBtn"
            onClick={handleNextPrev}
          >
            Next
          </Button>
        </div>
      </Row>
    </Container>
  );
}
export default PokemonsList;
