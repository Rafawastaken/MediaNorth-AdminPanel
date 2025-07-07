import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { supabase } from "../../libs/supabase";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/ui/Loading.jsx";

/* 👇 NOVO */
import { logEvent } from "../../services/logEvent.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: supaError } = await supabase.auth.signInWithPassword(
        { email, password }
      );

      /* ---------- Falha de autenticação ---------- */
      if (supaError) {
        /* registo de falha */
        await logEvent({
          type: "login_failed",
          summary: `Falha de login (${email})`,
          details: { message: supaError.message },
          context: { user_id: null },
        });
        throw supaError;
      }

      /* ---------- Login bem-sucedido ---------- */
      const userId = data?.user?.id ?? null;

      await logEvent({
        type: "login_success",
        summary: `Login bem-sucedido (${email})`,
        context: { user_id: userId },
      });

      navigate("/", { replace: true });
    } catch (err) {
      const msgMap = {
        "Invalid login credentials": "Credenciais inválidas",
        "Email not confirmed": "E-mail ainda não confirmado",
      };
      setError(msgMap[err.message] ?? err.message ?? "Erro ao iniciar sessão");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading blue message="Iniciar Sessão" />;

  /* --------------- UI --------------- */
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[var(--dark-blue)] via-[#1B2435] to-[var(--light-blue)] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/5 p-10 shadow-2xl backdrop-blur-lg ring-1 ring-white/25">
        {/* Branding */}
        <header className="space-y-1 pb-4">
          <h1 className="text-center text-4xl font-semibold text-[var(--light-blue)] drop-shadow-sm">
            Media North
          </h1>
          <p className="text-center text-sm tracking-wide text-gray-300">
            Gestor&nbsp;de&nbsp;Publicidade
          </p>
        </header>

        <div className="border-b border-b-gray-300/25 mb-4 h-1 w-75 px-12" />

        <h2 className="mb-6 text-center text-xl font-medium tracking-wide text-white">
          Iniciar Sessão
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              required
              placeholder="E-mail"
              className="w-full rounded-lg bg-slate-800/70 py-3 pl-11 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              required
              placeholder="Palavra-passe"
              className="w-full rounded-lg bg-slate-800/70 py-3 pl-11 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--light-blue)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-[var(--light-blue)] py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[var(--light-blue)]/90 disabled:opacity-60"
          >
            {loading ? "A autenticar…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
