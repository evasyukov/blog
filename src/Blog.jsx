import { Routes, Route } from "react-router-dom"
import { Header } from "./components"

import styled from "styled-components"

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
const H2 = styled.h2`
  text-align: center;
`

export default function Blog() {
  return (
    <AppColumn>
      <Header />
      <Content className="app">
        <H2>Контент страницы</H2>
        <Routes>
          <Route path="/" element={<div>Главная</div>} />
          <Route path="/login" element={<div>Авторизация</div>} />
          <Route path="/register" element={<div>Регистрация</div>} />
          <Route path="/users" element={<div>Пользователи</div>} />
          <Route path="/post" element={<div>Новая Статья</div>} />
          <Route path="/post/:postId" element={<div>Статья</div>} />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </Content>
      <footer>Подвал</footer>
    </AppColumn>
  )
}
