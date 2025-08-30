// src/pages/Dashboard.tsx
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { buscarInscricoes } from '../supabase/requisicoes'
import { useEffect, useState } from 'react'
import InscricaoCard from '../components/InscricaoCard'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [inscricoes, setInscricoes] = useState<any[]>([]) // Altere para tipo específico depois
  const [loading, setLoading] = useState(true)

  // Carrega as inscrições quando o componente for montado
  useEffect(() => {
    dataInscricoes()
  }, [user]) // executa sempre que o usuário mudar (ex: login/logout)

  const dataInscricoes = async () => {
    setLoading(true)
    const resultado = await buscarInscricoes()
    setInscricoes(resultado)
    setLoading(false)
  }


  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }




  return (
<div style={styles.container}>
  {/* Header Fixo */}
  <header style={styles.header}>
    <div style={styles.headerContent}>
      <h2 style={styles.welcomeText}>
        Bem-vindo, {user?.email?.split('@')[0]}!
      </h2>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Sair
      </button>
    </div>
  </header>

  {/* Conteúdo Principal (com espaço para o header) */}
  <main style={styles.main}>
    <p style={styles.subtitle}>Você está logado.</p>

    {/* Carregando ou Cards */}
    {loading ? (
      <p>Carregando  inscrições...</p>
    ) : inscricoes.length === 0 ? (
      <p>Você ainda não tem inscrições.</p>
    ) : (
      <div>
        <h3 style={styles.sectionTitle}>Inscrições</h3>
        <div style={styles.cardsContainer}>
          {inscricoes.map((inscricao) => (
            <InscricaoCard key={inscricao.id} inscricao={inscricao} />
          ))}
        </div>
      </div>
    )}
  </main>
</div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    position: 'relative' as const,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  },
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '10px',
  },
  welcomeText: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'normal' as const,
    color: '#fff',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#e53935',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    fontSize: '14px',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  },
  main: {
    marginTop: '80px',
    padding: '0 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingBottom: '40px',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  },
  subtitle: {
    color: '#555',
    fontStyle: 'italic' as const,
    marginBottom: '20px',
    fontSize: '15px',
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#1a1a1a',
    borderBottom: '2px solid #1a73e8',
    paddingBottom: '8px',
    marginBottom: '20px',
    fontWeight: '600' as const,
  },
  cardsContainer: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
}