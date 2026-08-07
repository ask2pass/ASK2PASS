import { DSCSubject } from '../interfaces/dsc-subject.interface';
import {
  DSCWeeklyDay,
  DSCWeeklyPlan,
} from '../interfaces/dsc-weekly-plan.interface';

interface SubjectUsage {
  normal: number;
  recovery: number;
  total: number;
}

function getUsage(
  usage: Map<string, SubjectUsage>,
  subjectId: string,
): SubjectUsage {
  return (
    usage.get(subjectId) ?? {
      normal: 0,
      recovery: 0,
      total: 0,
    }
  );
}

function selectBalancedSubjects(
  candidates: DSCSubject[],
  count: number,
  usage: Map<string, SubjectUsage>,
): DSCSubject[] {
  return [...candidates]
    .sort((a, b) => {
      const usageA = getUsage(usage, a.subjectId);
      const usageB = getUsage(usage, b.subjectId);

      if (usageA.total !== usageB.total) {
        return usageA.total - usageB.total;
      }

      if (
        a.recoveryLesson !== b.recoveryLesson
      ) {
        return a.recoveryLesson ? 1 : -1;
      }

      return a.sequence - b.sequence;
    })
    .slice(0, count);
}

function recordUsage(
  usage: Map<string, SubjectUsage>,
  subjects: DSCSubject[],
): void {
  for (const subject of subjects) {
    const current = getUsage(
      usage,
      subject.subjectId,
    );

    usage.set(subject.subjectId, {
      normal:
        current.normal +
        (subject.recoveryLesson ? 0 : 1),
      recovery:
        current.recovery +
        (subject.recoveryLesson ? 1 : 0),
      total: current.total + 1,
    });
  }
}

export function buildWeeklyDSCPlan(
  learnerId: string,
  academicTermId: string,
  dates: string[],
  defaultSubjectsByDay: DSCSubject[][],
  recoverySubjectsByDay: DSCSubject[][],
): DSCWeeklyPlan {
  const usage = new Map<string, SubjectUsage>();
  const days: DSCWeeklyDay[] = [];

  for (let index = 0; index < dates.length; index++) {
    const normalCandidates =
      defaultSubjectsByDay[index] ?? [];

    const recoveryCandidates =
      recoverySubjectsByDay[index] ?? [];

    const defaultSubjects =
      selectBalancedSubjects(
        normalCandidates,
        Math.min(4, normalCandidates.length),
        usage,
      );

    recordUsage(usage, defaultSubjects);

    const recoverySubjects =
      selectBalancedSubjects(
        recoveryCandidates,
        recoveryCandidates.length,
        usage,
      );

    recordUsage(usage, recoverySubjects);

    days.push({
      date: dates[index],
      defaultSubjects,
      recoverySubjects,
      totalSubjects: [
        ...defaultSubjects,
        ...recoverySubjects,
      ],
    });
  }

  return {
    learnerId,
    academicTermId,
    days,
  };
}
