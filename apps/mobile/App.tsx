import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Pressable,
  BackHandler,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Screen =
  | 'home'
  | 'dashboard'
  | 'scla'
  | 'ptdm'
  | 'cedm'
  | 'medm'
  | 'sap'
  | 'bm'
  | 'academicSearch'
  | 'dccTcc'
  | 'library'
  | 'hallOfFame'
  | 'suggestions'
  | 'policy'
  | 'about'
  | 'dsc'
  | 'classNotes'
  | 'assessmentRecords'
  | 'awards'
  | 'wallet'
  | 'notifications'
  | 'teacherProfile'
  | 'institutionProfile';

type TileItem = {
  id: Screen;
  acronym: string;
  title: string;
  icon: string;
  description: string;
};

const learningModules: TileItem[] = [
  {
    id: 'scla',
    acronym: 'SCLA',
    title: 'School Classroom Learning Activities',
    icon: '🏫',
    description: 'Structured classroom learning activities',
  },
  {
    id: 'ptdm',
    acronym: 'PTDM',
    title: 'Personal Tutorial Drills',
    icon: '👨‍🏫',
    description: 'Personal tutorial drills for guided practice',
  },
  {
    id: 'cedm',
    acronym: 'CEDM',
    title: 'Certificate Examinations Drill Module',
    icon: '🎓',
    description: 'Certificate examinations drill and preparation',
  },
  {
    id: 'medm',
    acronym: 'MEDM',
    title: 'Mock Examinations Drill Module',
    icon: '📝',
    description: 'Mock examination practice',
  },
  {
    id: 'sap',
    acronym: 'SAP',
    title: 'Skill Acquisition Programme',
    icon: '🛠️',
    description: 'Structured skill acquisition, development and progression',
  },
  {
    id: 'bm',
    acronym: 'BM',
    title: 'Business Modelling',
    icon: '📊',
    description: 'Business and operational modelling',
  },
];

const homeTools: TileItem[] = [
  {
    id: 'dsc',
    acronym: 'DSC',
    title: 'Daily Subject Chart',
    icon: '📅',
    description: 'Daily subjects, lessons and recovery',
  },
  {
    id: 'dccTcc',
    acronym: 'DCC/TCC',
    title: 'Termly Curriculum Chart',
    icon: '🗓️',
    description: 'Curriculum compliance and workload distribution',
  },
  {
    id: 'hallOfFame',
    acronym: 'TOP 10',
    title: 'Top 10 Star Earners',
    icon: '🏆',
    description: 'Top 10 Star Earners for each class level',
  },
  {
    id: 'library',
    acronym: 'LIBRARY',
    title: 'ASK2PASS Library',
    icon: '📚',
    description: 'Educational resources and authoritative sources',
  },
  
  {
    id: 'suggestions',
    acronym: 'SUGGEST',
    title: 'Suggestion Center',
    icon: '💡',
    description: 'Suggestions, feedback and improvements',
  },
];

const dashboardItems: TileItem[] = [
  {
    id: 'dashboard',
    acronym: 'PROFILE',
    title: 'Student Profile',
    icon: '👤',
    description: 'Personal academic identity and status',
  },
  {
    id: 'classNotes',
    acronym: 'NOTES',
    title: 'Class Notes',
    icon: '📒',
    description: 'Classroom notes and learning records',
  },
  {
    id: 'assessmentRecords',
    acronym: 'RECORDS',
    title: 'Assessment Records',
    icon: '📋',
    description: 'Assessment history and results',
  },
  {
    id: 'awards',
    acronym: 'AWARDS',
    title: 'Stars & Awards',
    icon: '⭐',
    description: 'Achievements and recognition',
  },
  {
    id: 'wallet',
    acronym: 'WALLET',
    title: 'Coin Wallet',
    icon: '🪙',
    description: 'ASK2PASS learning coins',
  },
  {
    id: 'notifications',
    acronym: 'NOTIFY',
    title: 'Notifications',
    icon: '🔔',
    description: 'Important platform notifications',
  },
];

type MenuNode = {
  label: string;
  id?: Screen;
  children?: MenuNode[];
};

const menuGroups: MenuNode[] = [
  {
    label: 'Dashboard',
    children: [
      {
        label: 'Student Licence',
        children: [
          { label: 'Student Profile', id: 'dashboard' },
          { label: 'Class Notes', id: 'classNotes' },
          { label: 'Assessments Records', id: 'assessmentRecords' },
          { label: 'Stars & Awards', id: 'awards' },
          { label: 'Coin Wallet', id: 'wallet' },
          { label: 'Notification', id: 'notifications' },
        ],
      },
      {
        label: 'Teacher Licence',
        children: [
          { label: 'Teacher Profile', id: 'teacherProfile' },
          { label: 'Classes & Learners', id: 'teacherProfile' },
          { label: 'Lesson / Teaching Records', id: 'teacherProfile' },
          { label: 'Assessment Records', id: 'teacherProfile' },
          { label: 'Performance & Reports', id: 'teacherProfile' },
        ],
      },
      {
        label: 'Institution Licence',
        children: [
          {
            label: 'Schools',
            children: [
              { label: 'School Profile', id: 'institutionProfile' },
              { label: 'Administration', id: 'institutionProfile' },
              { label: 'Teachers / Staff', id: 'institutionProfile' },
              { label: 'Students / Learners', id: 'institutionProfile' },
              { label: 'Beneficiaries & Number of Beneficiaries', id: 'institutionProfile' },
              { label: 'Classes / Departments', id: 'institutionProfile' },
              { label: 'Programmes / Courses', id: 'institutionProfile' },
              { label: 'Resources & Facilities', id: 'institutionProfile' },
              { label: 'Academic Performance & Reports', id: 'institutionProfile' },
            ],
          },
          {
            label: 'State/LGA Government',
            children: [
              { label: 'Government Profile', id: 'institutionProfile' },
              { label: 'Education Administration', id: 'institutionProfile' },
              { label: 'Schools / Institutions', id: 'institutionProfile' },
              { label: 'Officials / Staff', id: 'institutionProfile' },
              { label: 'Programmes / Interventions', id: 'institutionProfile' },
              { label: 'Beneficiaries & Number of Beneficiaries', id: 'institutionProfile' },
              { label: 'Budget / Resources', id: 'institutionProfile' },
              { label: 'Monitoring & Evaluation', id: 'institutionProfile' },
              { label: 'Impact & Reports', id: 'institutionProfile' },
            ],
          },
          {
            label: 'NGOs',
            children: [
              { label: 'NGO Profile', id: 'institutionProfile' },
              { label: 'Management / Staff', id: 'institutionProfile' },
              { label: 'Volunteers / Operatives', id: 'institutionProfile' },
              { label: 'Programmes / Projects', id: 'institutionProfile' },
              { label: 'Beneficiaries & Number of Beneficiaries', id: 'institutionProfile' },
              { label: 'Communities / Locations', id: 'institutionProfile' },
              { label: 'Partners / Funders', id: 'institutionProfile' },
              { label: 'Resources / Funding', id: 'institutionProfile' },
              { label: 'Impact & Outcomes', id: 'institutionProfile' },
              { label: 'Reports / Analytics', id: 'institutionProfile' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Learning',
    children: learningModules.map((x) => ({
      label: `${x.acronym} — ${x.title}`,
      id: x.id,
    })),
  },
  {
    label: 'QuickSearch',
    children: [{ label: 'Search Anything', id: 'academicSearch' }],
  },
  {
    label: 'DCC/TCC',
    children: [{ label: 'Termly Curriculum Chart', id: 'dccTcc' }],
  },
  {
    label: 'Library',
    children: [{ label: 'ASK2PASS Library', id: 'library' }],
  },
  {
    label: 'Hall of Fame',
    children: [{ label: 'Top 10 Star Earners — Each Class Level', id: 'hallOfFame' }],
  },
  {
    label: 'Suggestion Center',
    children: [{ label: 'Suggestions & Feedback', id: 'suggestions' }],
  },
  {
    label: 'Policy',
    children: [{ label: 'Policies', id: 'policy' }],
  },
  {
    label: 'About',
    children: [{ label: 'About ASK2PASS', id: 'about' }],
  },
];

function Tile({
  item,
  onPress,
}: {
  item: TileItem;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [s.tile, pressed && s.tilePressed]}
      onPress={onPress}
    >
      {item.id === 'sap' ? (
        <View style={s.sapTileIcon}>
          <Text style={s.sapTileIconText}>SAP</Text>
        </View>
      ) : (
        <Text style={s.tileIcon}>{item.icon}</Text>
      )}
      <Text style={s.tileAcronym}>{item.acronym}</Text>
      <Text style={s.tileTitle}>{item.title}</Text>
    </Pressable>
  );
}

function Page({
  title,
  subtitle,
  onBack,
  onHome,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
  onHome: () => void;
}) {
  return (
    <>
      <View style={s.navigationBar}>
        <Pressable
          onPress={onBack}
          style={s.navigationButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={s.navigationButtonText}>‹ Back</Text>
        </Pressable>

        <Pressable
          onPress={onHome}
          style={s.navigationButton}
          accessibilityRole="button"
          accessibilityLabel="Go to home"
        >
          <Text style={s.navigationButtonText}>⌂ Home</Text>
        </Pressable>
      </View>
      <Text style={s.pageTitle}>{title}</Text>
      <Text style={s.pageSubtitle}>{subtitle}</Text>
      <View style={s.pageCard}>
        <Text style={s.pageCardTitle}>Welcome to {title}</Text>
        <Text style={s.pageText}>
          Purpose: {subtitle}. This page provides the user-facing interface for this ASK2PASS function while remaining connected to the existing backend architecture.
        </Text>
        <Text style={s.pageRules}>
          Rules: Use this module for its stated purpose, keep records accurate, respect authorised access, and follow ASK2PASS policies.
        </Text>
        <Text style={s.pageSmall}>
          No duplicate learning engine is created in the mobile application.
        </Text>
      </View>
    </>
  );
}


function MenuTree({
  nodes,
  onSelect,
}: {
  nodes: MenuNode[];
  onSelect: (id: Screen) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      {nodes.map((node) => {
        const isOpen = open === node.label;
        const hasChildren = !!node.children?.length;

        return (
          <View key={node.label}>
            <Pressable
              style={s.menuGroup}
              onPress={() =>
                node.id
                  ? onSelect(node.id)
                  : setOpen(isOpen ? null : node.label)
              }
            >
              <Text style={s.menuIcon}>▸</Text>
              <Text style={s.menuGroupText}>{node.label}</Text>
              {hasChildren && (
                <Text style={s.menuArrow}>{isOpen ? '⌃' : '⌄'}</Text>
              )}
            </Pressable>

            {isOpen && node.children && (
              <View style={s.menuNested}>
                <MenuTree nodes={node.children} onSelect={onSelect} />
              </View>
            )}
          </View>
        );
      })}
    </>
  );
}

export default function App() {
  const [searchText, setSearchText] = useState('');

  const [screen, setScreen] = useState<Screen>('home');
  const [navigationStack, setNavigationStack] = useState<Screen[]>(['home']);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (next: Screen) => {
    setNavigationStack((current) => {
      const last = current[current.length - 1];
      if (last === next) return current;
      return [...current, next];
    });
    setScreen(next);
    setMenuOpen(false);
  };

  const goBack = () => {
    setNavigationStack((current) => {
      if (current.length <= 1) {
        setScreen('home');
        return ['home'];
      }

      const next = current.slice(0, -1);
      setScreen(next[next.length - 1]);
      setMenuOpen(false);
      return next;
    });
  };

  const goHome = () => {
    setNavigationStack(['home']);
    setScreen('home');
    setMenuOpen(false);
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (menuOpen) {
          setMenuOpen(false);
          return true;
        }

        if (navigationStack.length > 1) {
          goBack();
          return true;
        }

        return false;
      },
    );

    return () => subscription.remove();
  }, [navigationStack, menuOpen]);

  const home = (
    <>
      <View style={s.leadershipHero}>
        <Image
          source={require('./assets/aat/leadership-victory-composition.png')}
          style={s.leadershipHeroImage}
          resizeMode="contain"
        />

        <Pressable
          style={s.heroMenuButton}
          onPress={() => setMenuOpen((current) => !current)}
          accessibilityRole="button"
          accessibilityLabel="Open menu"
        >
          <Text style={s.heroMenuIcon}>☰</Text>
        </Pressable>

        <View style={s.miniQuickSearch}>
          <TextInput
            style={s.miniQuickSearchInput}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => go('academicSearch')}
            returnKeyType="search"
            multiline={true}
            numberOfLines={3}
            textAlignVertical="top"
            placeholder={"Enter your search here...\nSearch subjects, topics, lessons...\nSearch anything across ASK2PASS..."}
            placeholderTextColor="#5B6B78"
            accessibilityLabel="Quick Search input"
          />

          <Pressable
            style={s.miniQuickSearchButton}
            onPress={() => go('academicSearch')}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Text style={s.miniQuickSearchButtonText}>Quick{"\n"}Search</Text>
          </Pressable>
        </View>
      </View>

      <Text style={s.sectionTitle}>LEARNING MODULES</Text>
      <Text style={s.sectionSubtitle}>
        Explore the ASK2PASS learning interfaces.
      </Text>

      <View style={s.learningGrid}>
        {learningModules.map((item) => (
          <View key={item.id} style={s.learningGridItem}>
            <Tile item={item} onPress={() => go(item.id)} />
          </View>
        ))}
      </View>
      <Text style={s.sectionTitle}>ASK2PASS PLATFORM</Text>
      <Text style={s.sectionSubtitle}>
        Core academic, curriculum and knowledge services.
      </Text>

      <View style={s.grid}>
        {homeTools.map((item) => (
          <View key={item.id} style={s.gridItem}>
            <Tile item={item} onPress={() => go(item.id)} />
          </View>
        ))}
      </View>

      <Text style={s.sectionTitle}>USER DASHBOARD</Text>
      <View style={s.grid}>
        {dashboardItems.map((item) => (
          <View key={item.id} style={s.gridItem}>
            <Tile item={item} onPress={() => go(item.id)} />
          </View>
        ))}
      </View>
    </>
  );



const dashboard = (
    <>
      <View style={s.navigationBar}>
        <Pressable
          onPress={goBack}
          style={s.navigationButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={s.navigationButtonText}>‹ Back</Text>
        </Pressable>

        <Pressable
          onPress={goHome}
          style={s.navigationButton}
          accessibilityRole="button"
          accessibilityLabel="Go to home"
        >
          <Text style={s.navigationButtonText}>⌂ Home</Text>
        </Pressable>
      </View>

      <Text style={s.welcome}>Dashboard</Text>
      <Text style={s.homeSubtitle}>
        Your profiles, academic records, achievements and platform status.
      </Text>

      <Text style={s.sectionTitle}>STUDENT PROFILE</Text>
      <View style={s.grid}>
        {dashboardItems.map((item) => (
          <Tile key={item.id} item={item} onPress={() => go(item.id)} />
        ))}
      </View>

      <Text style={s.sectionTitle}>OTHER PROFILES</Text>
      <View style={s.grid}>
        <Tile
          item={{
            id: 'teacherProfile',
            acronym: 'TEACHER',
            title: 'Teacher Profile',
            icon: '🧑‍🏫',
            description: 'Teacher identity and teaching activity',
          }}
          onPress={() => go('teacherProfile')}
        />
        <Tile
          item={{
            id: 'institutionProfile',
            acronym: 'INSTITUTION',
            title: 'Institution Profiles',
            icon: '🏛️',
            description: 'Schools, government and NGO profiles',
          }}
          onPress={() => go('institutionProfile')}
        />
      </View>
    </>
  );

  const titles: Partial<Record<Screen, [string, string]>> = {
    scla: ['SCLA — School Classroom Learning Activities', 'Classroom learning interface'],
    ptdm: ['PTDM — Personal Tutors Drill Module', 'Personal tutor drilling interface'],
    cedm: ['CEDM — Certificate Examination Drilling Module', 'Certificate examination drilling'],
    medm: ['MEDM — Mock Examinations Drill Module', 'Mock examination drilling'],
    sap: ['SAP — Student Academic Profile', 'Student academic profile interface'],
    bm: ['BM — Business Modelling', 'Business modelling interface'],
    academicSearch: ['QuickSearch', 'Search Anything across the academic ecosystem'],
    dccTcc: ['DCC/TCC — Termly Curriculum Chart', 'Curriculum compliance and workload distribution'],
    library: ['ASK2PASS Library', 'Educational resources and authoritative sources'],
    hallOfFame: ['Top 10 Star Earners', 'Leaderboard showing the best 10 Star Earners for each class level'],
    suggestions: ['Suggestion Center', 'Suggestions and feedback'],
    policy: ['Policy', 'ASK2PASS policies and governance'],
    about: ['About ASK2PASS', 'Platform information'],
    dsc: ['DSC — Daily Subject Chart', 'Daily subjects, lesson topics and recovery'],
    classNotes: ['Class Notes', 'Classroom notes and learning records'],
    assessmentRecords: ['Assessment Records', 'Assessment history and results'],
    awards: ['Stars & Awards', 'Achievements and recognition'],
    wallet: ['Coin Wallet', 'ASK2PASS learning coins'],
    notifications: ['Notifications', 'Platform notifications'],
    teacherProfile: ['Teacher Profile', 'Teacher identity and teaching activity'],
    institutionProfile: ['Institution Profiles', 'Schools, State/LGA Government and NGOs'],
  };

  const renderScreen = () => {
    if (screen === 'home') return home;
    if (screen === 'dashboard') return dashboard;

    const page = titles[screen];
    if (!page) return home;

    return (
      <Page
        title={page[0]}
        subtitle={page[1]}
        onBack={goBack}
        onHome={goHome}
        />
    );
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar style="dark" />

        {menuOpen && (
        <View style={s.menuPanel}>
          <ScrollView nestedScrollEnabled>
            <MenuTree nodes={menuGroups} onSelect={go} />
          </ScrollView>
        </View>
      )}

      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >
        {renderScreen()}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({


  safe: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  brand: {
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  searchBox: {
    flex: 1,
    minWidth: 0,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#B7DDF2',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 27,
    marginRight: 7,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 15,
    color: '#111111',
    paddingVertical: 0,
  },
  heroMenuButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE7E1',
  },
  heroMenuIcon: {
    fontSize: 25,
    fontWeight: '900',
  },
  miniQuickSearch: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCE7E1',
    padding: 10,
    zIndex: 20,
    elevation: 8,
  },
  miniQuickSearchInput: {
    minHeight: 92,
    borderWidth: 1,
    borderColor: '#DCE7E1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 21,
    backgroundColor: '#FFFFFF',
  },
  miniQuickSearchButton: {
    alignSelf: 'flex-end',
    marginTop: 9,
    minHeight: 40,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B7DDF2',
  },
  miniQuickSearchButtonText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  leadershipHero: {
    width: '100%',
    aspectRatio: 1152 / 1368,
    alignSelf: 'stretch',
    position: 'relative',
    overflow: 'visible',
    backgroundColor: '#87CEEB',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
  },
  leadershipHeroImage: {
    width: '100%',
    height: '100%',
    marginTop: 0,
  },



  aatHero: {
    width: '100%',
    height: 245,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: '#87CEEB',
    paddingHorizontal: 4,
  },
  aatPerson: {
    flex: 1,
    height: '100%',
    maxWidth: '34%',
  },
  aatPersonCenter: {
    zIndex: 2,
  },
  menuPanel: {
    position: 'absolute',
    top: 76,
    right: 12,
    left: 12,
    zIndex: 20,
    maxHeight: 520,
    backgroundColor: '#174A63',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#0D3448',
    paddingVertical: 8,
  },
  menuGroup: {
    minHeight: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    fontSize: 20,
    color: '#ffffff',
  },
  menuGroupText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  menuArrow: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  menuNested: {
    borderLeftWidth: 1,
    borderLeftColor: '#4C7890',
    marginLeft: 20,
  },
  menuChild: {
    marginLeft: 46,
    paddingVertical: 10,
    paddingRight: 14,
  },
  menuChildText: {
    fontSize: 14,
    lineHeight: 19,
    color: '#EAF7FF',
  },
  container: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 50,
  },
  welcome: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 8,
  },
  homeSubtitle: {
    fontSize: 18,
    
    lineHeight: 22,
    marginTop: 6,
    marginBottom: 18,
  },
  hero: {
    backgroundColor: '#dcebe3',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#cbded3',
  },
  heroSymbol: {
    fontSize: 42,
    marginRight: 14,
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  heroSmall: {
    fontSize: 13,
    marginTop: 5,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '900',
    marginTop: 0,
    marginBottom: 0,
    lineHeight: 30,
  },
  sectionSubtitle: {
    fontSize: 18,
    
    lineHeight: 22,
    marginTop: 0,
    marginBottom: 10,
  },
  learningGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  learningGridItem: {
    width: '31.8%',
    flexBasis: '31.8%',
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  gridItem: {
    width: '31.8%',
    flexBasis: '31.8%',
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0,
  },
  tile: {
    width: '100%',
    minHeight: 164,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dce7e1',
  },
  tilePressed: {
    opacity: 0.72,
  },
  sapTileIcon: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9A800',
    borderWidth: 6,
    borderColor: '#F4C62E',
  },
  sapTileIconText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  tileIcon: {
    fontSize: 42,
    marginBottom: 7,
  },
  tileAcronym: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  tileTitle: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
    marginTop: 4,
  },
  tileDescription: {
    fontSize: 11,
    lineHeight: 15,
    marginTop: 7,
  },
  profileBanner: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dce7e1',
    marginBottom: 18,
  },
  profileIcon: {
    fontSize: 38,
    marginRight: 14,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  profileText: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  navigationBar: {
    width: '100%',
    minHeight: 54,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#87CEEB',
  },
  navigationButton: {
    minWidth: 112,
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B7DDF2',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#10243A',
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    fontWeight: '800',
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },
  pageSubtitle: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  pageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dce7e1',
  },
  pageCardTitle: {
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 12,
  },
  pageText: {
    fontSize: 15,
    lineHeight: 23,
  },
  pageRules: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 14,
    fontWeight: '700',
  },
  pageSmall: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
  },
});
