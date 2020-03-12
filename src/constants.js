export const FIELD_SIZE = 3;
export const CELLS_NUMBER = FIELD_SIZE ** 2;
export const CENTRAL_CELL = 4;

export const MAX = 1;
export const MIN = -1;

export const sign = {
  [MAX]: '✕',
  [MIN]: '○',
};
export const name = {
  [MAX]: 'Player 1',
  [MIN]: 'Player 2',
};

export const AI_DELAY = 500;

// App status
export const APP_STATUS_MAIN_MENU = 'APP_STATUS_MAIN_MENU';
export const APP_STATUS_GAME = 'APP_STATUS_GAME';
export const APP_STATUS_GAME_AS_X = 'APP_STATUS_GAME_AS_X';
export const APP_STATUS_GAME_AS_O = 'APP_STATUS_GAME_AS_O';
