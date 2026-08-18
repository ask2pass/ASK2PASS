import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  LEARNING_MODULE_CONFIG,
  LearningModuleId,
} from './learningModuleConfig';
import { apiPost } from '../api/apiClient';

type Props = {
  moduleId: LearningModuleId;
  onBack: () => void;
};

type ClassroomControl =
  | 'PLAY'
  | 'PAUSE'
  | 'QUESTION'
  | 'STOP'
  | 'BACK';

const CONTROLS: ClassroomControl[] = [
  'PLAY',
  'PAUSE',
  'QUESTION',
  'STOP',
  'BACK',
];

export default function LearningModuleScreen({
  moduleId,
  onBack,
}: Props) {
  const module = LEARNING_MODULE_CONFIG[moduleId];

  const CLASSROOM_CONTROL_MODULES: LearningModuleId[] = [
    'scla',
    'ptdm',
    'cedm',
    'medm',
    'sap',
    'bm',
    'aem',
  ];

  const hasClassroomControls =
    CLASSROOM_CONTROL_MODULES.includes(moduleId);

  const sendControl = async (control: ClassroomControl) => {
    try {
      await apiPost('/learning-runtime/classroom/control', {
        control,
        module: module.learningPath,
        learningPath: module.learningPath,
      });
    } catch (error) {
      console.warn('Classroom control failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.arrowButton}
        >
          <Text style={styles.arrowText}>←</Text>
        </Pressable>
      </View>

      <Text style={styles.acronym}>{module.acronym}</Text>
      <Text style={styles.title}>{module.title}</Text>

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>
          Welcome to {module.title}
        </Text>

        <Text style={styles.description}>
          {module.description}
        </Text>

        <Text style={styles.activitiesTitle}>
          Functional Activities
        </Text>

        <Text style={styles.activitiesText}>
          Enter this module to access its functional learning
          activities, progression functions, records and shared
          ASK2PASS learning-runtime controls.
        </Text>

        <Text style={styles.path}>
          Learning Path: {module.learningPath}
        </Text>

        <Pressable style={styles.enterButton}>
          <Text style={styles.enterButtonText}>
            Enter {module.acronym} Activities
          </Text>
        </Pressable>
      </View>

      {hasClassroomControls && (
        <View style={styles.lessonCard}>
          <Text style={styles.cardTitle}>
            {module.acronym} Learning Controls
          </Text>

          <Text style={styles.cardText}>
            These controls use the shared ASK2PASS learning runtime.
            No duplicate learning engine is created here.
          </Text>

          <View style={styles.controls}>
            {(moduleId === 'medm'
              ? (['PLAY', 'STOP'] as ClassroomControl[])
              : moduleId === 'scla'
                ? (['PLAY', 'PAUSE', 'QUESTION', 'STOP'] as ClassroomControl[])
                : CONTROLS
            ).map((control) => (
              <Pressable
                key={control}
                onPress={() => sendControl(control)}
                style={styles.control}
              >
                <Text style={styles.controlText}>
                  {moduleId === 'medm'
                    ? control === 'PLAY'
                      ? 'START'
                      : 'LOGOUT'
                    : control}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f7fb',
  },

  navigation: {
    height: 42,
    justifyContent: 'center',
    marginBottom: 12,
  },

  arrowButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  arrowText: {
    fontSize: 32,
    fontWeight: '800',
  },

  acronym: {
    fontSize: 32,
    fontWeight: '900',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },

  welcomeCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
  },

  welcomeTitle: {
    fontSize: 20,
    fontWeight: '800',
  },

  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
  },

  activitiesTitle: {
    marginTop: 18,
    fontSize: 17,
    fontWeight: '800',
  },

  activitiesText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
  },

  path: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: '700',
  },

  enterButton: {
    marginTop: 18,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: '#e8eef7',
  },

  enterButtonText: {
    fontWeight: '800',
    textAlign: 'center',
  },

  lessonCard: {
    marginTop: 18,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '800',
  },

  cardText: {
    marginTop: 10,
    lineHeight: 21,
  },

  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },

  control: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: '#e8eef7',
  },

  disabled: {
    opacity: 0.35,
  },

  controlText: {
    fontWeight: '800',
  },
});
