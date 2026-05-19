type LogLevel = 'error' | 'log'

interface IDevLogProps {
  type?: LogLevel
  message: string
}

export function devLog({ message, type = 'log' }: IDevLogProps) {
  if (import.meta.env.PROD) return

  if (type === 'error') {
    console.error(message)
  } else {
    console.log(message)
  }
}
