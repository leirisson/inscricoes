// src/pages/Signup.tsx
import { useState } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      alert('Cadastro realizado! Verifique seu email para confirmar.')
      navigate('/login')
    }
  }

  return (
    <div style={styles.container}>
      {/* Logo */}
      <div style={styles.logo}>
        <h1 style={styles.logoText}>FutVôlei</h1>
        <p>Gerenciamento de Inscrições</p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSignup} style={styles.form}>
        <h2 style={styles.title}>Criar Conta</h2>

        {error && <div style={styles.error}>{error}</div>}

        {/* Campo de Email */}
        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            disabled={loading}
          />
        </div>

        {/* Campo de Senha */}
        <div style={styles.field}>
          <label htmlFor="password" style={styles.label}>Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            disabled={loading}
            minLength={6} // Supabase exige no mínimo 6 caracteres
          />
        </div>

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Criando conta...' : 'Cadastrar'}
        </button>
      </form>

      {/* Link para login */}
      <p style={styles.footer}>
        Já tem conta?{' '}
        <a href="/login" style={styles.link}>
          Entrar
        </a>
      </p>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f9fc',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    padding: '20px',
    boxSizing: 'border-box' as const,
  },
  logo: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  logoText: {
    margin: '0',
    fontSize: '32px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600' as const,
    color: '#1a1a1a',
    marginBottom: '24px',
    textAlign: 'center' as const,
  },
  field: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '15px',
    color: '#333',
    fontWeight: '500' as const,
  },
  input: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    outline: 'none',
    backgroundColor: '#fafafa',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '16px',
    border: '1px solid #ef9a9a',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  footer: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
    textAlign: 'center' as const,
  },
  link: {
    color: '#1a73e8',
    fontWeight: '500' as const,
    textDecoration: 'none',
  },
}