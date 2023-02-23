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

export function ParseLog(log: string) {
  const logLines: string[] = log.split('\n')

  // parsedLogs is an array of matches logs
  const parsedLogs: MatchLog[] = []
  let currentGameIndex = 0
  let currentGame: MatchLog

  let ps: PlayerLog[]
  let killedIndex: number
  let killerIndex: number

  const validEvents = [
    'Kill',
    'InitGame',
    'ClientUserinfoChanged',
    'ShutdownGame',
  ]

  let result
  // forEach doesnt work with break, so I use every
  logLines.every((line, index) => {
    // let Event  = line.match(/[0-9:]+\s(?<Event >\w*):\s/).groups.Event
    const Event = line.match(/[a-z]+/i)?.[0]

    // console.log(line)

    // to simulate a "continue" in the every method I use a return true
    // console.log(Event)
    if (!Event || !validEvents.includes(Event)) return true

    // one if for each possible imporant event, Kill, ClientUserinfoChanged e InitGame e ShutDownGame, other events are ignored
    // context is a object array, that has other props
    // console.log('Event : ', Event )
    switch (Event) {
      case 'Kill':
        //  3:41 Kill: 2 3 6: Dono da Bola killed Isgalamido by MOD_ROCKET
        // 2 3 6 são os codigos dos players e o MOD
        // debug('Morte')

        currentGame.status.totalKills++

        result = line.match(
          /(?<killerID>\d+)\s(?<killedID>\d+)\s\d+:\s(?<killer>[\w\s!\<\>]+)\skilled\s(?<killed>[\w\s!]+)\sby\s(?<mod>[\w]+)/,
        ).groups

        // console.log(result)
        ps = currentGame.status.playersLogs
        killedIndex = result.killedID - 2
        killerIndex = result.killerID - 2

        if (result.killerID === '1022') {
          ps[killedIndex].kills--
          return true
        }

        if (result.killerID === result.killedID) {
          // console.log('suicidio')
          return true
        }

        ps[killerIndex].kills++

        break
      case 'InitGame':
        // console.log('Inicio da Partida ' + currentGameIndex)

        parsedLogs.push({})
        currentGame = parsedLogs[currentGameIndex]
        currentGame.matchID = currentGameIndex
        currentGame.status = { playersLogs: [], totalKills: 0 }
        currentGame.status.totalKills = 0
        currentGame.status.playersLogs = []

        break

      case 'ShutdownGame':
        // console.log('Fim de Partida ' + currentGameIndex)
        // console.log('---------------------------')
        currentGameIndex++
        break

      case 'ClientUserinfoChanged':
        // console.log('Definição de Nick')

        //  3:47 ClientUserinfoChanged: 5 n\Assasinu Credi\t\0\model\.....
        result = line.match(
          /(?<playerID>[0-9]+)\sn\\(?<playerNick>[\w\s!]+)\\t\\/,
        ).groups

        // console.log(line)

        const currentPlayerIndex: number = result.playerID - 2

        let currentPlayer

        // se nao existir o player, cria
        if (!currentGame.status.playersLogs[currentPlayerIndex]) {
          currentGame.status.playersLogs[currentPlayerIndex] = {}
          currentPlayer = currentGame.status.playersLogs[currentPlayerIndex]
          currentPlayer.playerID = Number(result.playerID)
          currentPlayer.name = result.playerNick
          currentPlayer.kills = 0
          currentPlayer.oldNames = []
        }

        currentPlayer = currentGame.status.playersLogs[currentPlayerIndex]

        if (currentPlayer.name != result.playerNick) {
          currentPlayer.oldNames.unshift(currentPlayer.name)
          currentPlayer.name = result.playerNick
        }

        break

      default:
      // console.log("Irrelevante: " + Event  )
    }

    // if(index > 100) return false;
    return true
  })

  // no fim parsedLogs tem de ser um array de JSONs

  console.log(parsedLogs)
  return parsedLogs
}
