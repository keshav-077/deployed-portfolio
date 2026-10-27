import { useScrollReveal } from '@/hooks/useScrollReveal';
import { experience } from '@/data/experience';
import { sortByDate } from '@/lib/sortByDate';
import OrgLogo from './OrgLogo';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const formatMonth = (value: string): string => {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const [, year, month] = match;
  const monthIndex = Number(month) - 1;
  const label = MONTHS[monthIndex];
  return label ? `${label} ${year}` : year;
};

const CoastalExperience = () => {
  const { ref, isVisible } = useScrollReveal();
  const experiences = sortByDate(experience, (exp) => exp.startDate);

  return (
    <section id="experience" ref={ref} className="py-24 px-8 md:px-20 bg-[#F6F2EE]">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`font-display italic font-bold text-4xl md:text-6xl text-[#1C2B36] mb-16 reveal-text ${
            isVisible ? 'is-in' : ''
          }`}
        >
          Experience
        </h2>

        <div className="space-y-16">
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.startDate}`}
              className="grid md:grid-cols-[250px_1fr] gap-4 md:gap-12"
            >
              <div className="font-mono text-[11px] tracking-widest text-accent-1 uppercase pt-1">
                {formatMonth(exp.startDate)} – {formatMonth(exp.endDate)}
              </div>
              <div>
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <OrgLogo
                    src={exp.logo}
                    label={exp.company}
                    variant={exp.logoVariant ?? 'square'}
                  />
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold italic text-3xl text-[#1C2B36] mb-1">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-[12px] text-accent-2 uppercase tracking-wider">
                      {exp.company}
                    </p>
                  </div>
                </div>
                <p className="font-mono text-[11px] text-muted uppercase mb-6 tracking-wider">
                  {exp.location}
                </p>
                <ul className="space-y-4">
                  {exp.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="text-sm text-muted max-w-2xl leading-relaxed flex items-start gap-4"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent-1 mt-2.5 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoastalExperience;
