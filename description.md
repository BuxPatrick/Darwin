# Darwin - AI-Powered Learning Assistant

## Project Overview
Darwin is an intelligent learning assistant that uses AI to provide personalized educational experiences. The platform adapts to users' learning styles and progress, offering various learning modes and tracking performance across different subjects and topics.

## Technical Requirements

### STEP 1: Project Initialization
- Set up a fullstack project
- Frontend: React with TailwindCSS
- Backend: Firebase (Auth, Firestore, Functions) or Flask
- Code organization: Separate frontend and backend folders
- Firebase SDK integration for frontend

### STEP 2: User Authentication
- Firebase Auth implementation
- Email/password authentication
- User data association with Firestore
- Authentication-based routing

### STEP 3: AI Chat Interface
- Real-time chat interface with Gemini integration
- Message input field
- Message history display
- Loading indicators
- Auto-scroll functionality
- Immediate interaction after login

### STEP 4: Subject Inference
- AI-powered subject classification
- Automatic subject detection from user input
- Clarification prompts for ambiguous cases
- Firestore storage for session data

### STEP 5: Topic Detection and Memory
- Topic extraction using AI/keyword analysis
- Subject-topic mapping storage
- User topic history tracking

### STEP 6: Learning Modes
- Multiple learning modes:
  - Explain
  - Quiz
  - ELI5
  - Challenge
- Mode selection UI
- Firestore mode storage
- Dynamic mode switching

### STEP 7: Prompt Construction
- Dynamic prompt generation including:
  - Subject
  - Topic
  - User performance metrics
  - Learning style
  - Selected mode
  - Chat history
- Backend prompt processing
- Context-aware Gemini interactions

### STEP 8: Chat Logging
- Comprehensive logging of:
  - User messages
  - AI responses
  - Timestamps
  - Subjects/topics
  - Learning modes
  - Performance flags
- Firestore storage structure

### STEP 9: Performance Tracking
- Metrics tracking:
  - Quiz accuracy
  - Response speed
  - Confusion patterns
  - Style preferences
- Performance storage in Firestore

### STEP 10: Adaptive Learning
- Dynamic difficulty adjustment
- Vocabulary complexity adaptation
- Explanation depth modification
- Performance-based prompt updates

### STEP 11: Review Mode
- Weak topic identification
- Review mode recommendations
- Topic reinforcement system

### STEP 12: Chat History
- Session-based history viewing
- Topic-based history filtering
- Timestamp and label display
- Confusion flag visualization

### STEP 13: Profile Dashboard
- Performance metrics visualization
- Time tracking
- Streak monitoring
- Quiz history
- Learning style analysis
- Mastery level tracking
- Chart.js integration

### STEP 14: Achievement System
- Achievement categories:
  - Quiz Master (90%+ accuracy)
  - Streak achievements
  - Milestone badges
- Firestore badge storage
- Dashboard display

### STEP 15: Theme Customization
- Theme options:
  - Light
  - Dark
  - Dim
- Theme persistence
- Automatic theme loading

### STEP 16: Voice Input (Optional)
- Web Speech API integration
- Voice-to-text conversion
- Standard message processing

### STEP 17: Firestore Schema
```
users/
  {uid}/
    profile/
      - name
      - email
      - theme
      - learning style
    performance/
      {subject}/
        {topic}/
          - accuracy
          - confidence
          - streaks
          - mode
    chatLogs/
      {sessionId}/
        - input
        - output
        - timestamp
        - topic
        - flags
    badges/
      - achievements[]
    sessions/
      {sessionId}/
        - session summary
```

### STEP 18: Deployment
- Frontend: Vercel/Netlify
- Backend: Firebase services
- Environment configuration
- Security rules implementation 