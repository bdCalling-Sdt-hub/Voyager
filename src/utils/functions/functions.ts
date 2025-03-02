// progressCalculator.ts
export function getCompletionPercentage(
  completedCount: number,
  total_quest: number,
): number {
  if (total_quest === 0) return 0;
  return Math.round((completedCount / total_quest) * 100);
}

export function getColorByTitle(title: string): string {
  switch (title.toLowerCase()) {
    case 'attraction':
      return '#FC5D88BF';
    case 'city':
      return '#FFA94DBF';
    case 'country':
      return '#8C78EABF';
    default:
      return '#FFFFFF';
  }
}
