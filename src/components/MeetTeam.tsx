import ImagePlaceholder from "./ImagePlaceholder";

const teamMembers = [
  { name: "Dr. Elena Vasquez", role: "Lead Practitioner", credentials: "MD · IFM Certified Practitioner", image: "/images/team_dr_elena_1772491726653.png" },
  { name: "Dr. Marcus Chen", role: "Hormones & Longevity", credentials: "MD · Board Certified, Anti-Aging Medicine", image: "/images/team_dr_marcus_1772491740108.png" },
  { name: "Dr. Amara Okafor", role: "Gut Health Specialist", credentials: "ND · Certified Functional Medicine Practitioner", image: "/images/team_dr_amara_1772491753632.png" },
];

const MeetTeam = () => {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <ImagePlaceholder
            label="[IMAGE: Team — Lead practitioner portrait, warm editorial]"
            aspectRatio="portrait"
            className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl"
            src="/images/about_hero_1772491814312.png"
          />
          <div className="meet-team-text-panel space-y-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">Meet Your Team</p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              We don't just treat symptoms.
              <br />
              <span className="italic">We listen to your story.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our team of board-certified functional medicine practitioners has collectively helped over 4,200 patients
              reclaim their health. We combine cutting-edge diagnostics with deep clinical intuition — because your body
              deserves more than a 15-minute appointment and a prescription.
            </p>
            <p className="meet-team-pull-quote">
              "We spend 90 minutes with every patient. The average doctor spends 7."
            </p>
            <div className="flex gap-6">
              <div>
                <p className="font-mono text-2xl font-semibold text-accent">15+</p>
                <p className="text-xs text-muted-foreground">Years experience</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold text-accent">4,200+</p>
                <p className="text-xs text-muted-foreground">Patients helped</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold text-accent">80+</p>
                <p className="text-xs text-muted-foreground">Biomarkers tested</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary team */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((m) => (
            <div key={m.name} className="text-center">
              <ImagePlaceholder
                label={`[IMAGE: Team member photo — ${m.name}]`}
                aspectRatio="portrait"
                className="practitioner-image w-full max-w-[280px] mx-auto rounded-2xl mb-4"
                src={m.image}
              />
              <h3 className="font-display text-lg font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm text-muted-foreground font-mono">{m.role}</p>
              <p className="text-xs text-muted-foreground/60 mt-0.5">{m.credentials}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTeam;
