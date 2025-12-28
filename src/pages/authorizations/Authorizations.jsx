import { useEffect, useState } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"

import { server } from "../../bff"
import { Input, Button, H2 } from "../../components"
import { setUser } from "../../actions"
import { selectUserRole } from "../../selectors"
import { ROLE } from "../../constans"

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/^\w+$/, "Неверный заполнен логин")
    .min(4, "Неверный заполнен логин. Минимум 3 символа")
    .max(15, "Неверный заполнен логин. Максимум 15 символов"),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(
      /^[\w#%]+$/,
      "Для пароля допускаются следующие символы: A-Z, a-z, 0-9"
    )
    .min(5, "Пароль должен быть не менее 5 символов")
    .max(30, "Неверный заполнен пароль. Максимум 30 символов"),
})

const StyledLink = styled(Link)`
  text-align: center;
  text-decoration: underline;

  margin: 20px 0;
  font-size: 18px;
`

const ErrorMessage = styled.div`
  font-size: 16px;
  background-color: #fcadad;
  margin: 10px 0;
  padding: 10px;
`

function AuthorizationContainer({ className }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  })

  const [serverError, setServerError] = useState(null)
  const roleId = useSelector(selectUserRole)

  const dispatch = useDispatch()
  const store = useStore()

  useEffect(() => {
    let currentWasLogout = store.getState().app.wasLogout

    return store.subscribe(() => {
      let prevWasLogout = currentWasLogout

      currentWasLogout = store.getState().app.wasLogout

      if (currentWasLogout !== prevWasLogout) {
        reset()
      }
    })
  }, [store, reset])

  function onSubmit({ login, password }) {
    server.authorize(login, password).then(({ error, response }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`)
        return
      }

      dispatch(setUser(response))
    })
  }

  const formError = errors?.login?.message || errors?.password?.message

  const errorMessage = formError || serverError

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />
  }

  return (
    <div className={className}>
      <H2>Авторизация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин"
          {...register("login", { onChange: () => setServerError(null) })}
        />
        <Input
          type="password"
          placeholder="Пароль"
          {...register("password", { onChange: () => setServerError(null) })}
        />
        <Button type="submit" disabled={!!formError}>
          Авторизоваться
        </Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <StyledLink to="/register">Регистрация</StyledLink>
      </form>
    </div>
  )
}

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > form {
    display: flex;
    flex-direction: column;

    width: 260px;
  }
`
