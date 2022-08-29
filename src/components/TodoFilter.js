export default function TodoFilter({filter, setFilter}) {

  return (
    <ul className="filters">
      <li>
        <a
          onClick={(e) => {
            e.preventDefault()
            setFilter("all")
          }}
          href="/"
          className={filter === "all" ? "selected" : ""}
        >
          All
        </a>
      </li>
      <li>
        <a
          onClick={(e) => {
            e.preventDefault()
            setFilter("active")
          }}
          href="/active"
          className={filter === "active" ? "selected" : ""}
        >
          Active
        </a>
      </li>
      <li>
        <a
          onClick={(e) => {
            e.preventDefault()
            setFilter("completed")
          }}
          href="/completed"
          className={filter === "completed" ? "selected" : ""}
        >
          Completed
        </a>
      </li>
    </ul>
  );
}
