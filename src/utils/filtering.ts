function getValues(obj: Record<string, unknown>): string[] {
  const keys = Object.keys(obj)
  const noSearchKeys = ['id']

  return keys
    .filter((key: string) => noSearchKeys.indexOf(key) === -1)
    .map((key: string) => obj[key])
    .filter((value: unknown) => value !== undefined && value !== null)
    .map((value: unknown) => {
      if (value instanceof Date) {
        return value.toISOString()
      }
      return String(value)
    })
}

export function applyFilter<T>(data: T[], rawSearch: string): T[] {
  if (rawSearch.trim() === '') {
    return data
  }

  if (!data) {
    return []
  }

  let search = rawSearch.toLocaleLowerCase().trim()

  search = `(${search.split(' ').join('|')})`

  const exp = new RegExp(search, 'ig')

  return data.filter((item) => {
    const values = getValues(item as Record<string, unknown>)
    const matches = values.filter((value) => exp.test(value))

    return matches.length > 0
  })
}

export const trimTime = (date: Date) => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date
}
