// progressCalculator.ts
export function getCompletionPercentage(completedCount: number, total_quest: number): number {
    if (total_quest === 0) return 0; // Avoid division by zero
    return Math.round((completedCount / total_quest) * 100); // Only number without "%"
}
