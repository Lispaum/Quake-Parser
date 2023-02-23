import { ParseLog } from './ParseLog'

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

interface FileInputProps {
  updateMatchesLogsList: (newMatchesLogsList: MatchLog[]) => void
}

export function FileInput({ updateMatchesLogsList }: FileInputProps) {
  function loadFile(file: any) {
    const reader = new FileReader()

    reader.onload = function () {
      updateMatchesLogsList(ParseLog(String(this.result)))

      // document.querySelector('#MatchesLogsList').innerHTML = JSON.stringify(
      //   ParseLog(String(this.result)),
      //   null,
      //   4,
      // )
    }

    reader.readAsText(file)
  }

  function handleFileInput({ target }: any) {
    console.log(target)
    loadFile(target.files[0])
  }

  return (
    <div>
      <input onChange={handleFileInput} type="file" id="fileInput" />
    </div>
  )
}
