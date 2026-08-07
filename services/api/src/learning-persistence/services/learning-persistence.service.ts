import { Injectable } from '@nestjs/common';

import { PERSISTENCE_CONSTANTS } from '../constants/persistence.constants';

import { SnapshotStatus } from '../enums/snapshot-status.enum';

import { LearningStateSnapshot } from '../interfaces/learning-state-snapshot.interface';

import { ResumeState } from '../interfaces/resume-state.interface';

import { SessionState } from '../../learning-session/enums/session-state.enum';

@Injectable()
export class LearningPersistenceService {

  private readonly snapshots =
    new Map<string, LearningStateSnapshot[]>();

  getPolicy() {
    return {
      offlineSnapshot:
        PERSISTENCE_CONSTANTS.OFFLINE_SNAPSHOT_ENABLED,

      autoSave:
        PERSISTENCE_CONSTANTS.AUTO_SAVE_ENABLED,

      resume:
        PERSISTENCE_CONSTANTS.RESUME_ENABLED,

      lastKnownState:
        PERSISTENCE_CONSTANTS.LAST_KNOWN_STATE_ENABLED,

      lastKnownPosition:
        PERSISTENCE_CONSTANTS.LAST_KNOWN_POSITION_ENABLED,

      questionModeSnapshot:
        PERSISTENCE_CONSTANTS.QUESTION_MODE_SNAPSHOT_ENABLED,

      cbtStateSnapshot:
        PERSISTENCE_CONSTANTS.CBT_STATE_SNAPSHOT_ENABLED,

      starsEligibilitySnapshot:
        PERSISTENCE_CONSTANTS.STAR_ELIGIBILITY_SNAPSHOT_ENABLED,

      maxSnapshotsPerSession:
        PERSISTENCE_CONSTANTS.MAX_SNAPSHOTS_PER_SESSION,
    };
  }

  saveSnapshot(
    snapshot: Omit<
      LearningStateSnapshot,
      'snapshotId' | 'createdAt' | 'updatedAt' | 'status'
    >,
  ): LearningStateSnapshot {

    const now = new Date();

    const existing =
      this.snapshots.get(snapshot.sessionId) ?? [];

    const snapshotRecord: LearningStateSnapshot = {
      ...snapshot,

      snapshotId:
        `snapshot-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,

      status:
        SnapshotStatus.SYNC_PENDING,

      createdAt:
        now,

      updatedAt:
        now,
    };

    existing.forEach((item) => {
      if (item.status === SnapshotStatus.ACTIVE) {
        item.status =
          SnapshotStatus.SUPERSEDED;
      }
    });

    existing.push(snapshotRecord);

    const limited =
      existing.slice(
        -PERSISTENCE_CONSTANTS.MAX_SNAPSHOTS_PER_SESSION,
      );

    this.snapshots.set(
      snapshot.sessionId,
      limited,
    );

    return snapshotRecord;
  }

  getLatestSnapshot(
    sessionId: string,
  ): LearningStateSnapshot | null {

    const existing =
      this.snapshots.get(sessionId) ?? [];

    if (!existing.length) {
      return null;
    }

    return existing[existing.length - 1];
  }

  getResumeState(
    sessionId: string,
  ): ResumeState {

    const snapshot =
      this.getLatestSnapshot(sessionId);

    if (!snapshot) {
      return {
        sessionId,
        learnerId: '',
        lessonId: '',
        state: SessionState.CREATED,
        lessonPosition: 0,
        questionModeActive: false,
        lessonCompleted: false,
        cbtCompleted: false,
        starsEligible: false,
        canResume: false,
        offlineAvailable: true,
        snapshotId: null,
        updatedAt: null,
      };
    }

    return {
      sessionId:
        snapshot.sessionId,

      learnerId:
        snapshot.learnerId,

      lessonId:
        snapshot.lessonId,

      state:
        snapshot.state,

      lessonPosition:
        snapshot.lessonPosition,

      questionModeActive:
        snapshot.questionModeActive,

      lessonCompleted:
        snapshot.lessonCompleted,

      cbtCompleted:
        snapshot.cbtCompleted,

      starsEligible:
        snapshot.starsEligible,

      canResume:
        snapshot.state !== SessionState.COMPLETED &&
        snapshot.state !== SessionState.EXPIRED,

      offlineAvailable:
        snapshot.offlineAvailable,

      snapshotId:
        snapshot.snapshotId,

      updatedAt:
        snapshot.updatedAt,
    };
  }

  markSnapshotSynced(
    sessionId: string,
    snapshotId: string,
  ): LearningStateSnapshot | null {

    const existing =
      this.snapshots.get(sessionId) ?? [];

    const snapshot =
      existing.find(
        (item) =>
          item.snapshotId === snapshotId,
      );

    if (!snapshot) {
      return null;
    }

    snapshot.status =
      SnapshotStatus.SYNCED;

    snapshot.updatedAt =
      new Date();

    return snapshot;
  }

  getPendingSnapshots(
    sessionId: string,
  ): LearningStateSnapshot[] {

    const existing =
      this.snapshots.get(sessionId) ?? [];

    return existing.filter(
      (item) =>
        item.status === SnapshotStatus.SYNC_PENDING,
    );
  }

  clearSessionSnapshots(
    sessionId: string,
  ): boolean {

    return this.snapshots.delete(
      sessionId,
    );
  }
}
