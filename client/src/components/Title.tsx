interface Props {
  title: string;
  subTitle: string;
  align?: string;
  font: string;
}

export default function Title({
  title,
  subTitle,
  align,
  font = "font-playfair",
}: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        align === "left" && "md:items-start md:text-left"
      }`}
    >
      <h1 className={`text-4xl md:text-[40px] ${font}`}>{title}</h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
        {subTitle}
      </p>
    </div>
  );
}
