import { Link } from 'react-router-dom';
import LearningLayout, { CourseEnquiry } from './LearningLayout';
import { offerings, duration, LearningOffering } from '../../data/learning';

function OfferingCard({ offering }: { offering: LearningOffering }) {
  return <article className="learning-card"><p className="learning-meta">{offering.format} · {duration(offering.contactMinutes)} guided</p><h3>{offering.title}</h3><p>{offering.summary}</p><p>{offering.schedule}</p>{offering.independentMinutes > 0 && <p>{duration(offering.independentMinutes)} independent practice · {duration(offering.contactMinutes + offering.independentMinutes)} total commitment</p>}<Link to={`/learning/${offering.slug}`}>View curriculum and teaching details</Link></article>;
}
export default function CoursePathway({ pathway }: { pathway: 'mycelium' | 'canopy' }) {
  const online = pathway === 'mycelium';
  const courses = offerings.filter(offering => offering.pathway === pathway);
  return <LearningLayout title={online ? 'Mycelium — Learn Together' : 'Canopy — Practise & Steward'} intro={online ? 'Live online sessions and course bundles, with guided practice, discussion and useful feedback. Shared learning materials remain free.' : 'A proposed in-person facilitator programme for leading introductory Green Resonance activities with care, clarity and appropriate support.'}>
    {online ? <>
      <section className="learning-section" id="bundles"><h2>Online course bundles</h2><p>Build a practice over several weeks. Each bundle reuses the shared framework and free learning materials.</p><div className="learning-grid">{courses.filter(course => course.kind === 'bundle').map(offering => <OfferingCard key={offering.slug} offering={offering} />)}</div></section>
      <section className="learning-section" id="sessions"><h2>Individual session bookings</h2><p>These are standalone group sessions: book a single topic when dates are released. Each planned session includes a worksheet, guided activity and a practical next step.</p><div className="learning-grid">{courses.filter(course => course.kind === 'session').map(offering => <OfferingCard key={offering.slug} offering={offering} />)}</div></section>
      <section className="learning-panel"><h2>Optional one-to-one educational sessions</h2><p>Proposed 60-minute sessions in personal practice planning, creative event planning or community-project organisation. Agree one specific outcome before booking. Availability, facilitator and fee are not yet confirmed.</p><p>These sessions provide educational support, not therapy or unrestricted ongoing mentoring.</p></section>
      <CourseEnquiry title="Mycelium online learning or a one-to-one session" />
    </> : <>
      <section className="learning-section" id="programme"><h2>Facilitator Foundations</h2>{courses.map(offering => <OfferingCard key={offering.slug} offering={offering} />)}</section>
      <section className="learning-panel"><h2>What completion means</h2><p>This internal, non-accredited programme develops introductory facilitation skills. It is not a professional teaching qualification and does not authorise graduates to teach every specialist field.</p><p>Completion requires participation, a session plan and observed practice demonstrating clear instructions, consent, accessibility and appropriate boundaries. Supported reassessment is planned where needed. Completion records will state the hours and activities actually completed.</p></section>
      <section className="learning-panel"><h2>A shared teaching team</h2><p>An adult educator coordinates the programme, with subject specialists leading or reviewing their own modules. Proposed roles are not confirmed appointments.</p><Link to="/teaching-fields">Explore the eight teaching fields and specialist roles</Link></section>
      <CourseEnquiry title="Canopy Facilitator Foundations" />
    </>}
  </LearningLayout>;
}
