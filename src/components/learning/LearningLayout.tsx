import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { enquiryEmail, enquiryHref, learningPolicy } from '../../data/learning';
import './learning.css';

export default function LearningLayout({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <div className="learning-page">
    <nav aria-label="Learning pathways" className="learning-nav">
      <Link to="/seed-membership">Seed · Free resources</Link>
      <Link to="/mycelium-membership">Mycelium · Online learning</Link>
      <Link to="/canopy-membership">Canopy · Facilitator programme</Link>
      <Link to="/teaching-fields">Teaching fields & specialists</Link>
    </nav>
    <header className="learning-header"><p className="learning-eyebrow">MUSEschool · Ways to participate</p><h1>{title}</h1><p>{intro}</p></header>
    <aside className="learning-notice" aria-label="Course availability"><strong>Expressions of interest · Proposed curriculum</strong><p>Teaching hours are planned learning time, not confirmed availability. Dates, facilitators, venues, accessibility arrangements and fees are being prepared. Bookings and payments are not open.</p></aside>
    {children}
    <section className="learning-panel"><h2>One community, equal access</h2><p>{learningPolicy}</p><p>Published workbooks, Codex, Oracle, maps and self-guided practices remain free. Optional classes pay for teaching time, feedback, materials and space. They do not confer higher community status or unlock shared knowledge. You do not need to buy one pathway before exploring another.</p><Link to="/resources">Explore the free resources</Link></section>
  </div>;
}
export function CourseEnquiry({ title }: { title: string }) {
  return <section className="learning-panel" id="express-interest"><h2>Express interest</h2><p>Ask about {title}, preferred times and access arrangements. An enquiry does not reserve a place, start a subscription or add you to a mailing list.</p><a className="learning-button" href={enquiryHref(title)}>Open email enquiry</a><p className="learning-small">This opens your email app. Alternatively, email <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a> and include the course title. Share only the personal information you wish to discuss.</p></section>;
}
