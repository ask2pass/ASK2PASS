export interface TCCMonthlyExamSubject {
  sequenceNumber: number;
  subject: string;
  examDate: string | null;
}

export interface TCCMonthlyExamPublication {
  id: string;
  academicSession: string;
  monthKey: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: Date | null;
  subjects: TCCMonthlyExamSubject[];
}
