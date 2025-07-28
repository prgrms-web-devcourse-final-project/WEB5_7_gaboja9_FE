import { atom } from 'jotai';

const initialMemberInfo = {
  nickname: '',
  profileImage: '',
  totalProfit: 0.0,
  totalEvaluationAmount: 0,
  tradeCnt: 0,
  ranking: 0,
  period: 0,
  bankruptcyCnt: 0,
};

export const memberInfoAtom = atom(initialMemberInfo);

export const setMemberInfoAtom = atom(null, (get, set, newInfo) => {
  set(memberInfoAtom, newInfo);
});

export const updateMemberInfoAtom = atom(null, (get, set, updatedInfo) => {
  const currentState = get(memberInfoAtom);
  set(memberInfoAtom, { ...currentState, ...updatedInfo });
});

export const isLoggedInAtom = atom(false);

export const setIsLoggedInAtom = atom(null, (get, set, isLoggedIn) => {
  set(isLoggedInAtom, isLoggedIn);
});
