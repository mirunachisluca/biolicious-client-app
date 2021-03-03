import styles from "./pagination.module.scss";

function Pagination({ pageSize, totalProducts, pageNumberHandler, active }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / pageSize); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers.length > 1 && (
        <nav className={styles.marginLeftAuto}>
          <ul className={`pagination ${styles.paginationList}`}>
            {pageNumbers.map((number) => (
              <li key={number} className={`page-item ${styles.pointerIcon}`}>
                <a
                  onClick={() => pageNumberHandler(number)}
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

export { Pagination };
