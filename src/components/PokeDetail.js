// React
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function PokeDetail() {
  // -----Params:
  const { name } = useParams();

  // -----States:
  const [loading, setLoading] = useState(true);
  const [pokeDetails, setPokeDetails] = useState({});
  const [species, setSpecies] = useState({});
  const [loadSpecies, setLoadSpecies] = useState(true);

  // -----Effects:
  useEffect(() => {
    getPokemonDetail(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSpecies(); // eslint-disable-next-line
  }, [pokeDetails]);

  // -----Logic:
  async function getPokemonDetail() {
    try {
      const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
      const d = await r.json();
      setPokeDetails(d);
      setLoading(false);
    } catch (err) {
      console.log("Fetching Error: ", err);
    }
  }

  async function getSpecies() {
    const r = await fetch(pokeDetails.species.url);
    const d = await r.json();
    setSpecies(d);
    setLoadSpecies(false);
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container>
          <Row className="align-items-center my-2">
            <Col xs={12} md={10}>
              <h6 className="text-uppercase">{pokeDetails.name}</h6>
            </Col>
            <Col xs={12} md={2} className="p-2">
              <Button as={Link} to="/" variant="outline-dark">
                Back Home
              </Button>
            </Col>
          </Row>
          <Row className="bg-light my-2">
            <Col xs={12} md={8}>
              <div className="d-flex">
                <div className="d-flex flex-column mx-auto">
                  <h6>Heigth</h6>
                  <p>{pokeDetails.height}</p>
                </div>
                <div className="d-flex flex-column mx-auto">
                  <h6>Abilities</h6>
                  {pokeDetails.abilities.map((a, i) => (
                    <p key={i}>{a.ability.name}</p>
                  ))}
                </div>
                <div className="d-flex flex-column mx-auto">
                  <h6>Types</h6>
                  {pokeDetails.types.map((t, i) => (
                    <p key={i}>{t.type.name}</p>
                  ))}
                </div>
                <div className="d-flex flex-column mx-auto">
                  <h6>Weight</h6>
                  <p>{pokeDetails.weight}</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <h5>Base Stats</h5>

                {pokeDetails.stats.map((s, i) => (
                  <div
                    key={i}
                    className="border-top border-bottom border-1 d-flex justify-content-between"
                  >
                    <p>{s.stat.name}</p>
                    <p>{s.base_stat}</p>
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={12} md={4}>
              <img
                alt={pokeDetails.name}
                src={
                  pokeDetails.sprites.other["official-artwork"].front_default
                }
                className="img-fluid"
              />
            </Col>
          </Row>
          <Row className="bg-light my-2">
            <h6>Species Information</h6>
            <Col>
              <div className="d-flex flex-column">
                <h6>Name</h6>
                <p>{pokeDetails.species.name}</p>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column">
                <h6>Generation</h6>
                {loadSpecies ? <p>Loading...</p> : <p>{species.name}</p>}
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column">
                <h6>Genus</h6>
                {loadSpecies ? (
                  <p>Loading...</p>
                ) : (
                  <p>{species.genera[0].genus}</p>
                )}
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column">
                <h6>Color</h6>
                {loadSpecies ? <p>Loading...</p> : <p>{species.color.name}</p>}
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column">
                <h6>Habitat</h6>
                {loadSpecies ? (
                  <p>Loading...</p>
                ) : (
                  <p>{species.habitat.name}</p>
                )}
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column">
                <h6>Capture Rate</h6>
                {loadSpecies ? (
                  <p>Loading...</p>
                ) : (
                  <p>{species.capture_rate}</p>
                )}
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column">
                <h6>Grow Rate</h6>
                {loadSpecies ? (
                  <p>Loading...</p>
                ) : (
                  <p>{species.growth_rate.name}</p>
                )}
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column">
                <h6>Varieties</h6>
                {loadSpecies ? (
                  <p>Loading...</p>
                ) : (
                  <p className="bg-secondary rounded text-light p-2 text-center">
                    {species.varieties.map((v) => v.pokemon.name)}
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
export default PokeDetail;
