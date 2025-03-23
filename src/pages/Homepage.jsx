import { Link } from "react-router";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <div>
      <PageNav/>
      <h1>Worlwise</h1>
      <Link to="/pricing">Pricing</Link>
    </div>
  )
}