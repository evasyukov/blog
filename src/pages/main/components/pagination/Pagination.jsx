import styled from "styled-components"
import { Button } from "../../../../components"

function PaginationContainer({ className, page, lastPage, setPage }) {

  return (
    <div className={className}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </Button>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Предыдущая
      </Button>
      <div className="current-page">Страница: {page}</div>
      <Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        Следующая
      </Button>
      <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец
      </Button>
    </div>
  )
}

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;

  margin: 20px 0;
  padding: 0 35px;

  & button {
    margin: 0 5px;
  }

  & .current-page {
    width: 100%;

    text-align: center;
    font-size: 18px;
    font-weight: 500;

    border: 1px solid #000;
  }
`
