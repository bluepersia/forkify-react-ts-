export default function Spinner () : JSX.Element
{
    return <div className="spinner">
    <svg>
      <use href="src/img/icons.svg#icon-loader"></use>
    </svg>
  </div>
}