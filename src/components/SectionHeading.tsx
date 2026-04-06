interface Props {
  title: string;
  highlight: string;
  subtitle: string;
  isVisible: boolean;
}

const SectionHeading = ({ title, highlight, subtitle, isVisible }: Props) => (
  <div
    className={`text-center mb-16 transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
  >
    <p className="text-foreground/40 text-xs font-medium tracking-[0.25em] uppercase mb-4">{subtitle}</p>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium gradient-text">
      {title} {highlight}
    </h2>
    <div className="mt-5 mx-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
  </div>
);

export default SectionHeading;
