import { Routes, Route } from "react-router-dom"
import styled from "styled-components"
import { useLayoutEffect } from "react"
import { useDispatch } from "react-redux"

import { Header, Footer, Modal } from "./components"
import { Authorization, Registration, Users, Post } from "./pages"
import { setUser } from "./actions"

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 1000px;
  min-height: 100%;

  margin: 0 auto;

  background-color: #fff;
`

const Page = styled.div`
  padding: 120px 0;
`

export default function Blog() {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData")

    if (!currentUserDataJSON) return

    const currentUserData = JSON.parse(currentUserDataJSON)

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    )
  }, [dispatch])

  return (
    <AppColumn>
      <Header />

      <Page className="app">
        <Routes>
          <Route path="/" element={<div>Главная</div>} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post" element={<div>Новая Статья</div>} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </Page>

      <Footer />

      <Modal />
    </AppColumn>
  )
}
