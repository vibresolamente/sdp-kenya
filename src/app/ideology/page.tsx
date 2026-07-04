export default function Ideology() {
  return (
    <section className="content-padding">
        <div className="container">
            <div className="manifesto-header text-center">
                <h1>Statement of <span className="animated-accent">Ideology</span></h1>
                <p className="lead">The fundamental principles and core values driving the Social Democratic Party of Kenya.</p>
            </div>

            <div className="manifesto-details bg-surface" style={{ padding: '40px', borderRadius: '8px' }}>
                <div className="pillar-detail-block" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
                    <h2>Our Core Beliefs</h2>
                    <p>At the Social Democratic Party (SDP) of Kenya, we are driven by the unshakeable belief that a just society is one that guarantees equal opportunity, economic equity, and unwavering democratic integrity for all its citizens.</p>
                    
                    <h3 className="mt-5">Social Democracy in the Kenyan Context</h3>
                    <p>We advocate for a strong, accountable state that works in tandem with a regulated, vibrant market economy. We reject crony capitalism and extreme centralization. Instead, we champion a system where wealth is created responsibly and distributed fairly to ensure a dignified life for every Kenyan.</p>
                    
                    <h3 className="mt-5">Guiding Principles</h3>
                    <ul className="action-points">
                        <li><strong>Integrity:</strong> Uncompromising ethical standards in public service and governance.</li>
                        <li><strong>Solidarity:</strong> Standing together to protect the most vulnerable in our society through comprehensive social welfare.</li>
                        <li><strong>Freedom:</strong> Defending fundamental human rights, freedom of speech, and the rule of law.</li>
                        <li><strong>Equality:</strong> Eradicating discrimination and systemic barriers based on gender, ethnicity, or socioeconomic background.</li>
                        <li><strong>Sustainability:</strong> Pursuing economic growth that respects and preserves our natural environment for future generations.</li>
                    </ul>

                    <div className="official-record mt-5">
                        <p><strong>Note:</strong> This is a summary of our ideological framework. For the full, formalized ideological treatise, please consult our official party documents.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
