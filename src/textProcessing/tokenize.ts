interface TokenizeResult {
  tokens: string[];
  delimiters: string[];
}

/**
 * Split sentence into words and delimiters
 * */
export const tokenize = (text: string): TokenizeResult => {
  const word = /[A-Za-zÀ-ž0370-03FF0400-04FF0-9'-]+/gi;
  const tokens = [];
  const delimiters = [];
  let item;
  let lastIndex = 0;

  while ((item = word.exec(text))) {
    tokens.push(item[0]);
    delimiters.push(text.substring(lastIndex, item.index));
    lastIndex = word.lastIndex;
  }
  delimiters.push(text.substring(lastIndex, text.length));

  return { tokens, delimiters };
};

/**
 * Merge tokens into sentence and wrap the words.
 * */
export const detokenize = (
  tokens: { isHidden: boolean; word: string }[],
  delimiters: string[],
  wrapWord: (word: string) => string,
  wrapHiddenWord: (word: string) => string,
): string => {
  let result = '';

  for (let i = 0; i < tokens.length; i++) {
    result += delimiters[i];
    result += tokens[i].isHidden ? wrapHiddenWord(tokens[i].word) : wrapWord(tokens[i].word);
  }
  result += delimiters[delimiters.length - 1];

  return result;
};