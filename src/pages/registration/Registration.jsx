import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"

import { server } from "../../bff"
import { setUser } from "../../actions"
import { selectUserRole } from "../../selectors"
import { useResetForm } from "../../hooks"

import { AuthFormError, Input, Button, H2 } from "../../components"
import { ROLE } from "../../constants"

const regFormSchema = yup.object().shape({
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
  passcheck: yup
    .string()
    .required("Введите пароль повторно")
    .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
})

function RegistrationContainer({ className }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
    },
    resolver: yupResolver(regFormSchema),
  })

  const [serverError, setServerError] = useState(null)
  const roleId = useSelector(selectUserRole)

  const dispatch = useDispatch()

  useResetForm(reset)

  function onSubmit({ login, password }) {
    server.register(login, password).then(({ error, response }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`)
        return
      }

      dispatch(setUser(response))
    })
  }

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message

  const errorMessage = formError || serverError

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />
  }

  return (
    <div className={className}>
      <H2>Регистрация</H2>
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
        <Input
          type="password"
          placeholder="Введите пароль повторно"
          {...register("passcheck", { onChange: () => setServerError(null) })}
        />
        <Button type="submit" disabled={!!formError}>
          Зарегистрироваться
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  )
}

export const Registration = styled(RegistrationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > form {
    display: flex;
    flex-direction: column;

    width: 260px;
  }
`
