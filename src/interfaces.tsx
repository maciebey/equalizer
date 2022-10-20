export interface audioPlayer {
  id: number,
  name: string,
  file: string,
  background: string,
  visible: boolean
}

export interface ArtState {
  audioPlayers: audioPlayer[]
}