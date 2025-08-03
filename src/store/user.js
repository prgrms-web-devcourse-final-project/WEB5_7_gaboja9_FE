import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const initialMemberInfo = {
  nickname: '',
  profileImage: '',
  totalProfitRate: 0,
  totalCashBalance: 0,
  tradeCnt: 0,
  ranking: 0,
  period: 0,
  bankruptcyCnt: 0,
};

export const memberInfoAtom = atom(initialMemberInfo);

export const isLoggedInAtom = atomWithStorage('isLoggedIn', false);
