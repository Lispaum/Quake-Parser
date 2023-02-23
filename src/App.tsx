import { useState } from 'react'
import { FileInput } from './components/FileInput'
import { MatchesLogsList } from './components/MatchesLogsList'

type PlayerLog = {
  playerID: number
  kills: number
  name: string
  oldNames: string[]
}

type MatchStatus = {
  totalKills: number
  playersLogs: PlayerLog[]
}

type MatchLog = {
  matchID: number
  status: MatchStatus
}

function App() {
  const [matchesLogsList, setMatchesLogsList] = useState<MatchLog[]>([])

  function updateMatchesLogsList(newMatchesLogsList: MatchLog[]) {
    setMatchesLogsList(newMatchesLogsList)
  }

  return (
    <div>
      <h1>Partida de Quake parseada</h1>
      <FileInput updateMatchesLogsList={updateMatchesLogsList} />
      <MatchesLogsList matchesLogsList={matchesLogsList} />
      Page made by Felippe de Almeida.
    </div>
  )
}

export default App

/*
ref:
https://javascript.info/regexp-introduction
https://www.w3schools.com/js/default.asp
*/
