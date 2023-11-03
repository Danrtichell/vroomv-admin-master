import { action } from 'typesafe-actions'

import { LayoutActionTypes, ThemeColors } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setTheme = (theme: ThemeColors) =>
  action(LayoutActionTypes.SET_THEME, theme)
