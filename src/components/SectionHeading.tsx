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
    <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">{subtitle}</p>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
      {title} <span className="gradient-text">{highlight}</span>
    </h2>
    <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />
  </div>
);

export default SectionHeading;
