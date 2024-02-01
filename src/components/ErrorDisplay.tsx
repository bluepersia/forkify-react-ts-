export default function ErrorDisplay (err:Error) : JSX.Element
{
    return <div className="error">
    <div>
      <svg>
        <use href="src/img/icons.svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>{err.message}</p>
  </div>
}