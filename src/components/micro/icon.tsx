export default function Icon({ name, size }: { name: string; size?: number }) {
  return (
    <span className="material-symbols-rounded" style={{ fontSize: size || 24 }}>
      {name}
    </span>
  );
}
