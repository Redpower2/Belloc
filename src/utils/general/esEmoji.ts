export function esEmoji(str: string) 
{
  // Lamentablemente vibecodeado
    const emojiRegex = /\p{Extended_Pictographic}/u;
    return emojiRegex.test(str);
}