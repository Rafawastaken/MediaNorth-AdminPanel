import {createContext, useContext, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {supabase} from '../libs/supabase';
import Loading from '../components/ui/Loading.jsx';

/* ------------------------------------------------------------------
 * Helper – normaliza o objecto user
 * ----------------------------------------------------------------*/
const formatUser = (rawUser) => {
  if (!rawUser) return null;

  const meta = rawUser.user_metadata || {};
  const email = rawUser.email || '';

  /* Se não houver nome nos metadados, usa a parte antes do @ */
  const fullName = meta.full_name || meta.name || email.split('@')[0] ||
      'Utilizador';

  return {
    ...rawUser,
    fullName,
    email, // mantém também o email direto
  };
};

/* ------------------------------------------------------------------
 * Contexto
 * ----------------------------------------------------------------*/
const AuthContext = createContext({
  user: null, loading: true, signOut: () => {
  },
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Leitura inicial da sessão + listener em tempo‑real
  useEffect(() => {
    const getInitial = async () => {
      const {
        data: {session},
      } = await supabase.auth.getSession();
      setUser(formatUser(session?.user));
      setLoading(false);
    };

    getInitial();

    const {data: listener} = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(formatUser(session?.user));
        });

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
 * Rota protegida – redireciona para /login se não houver sessão
 * ----------------------------------------------------------------*/
export const ProtectedRoute = ({children}) => {
  const {user, loading} = useAuth();

  if (loading) return <Loading full message="A carregar…"/>;

  return user ? children : <Navigate to="/login" replace/>;
};
