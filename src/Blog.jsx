import { Routes, Route } from "react-router-dom"
import styled from "styled-components"

import { Header, Footer } from "./components"
import { Authorization, Registration } from "./pages"

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 1000px;
  min-height: 100%;

  margin: 0 auto;

  background-color: #fff;
`

const Content = styled.div`
  padding: 120px 0;
`

export default function Blog() {
  return (
    <AppColumn>
      <Header />

      <Content className="app">
        <Routes>
          <Route path="/" element={<div>Главная</div>} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<div>Пользователи</div>} />
          <Route path="/post" element={<div>Новая Статья</div>} />
          <Route path="/post/:postId" element={<div>Статья</div>} />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </Content>

      <Footer />
    </AppColumn>
  )
}
