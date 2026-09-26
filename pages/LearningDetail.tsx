import { Link, useParams } from 'react-router-dom';
import LearningLayout, { CourseEnquiry } from '../components/learning/LearningLayout';
import { duration, offerings, teachingFields } from '../data/learning';
import NotFound from './NotFound';

export default function LearningDetail() {
  const { slug } = useParams();
  const course = offerings.find(item => item.slug === slug);
  if (!course) return <NotFound />;
  return <LearningLayout title={course.title} intro={course.summary}>
    <Link to={`/${course.pathway}-membership`}>Back to {course.pathway === 'mycelium' ? 'Mycelium' : 'Canopy'}</Link>
    <dl className="learning-facts"><div><dt>Guided teaching</dt><dd>{duration(course.contactMinutes)}</dd></div><div><dt>Independent practice</dt><dd>{course.independentMinutes ? duration(course.independentMinutes) : 'Optional; no set hours'}</dd></div><div><dt>Total planned commitment</dt><dd>{duration(course.contactMinutes + course.independentMinutes)}</dd></div></dl>
    <section className="learning-panel"><h2>Format and proposed hours</h2><p>{course.format}</p><p>{course.schedule}</p><p>Facilitator: to be confirmed. Fee and currency: to be confirmed for this specific offering. No recurring membership payment is required.</p></section>
    <section className="learning-section"><h2>Course content and outcomes</h2><div className="learning-grid">{course.modules.map(module => <article className="learning-card" key={module.title}><h3>{module.title}</h3><p>{module.content}</p><p><strong>You leave with:</strong> {module.outcome}</p></article>)}</div></section>
    {course.kind === 'programme' && <section className="learning-panel"><h2>Preparation and completion</h2><ul><li>Two hours exploring the free framework and completing reflection tasks.</li><li>Two hours preparing a 20-minute teaching activity.</li><li>Two hours revising the activity after feedback.</li></ul><p>Participation, a session plan and an observed practice session are required. Assessment covers clear instructions, consent, accessibility and boundaries, with supported reassessment where needed.</p><p>This is an internal, non-accredited programme. A completion record documents completed hours and activities; it is not a professional qualification or blanket permission to teach specialist subjects.</p></section>}
    {course.kind === 'session' && course.contactMinutes === 90 && <section className="learning-panel"><h2>A proposed session structure</h2><p>10 minutes arrival, 20 minutes teaching, 30 minutes practice including a short pause, 20 minutes discussion and 10 minutes action planning.</p></section>}
    <section className="learning-section"><h2>Specialist teaching support</h2><p>Roles to recruit or confirm for this offering:</p><ul>{course.fields.map(id => { const field = teachingFields.find(item => item.id === id)!; return <li key={id}><Link to={`/teaching-fields#field-${id}`}>{field.name}</Link> — {field.specialist}</li>; })}</ul></section>
    <section className="learning-panel"><h2>Participation and access</h2><p>There is no paid-tier prerequisite. Any genuine skill prerequisite will be stated before booking opens. Activities should allow choice, breaks and accessible alternatives; movement is optional. Ask about specific access needs before committing.</p><p>Learning materials stay free. Personal discussions, individual feedback and private recordings are not public resources. No recording or sharing of participant contributions is assumed.</p><p>Before bookings open, each offering will state its facilitator, dates, time zone, capacity, access arrangements, exact fee and currency, inclusions, and cancellation terms. No place or concession is guaranteed at this stage.</p></section>
    <CourseEnquiry title={course.title} />
  </LearningLayout>;
}
