import { useState, useEffect } from "react"
import styled from "styled-components"

function FooterContainer({ className }) {
  const [temperature, setTemperature] = useState()
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState("")

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Kemerovo&lang=ru&appid={f7efc03f4aa91872f72107f14dda7aca}"
    )
      .then((response) => response.json())
      .then(({ name, main, weather }) => {
        setCity(name)
        setTemperature(Math.round(main.temp))
        setWeather(weather[0].description.toUpperCase())
      })
  }, [])

  return (
    <div className={className}>
      <div>
        <div>Блог веб-разработчика</div>
        <div>web@developer.com</div>
      </div>

      <div>
        <div>
          {city},{" "}
          {new Date().toLocaleString("ru", { day: "numeric", month: "long" })}
        </div>

        <div>
          {temperature}°C <br />
          {weather}
        </div>
      </div>
    </div>
  )
}

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100px;
  width: 1000px;

  padding: 10px 40px;

  box-shadow: 0 0 7px 1px rgba(0, 0, 0);

  font-weight: bold;
`
