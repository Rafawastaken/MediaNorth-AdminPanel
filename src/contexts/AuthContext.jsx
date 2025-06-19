// src/contexts/AuthContext.jsx
// -----------------------------------------------------------
//  🔐  Provedor de autenticação Supabase + rota protegida
// -----------------------------------------------------------
import {createContext, useContext, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {supabase} from '../libs/supabase';
import Loading from '../components/ui/Loading.jsx';

/* ------------------------------------------------------------------
 * Contexto
 * ----------------------------------------------------------------*/
const AuthContext = createContext({user: null, loading: true});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Leitura inicial da sessão + listener em tempo‑real
  useEffect(() => {
    const getInitial = async () => {
      const {
        data: {session},
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitial();

    const {data: listener} = supabase.auth.onAuthStateChange(
        (_event, session) => setUser(session?.user ?? null),
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = () => supabase.auth.signOut();

  return (
      <AuthContext.Provider value={{user, loading, signOut}}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

/* ------------------------------------------------------------------
 * Rota protegida – redirecciona para /login se não houver sessão
 * ----------------------------------------------------------------*/
export const ProtectedRoute = ({children}) => {
  const {user, loading} = useAuth();

  if (loading)
    return (
        <Loading full={true} message="Iniciar Sessão"/>
    );

  return user ? children : <Navigate to="/login" replace/>;
};
