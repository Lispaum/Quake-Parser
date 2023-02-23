import { ParseLog } from './ParseLog'

type MatchStatus = {
  totalKills: number
}

type MatchLog = {
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
    console.log(typeof target)
    loadFile(target.files[0])
  }

  return (
    <div>
      <input onChange={handleFileInput} type="file" id="fileInput" />
    </div>
  )
}
