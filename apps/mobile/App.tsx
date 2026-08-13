import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { apiGet } from './src/api/apiClient';

type Screen = 'home'|'learning'|'dsc'|'aat'|'assessment'|'progress'|'awards'|'sap'|'library'|'profile';

type Curriculum = { programme:string; categories:string[]; certificateExaminations:string[] };

const menu: {id:Screen; title:string; icon:string}[] = [
  {id:'home',title:'Dashboard',icon:'⌂'},
  {id:'learning',title:'Learning',icon:'▣'},
  {id:'dsc',title:'Daily Subjects',icon:'◈'},
  {id:'aat',title:'AI Tutors',icon:'✦'},
  {id:'assessment',title:'Assessments',icon:'✓'},
  {id:'progress',title:'Progress',icon:'↗'},
  {id:'awards',title:'Stars & Awards',icon:'★'},
  {id:'sap',title:'SAP',icon:'◆'},
  {id:'library',title:'Library',icon:'▤'},
  {id:'profile',title:'Profile',icon:'●'},
];

export default function App() {
  const [screen,setScreen]=useState<Screen>('home');
  const [curriculum,setCurriculum]=useState<Curriculum|null>(null);
  const [error,setError]=useState('');

  useEffect(()=>{
    apiGet<Curriculum>('/api/v1/curriculum/WAEC')
      .then(setCurriculum)
      .catch(e=>setError(e instanceof Error?e.message:String(e)));
  },[]);

  const content = () => {
    if(screen==='home') return (
      <>
        <Text style={s.greeting}>Welcome to ASK2PASS</Text>
        <Text style={s.sub}>Your intelligent learning ecosystem</Text>
        <View style={s.status}><Text style={s.ok}>● SYSTEM CONNECTED</Text><Text style={s.small}>Central AI Engine • Learning Engine • Curriculum</Text></View>
        <View style={s.grid}>{menu.slice(1).map(x=><Tile key={x.id} {...x} onPress={()=>setScreen(x.id)}/>)}</View>
        {curriculum && <Card title="Curriculum Engine"><Text style={s.value}>{curriculum.programme}</Text><Text style={s.small}>{curriculum.categories.length} curriculum categories available</Text></Card>}
      </>
    );
    const titles:Record<Screen,string>={learning:'Learning',dsc:'Daily Subject Chart',aat:'AI Academic Tutors',assessment:'Assessments',progress:'Learning Progress',awards:'Stars & Awards',sap:'Student Academic Profile',library:'ASK2PASS Library',profile:'Learner Profile',home:'Dashboard'};
    return <><Pressable onPress={()=>setScreen('home')}><Text style={s.back}>‹ Dashboard</Text></Pressable><Text style={s.greeting}>{titles[screen]}</Text><Text style={s.sub}>Connected to the ASK2PASS learning platform</Text><Card title={titles[screen]}><Text style={s.placeholder}>This module is ready for connection to its existing ASK2PASS backend engine.</Text><Text style={s.small}>No duplicate learning logic is being created in the mobile app.</Text></Card></>;
  };

  return <SafeAreaView style={s.safe}><StatusBar style="dark"/><ScrollView contentContainerStyle={s.container}><Text style={s.brand}>ASK2PASS</Text>{error?<Text style={s.error}>{error}</Text>:!curriculum?<ActivityIndicator/>:content()}</ScrollView></SafeAreaView>;
}

function Tile({title,icon,onPress}:{title:string;icon:string;onPress:()=>void}) {
  return <Pressable style={s.tile} onPress={onPress}><Text style={s.icon}>{icon}</Text><Text style={s.tileText}>{title}</Text></Pressable>;
}
function Card({title,children}:{title:string;children:React.ReactNode}) {
  return <View style={s.card}><Text style={s.cardTitle}>{title}</Text>{children}</View>;
}

const s=StyleSheet.create({
  safe:{flex:1,backgroundColor:'#f4f6f8'},
  container:{padding:22,paddingBottom:40},
  brand:{fontSize:30,fontWeight:'800',marginBottom:24},
  greeting:{fontSize:26,fontWeight:'800',marginTop:10},
  sub:{fontSize:15,marginTop:6,marginBottom:20},
  status:{backgroundColor:'#fff',borderRadius:16,padding:18,marginBottom:18},
  ok:{fontSize:14,fontWeight:'800',marginBottom:7},
  small:{fontSize:13,marginTop:6},
  value:{fontSize:20,fontWeight:'700'},
  grid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  tile:{backgroundColor:'#fff',borderRadius:16,padding:16,width:'47%',minHeight:105,justifyContent:'center'},
  icon:{fontSize:25,marginBottom:8},
  tileText:{fontSize:15,fontWeight:'700'},
  card:{backgroundColor:'#fff',borderRadius:16,padding:20,marginTop:18},
  cardTitle:{fontSize:19,fontWeight:'800',marginBottom:12},
  placeholder:{fontSize:16,lineHeight:23},
  back:{fontSize:16,fontWeight:'700',marginBottom:12},
  error:{fontSize:13,marginBottom:15},
});
