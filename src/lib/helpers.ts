export function getPageNums(
  prevPage?: string | null,
  nextPage?: string | null
): number[] {
  const pageNums: number[] = [];
  if (prevPage && nextPage) {
    for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
      pageNums.push(i);
    }
  }
  return pageNums;
}
