import { DSCSubject } from '../interfaces/dsc-subject.interface';

export function balanceDSCSubjects(
  subjects: DSCSubject[],
  dailyCapacity: number,
): DSCSubject[] {
  if (
    dailyCapacity <= 0 ||
    subjects.length === 0
  ) {
    return [];
  }

  const selected: DSCSubject[] = [];
  const subjectUsage = new Map<string, number>();

  const sorted = [...subjects].sort((a, b) => {
    const usageA = subjectUsage.get(a.subjectId) ?? 0;
    const usageB = subjectUsage.get(b.subjectId) ?? 0;

    if (usageA !== usageB) {
      return usageA - usageB;
    }

    if (a.recoveryLesson !== b.recoveryLesson) {
      return a.recoveryLesson ? 1 : -1;
    }

    return a.sequence - b.sequence;
  });

  for (const subject of sorted) {
    if (selected.length >= dailyCapacity) {
      break;
    }

    selected.push(subject);

    subjectUsage.set(
      subject.subjectId,
      (subjectUsage.get(subject.subjectId) ?? 0) + 1,
    );
  }

  return selected;
}

export function groupDSCSubjectsByDay(
  subjects: DSCSubject[],
  dailyCounts: number[],
): DSCSubject[][] {
  const result: DSCSubject[][] = [];
  let cursor = 0;

  for (const count of dailyCounts) {
    const daySubjects = subjects.slice(
      cursor,
      cursor + count,
    );

    result.push(daySubjects);
    cursor += count;

    if (cursor >= subjects.length) {
      break;
    }
  }

  return result;
}
