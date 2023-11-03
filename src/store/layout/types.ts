export type ThemeColors = 'normal' | 'light' | 'dark'

export enum LayoutActionTypes {
  SET_THEME = '@@layout/SET_THEME'
}

export interface LayoutState {
  readonly theme: ThemeColors
}
