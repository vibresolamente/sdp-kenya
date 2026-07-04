export default function Manifesto() {
  return (
    <section id="manifesto" className="content-padding">
        <div className="container">
            <div className="manifesto-header text-center">
                <h1>The SDP Plan: Actionable Policy for <span className="animated-accent">CHANGE - MAGEUZI</span></h1>
                <p className="lead">The Social Democratic Party of Kenya (SDP) is committed to policy, not promises. Our roadmap for comprehensive national reform.</p>
            </div>

            <div className="manifesto-details bg-surface" style={{ padding: '40px', borderRadius: '8px' }}>
                
                {/* Pillar 1 */}
                <div className="pillar-detail-block">
                    <h2>1. Economic Justice & Opportunity</h2>
                    <p>Restructure the economy to ensure fair wages and sustainable growth for all.</p>
                    <h3 className="mt-5">Key Action Points:</h3>
                    <ul className="action-points">
                        <li>**Investment in Decentralization:** Redirecting specific national funds directly to County-level development projects.</li>
                        <li>**SME Tax Relief:** Introducing a tiered tax incentive program for Small and Medium Enterprises (SMEs).</li>
                        <li>**Fair Wage Reform:** Establishing a national minimum wage benchmark tied to the actual cost of living.</li>
                    </ul>
                </div>
                
                {/* Pillar 2 */}
                <div className="pillar-detail-block">
                    <h2>2. Accountable Governance</h2>
                    <p>Zero tolerance for corruption. We will strengthen independent institutions and enforce fiscal transparency.</p>
                    <h3 className="mt-5">Key Action Points:</h3>
                    <ul className="action-points">
                        <li>**Independent Anti-Graft Body:** Ensuring the Ethics and Anti-Corruption Commission (EACC) has full prosecutorial powers.</li>
                        <li>**Asset Declaration Transparency:** Making mandatory public declaration of assets for all senior public servants.</li>
                        <li>**Citizen Oversight:** Establishing digital platforms for real-time tracking of government expenditure.</li>
                    </ul>
                </div>
                
                {/* Pillar 3 */}
                <div className="pillar-detail-block">
                    <h2>3. Universal Quality Healthcare</h2>
                    <p>Guarantee equitable access to comprehensive, high-quality medical services for every citizen.</p>
                    <h3 className="mt-5">Key Action Points:</h3>
                    <ul className="action-points">
                        <li>**County Health Infrastructure Boost:** Allocating specific national budget percentages solely for county health facility upgrades.</li>
                        <li>**Medicine Procurement Reform:** Centralizing procurement to reduce costs and eliminate shortages.</li>
                    </ul>
                </div>

                {/* Pillar 4 */}
                <div className="pillar-detail-block">
                    <h2>4. Future-Ready Education & Skills</h2>
                    <p>Investing heavily in curriculum reform and digital literacy to equip the youth for the global economy.</p>
                    <h3 className="mt-5">Key Action Points:</h3>
                    <ul className="action-points">
                        <li>**Digital Literacy Mandate:** Integrating coding and digital skills into primary and secondary education.</li>
                        <li>**TVET Subsidies:** Increasing state subsidy for technical and vocational training programs.</li>
                    </ul>
                </div>
                
                {/* Pillar 5 */}
                <div className="pillar-detail-block">
                    <h2>5. Sustainable Development & Climate Action</h2>
                    <p>Championing environmental stewardship and securing a healthy planet for future generations.</p>
                    <h3 className="mt-5">Key Action Points:</h3>
                    <ul className="action-points">
                        <li>**Green Energy Transition:** Fast-tracking renewable energy projects (solar, geothermal).</li>
                        <li>**Water Security Plan:** Implementing national rainwater harvesting and conservation policies.</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  );
}
