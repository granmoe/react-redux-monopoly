import { setIsRolling } from 'ducks/game'
import squareMap from 'common/helpers/squareMap'

export const initialState = {
  position: 0,
  piece: null,
  id: 0
}

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER_POSITION:
      return {
        ...currentState,
        position: (currentState.position + action.dice) % 39
      }
    default:
      return currentState
  }
}

export const updatePlayerPosition = dice => ({
  type: UPDATE_PLAYER_POSITION,
  dice
})

export const rollDice = () => async (dispatch, getState) => {
  dispatch(setIsRolling(true))
  await new Promise(resolve => setTimeout(_ => resolve(), 2000))
  dispatch(setIsRolling(false))
  const dice = Math.floor(Math.random() * (12 - 2) + 2)
  dispatch(updatePlayerPosition(dice))
}

export const getPlayerGridPosition = state => {
  console.log('op', state.players.position)
  console.log('sp', squareMap[state.players.position])
  return squareMap[state.players.position]
}

const UPDATE_PLAYER_POSITION = 'update-player-position'
