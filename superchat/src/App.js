import './App.css';
import { auth, googleProvider, firestore } from './firebase';
import { collection, query, orderBy, limit, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [user] = useAuthState(auth);

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in With Google</button>
  )
}

function SignOut() {
  const signOutUser = async () => {
    await signOut(auth);
  };

  return auth.currentUser && (
    <button onClick={signOutUser}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messageSnapshot] = useCollection(messagesQuery);
  const [formValue, setFormValue] = useState('');
  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageSnapshot]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
  };

  return (
    <>
      <main>
        <div>
          {messageSnapshot && messageSnapshot.docs.map(snapshot => <ChatMessage key={snapshot.id} message={snapshot.data()} />)}
        </div>
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type='submit'>➡</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const {text, uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt='Profile' />
      <p>{text}</p>
    </div>
  )
}

export default App;
