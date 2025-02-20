// progressCalculator.ts
export function getCompletionPercentage(completedCount: number, total_quest: number): number {
    if (total_quest === 0) return 0;
    return Math.round((completedCount / total_quest) * 100);
}
