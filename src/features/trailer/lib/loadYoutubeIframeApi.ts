let youtubeApiPromise: Promise<typeof YT> | null = null

type YoutubeWindow = Window & {
  onYouTubeIframeAPIReady?: () => void
}

function loadYoutubeIframeApi(): Promise<typeof YT> {
  if (youtubeApiPromise) return youtubeApiPromise

  youtubeApiPromise = new Promise((resolve, reject) => {
    const youtubeWindow = window as YoutubeWindow

    if (window.YT?.Player) {
      resolve(window.YT)
      return
    }

    const previousReadyHandler = youtubeWindow.onYouTubeIframeAPIReady

    youtubeWindow.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.()

      if (window.YT?.Player) {
        resolve(window.YT)
        return
      }

      reject(new Error('YouTube IFrame API failed to initialize.'))
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = () => {
      youtubeApiPromise = null
      reject(new Error('YouTube IFrame API failed to load.'))
    }
    document.head.appendChild(script)
  })

  return youtubeApiPromise
}

export default loadYoutubeIframeApi
