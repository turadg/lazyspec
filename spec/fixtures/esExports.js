const refConst = true;

function refFunc() {
}

export { refConst, refFunc };

export const inlineConst = true;

export function inlineFunc() {
}

export type SomeType = {
  foo: string,
};

export default refConst;
