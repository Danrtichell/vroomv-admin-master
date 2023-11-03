import React from 'react'
import {
  Switch,
  SwitchProps,
  SwitchClassKey,
  withStyles,
  Theme,
  createStyles
} from '@material-ui/core'

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string
}

interface Props extends SwitchProps {
  classes: Styles
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 27,
      height: 14,
      padding: 0,
      margin: theme.spacing(1),
      overflow: 'unset'
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(13px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none'
        }
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff'
      }
    },
    thumb: {
      width: 12,
      height: 12
    },
    track: {
      borderRadius: 8,
      border: '1px solid #DBDBDB',
      backgroundColor: '#DBDBDB',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border'])
    },
    checked: {},
    focusVisible: {}
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
})

export default IOSSwitch
