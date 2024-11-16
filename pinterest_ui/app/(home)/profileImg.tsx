export default function ProfileImg({
  width,
  alp,
}: {
  width: number;
  alp: string | undefined;
}) {
  const radius = width / 2; // Menentukan jari-jari lingkaran berdasarkan lebar
  const fontSize = width / 3; // Menyesuaikan ukuran font dengan lebar gambar
  const text = alp?.toLocaleUpperCase().charAt(0); // Ambil huruf pertama dari 'alp'

  return (
    <svg width={width} height={width} xmlns="http://www.w3.org/2000/svg">
      {/* Lingkaran */}
      <circle
        cx={width / 2}
        cy={width / 2}
        r={radius}
        fill="lightblue"
        stroke="blue"
        strokeWidth="0"
      />

      {/* Teks di tengah */}
      <text
        x="50%"
        y="50%"
        fontSize={fontSize}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="black"
      >
        {text}
      </text>
    </svg>
  );
}
