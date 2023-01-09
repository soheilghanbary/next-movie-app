interface TitleProps {
  text: string;
}
export default function Title({ text }: TitleProps) {
  return <h1 className="page-title">{text}</h1>;
}
