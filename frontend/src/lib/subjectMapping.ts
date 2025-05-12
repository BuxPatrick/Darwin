import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export type SubjectTopicMap = {
  subject: string;
  topics: string[];
  relatedSubjects: string[];
};

// Predefined subject-topic mappings
const DEFAULT_SUBJECT_MAPS: Record<string, SubjectTopicMap> = {
  Mathematics: {
    subject: 'Mathematics',
    topics: [
      'Algebra',
      'Calculus',
      'Geometry',
      'Statistics',
      'Probability',
      'Linear Algebra',
      'Number Theory',
      'Trigonometry'
    ],
    relatedSubjects: ['Physics', 'Computer Science', 'Economics']
  },
  Physics: {
    subject: 'Physics',
    topics: [
      'Mechanics',
      'Thermodynamics',
      'Electromagnetism',
      'Quantum Physics',
      'Relativity',
      'Optics',
      'Waves',
      'Nuclear Physics'
    ],
    relatedSubjects: ['Mathematics', 'Chemistry', 'Engineering']
  },
  Computer_Science: {
    subject: 'Computer Science',
    topics: [
      'Programming',
      'Data Structures',
      'Algorithms',
      'Database Systems',
      'Operating Systems',
      'Networks',
      'Artificial Intelligence',
      'Software Engineering'
    ],
    relatedSubjects: ['Mathematics', 'Physics', 'Engineering']
  }
};

export async function getSubjectTopicMap(userId: string): Promise<Record<string, SubjectTopicMap>> {
  try {
    const userDoc = doc(db, 'users', userId);
    const mapDoc = await getDoc(doc(userDoc, 'subjectMaps', 'maps'));
    
    if (mapDoc.exists()) {
      return mapDoc.data().maps;
    }
    
    // Initialize with default maps if none exist
    await setDoc(doc(userDoc, 'subjectMaps', 'maps'), {
      maps: DEFAULT_SUBJECT_MAPS
    });
    
    return DEFAULT_SUBJECT_MAPS;
  } catch (error) {
    console.error('Error getting subject topic map:', error);
    return DEFAULT_SUBJECT_MAPS;
  }
}

export async function addTopicToSubject(
  userId: string,
  subject: string,
  topic: string
): Promise<void> {
  try {
    const userDoc = doc(db, 'users', userId);
    const mapDoc = doc(userDoc, 'subjectMaps', 'maps');
    
    await updateDoc(mapDoc, {
      [`maps.${subject}.topics`]: arrayUnion(topic)
    });
  } catch (error) {
    console.error('Error adding topic to subject:', error);
  }
}

export async function addRelatedSubject(
  userId: string,
  subject: string,
  relatedSubject: string
): Promise<void> {
  try {
    const userDoc = doc(db, 'users', userId);
    const mapDoc = doc(userDoc, 'subjectMaps', 'maps');
    
    await updateDoc(mapDoc, {
      [`maps.${subject}.relatedSubjects`]: arrayUnion(relatedSubject)
    });
  } catch (error) {
    console.error('Error adding related subject:', error);
  }
}

export function validateSubjectTopic(
  subject: string,
  topic: string,
  maps: Record<string, SubjectTopicMap>
): boolean {
  const subjectMap = maps[subject];
  if (!subjectMap) return false;
  
  return subjectMap.topics.includes(topic);
}

export function getRelatedSubjects(
  subject: string,
  maps: Record<string, SubjectTopicMap>
): string[] {
  const subjectMap = maps[subject];
  if (!subjectMap) return [];
  
  return subjectMap.relatedSubjects;
} 