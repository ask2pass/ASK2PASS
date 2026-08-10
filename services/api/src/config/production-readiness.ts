
export const productionReadiness = {
  apiVersion: 'v1',
  environment:
    process.env.NODE_ENV === 'production'
      ? 'production'
      : 'development',
  offlineFirst: true,
  adaptiveLearning: true,
  personalizedLearningPath: true,
  learningProgress: true,
  learningDelivery: true,
  academicPower: true,
  sapFoundation: true,
  auditEnabled: true,
  failClosedAuthorization: true,
  readinessVersion: 1,
} as const;
