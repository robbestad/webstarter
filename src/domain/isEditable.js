import * as constants from './constants';
export const isEditable = (item) => {
  return item.masterSystem !== constants.MASTERSYSTEM;
};
