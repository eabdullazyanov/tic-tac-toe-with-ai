export const FIELD_SIZE = 3;
export const CELLS_NUMBER = FIELD_SIZE ** 2;

export const MAX = 0;
export const MIN = 1;

export const winMark = {
  [MAX]: 1,
  [MIN]: -1,
};
export const sign = {
  [MAX]: 'X',
  [MIN]: 'O',
};
export const name = {
  [MAX]: 'Player 1',
  [MIN]: 'Player 2',
};

export const GAME_MODE_1_PLAYER_VS_AI = 'GAME_MODE_1_PLAYER_VS_AI';
export const GAME_MODE_2_PLAYERS = 'GAME_MODE_2_PLAYERS';

// App status
export const APP_STATUS_MAIN_MENU = 'APP_STATUS_MAIN_MENU';
export const APP_STATUS_LOADING = 'APP_STATUS_LOADING';
export const APP_STATUS_GAME_IN_PROGRESS = 'APP_STATUS_GAME_IN_PROGRESS';
