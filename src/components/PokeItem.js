import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import CardImg from "react-bootstrap/esm/CardImg";

function PokeItem(props) {
  // -----States:
  const [img, setImg] = useState("");
  useEffect(() => {
    // -----Effect:
    getSinglePokemon(); // eslint-disable-next-line
  }, [props.pokemon]);

  // -----Logic:
  async function getSinglePokemon() {
    try {
      const r = await fetch(`${props.pokemon.url}`);
      const d = await r.json();
      setImg(d.sprites.front_default);
    } catch (err) {
      console.log("Server Error: ", err);
    }
  }
  return (
    <Card className="shadow">
      <CardHeader className="bg-light text-center text-uppercase">
        {props.pokemon.name}
      </CardHeader>
      <CardImg
        variant="bottom"
        src={img}
        style={{ width: "100px" }}
        className="rounded mx-auto d-block"
      ></CardImg>
    </Card>
  );
}
export default PokeItem;
