import { MatchLog } from './MatchLog'
import { MatchesLogsListContainer } from './StyledComponents.styles'

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

type MatchLogProps = {
  matchID: number
  status: MatchStatus
}

interface MatchesLogsProps {
  matchesLogsList: MatchLogProps[]
}

export function MatchesLogsList({ matchesLogsList }: MatchesLogsProps) {
  return (
    <MatchesLogsListContainer id="MatchesLogsList">
      {matchesLogsList.map((matchLog) => (
        <MatchLog key={matchLog.matchID} {...matchLog} />
      ))}
    </MatchesLogsListContainer>
  )
}
