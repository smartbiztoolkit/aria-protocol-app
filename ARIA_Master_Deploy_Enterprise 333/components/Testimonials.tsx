export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="font-display text-3xl mb-6">Real outcomes. Real people.</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {['The assessment nailed my patterns.','Actionable and professional.','Best investment this year.'].map((q,i)=>(
          <div key={i} className="card"><div className="text-aria-gray">“{q}”</div></div>
        ))}
      </div>
    </section>
  );
}
