import { Link } from 'react-router-dom';
import PhoenixSigil from '../components/PhoenixSigil';
export default function NotFound() {
  return <section className="section-padding pt-40 text-center container-sacred">
    <div className="flex justify-center" aria-hidden="true"><PhoenixSigil /></div>
    <h1 className="text-3xl font-display my-6">This path needs a little tending.</h1>
    <p className="text-base mb-8">We couldn’t find that page. Explore the framework or return to the garden.</p>
    <div className="flex flex-wrap justify-center gap-6">
      <Link className="underline" to="/framework">Explore the framework</Link>
      <Link className="underline" to="/garden">Visit the garden</Link>
      <Link className="underline" to="/contact">Report a broken link</Link>
    </div>
  </section>;
}
