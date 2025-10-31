export default function Icon({ name, size = 20, className = "" }) {
  return (
    <img
      src={`/i/icons8-${name}.svg`}
      alt=""
      width={size}
      height={size}
      className={`inline-block ${className}`}
      style={{ marginRight: '8px', verticalAlign: 'middle' }}
    />
  )
}