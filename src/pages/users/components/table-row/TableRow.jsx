import styled from "styled-components"

function TableRowContainer({ children, className }) {
  return <div className={className}>{children}</div>
}

export const TableRow = styled(TableRowContainer)`
  display: flex;
  align-items: center;

  border: ${({ border }) => (border ? `1px solid #000` : "none")};

  & > div {
    display: flex;

    padding: 0 10px;
  }

  & .login-column {
    width: 170px;
  }

  & .registred-column {
    width: 215px;
  }

  & .role-column {
    width: auto;
  }
`
