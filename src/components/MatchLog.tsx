import { MatchLogContainer } from './StyledComponents.styles'

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

export function MatchLog({ matchID, status }: MatchLogProps) {
  return (
    <MatchLogContainer>
      <div>
        <span>MatchID: {matchID}</span>
        <span>Total Kills: {status.totalKills}</span>
      </div>

      <div>
        {status.playersLogs.map(({ playerID, name, kills, oldNames }) => {
          return (
            <div key={playerID}>
              <h4>
                ID#{playerID} - {name}
              </h4>
              <div>Kills: {kills}</div>
              <span>
                Old Names: {oldNames.length === 0 ? '-' : oldNames.join(', ')}
              </span>
            </div>
          )
        })}
      </div>
    </MatchLogContainer>
  )
}
