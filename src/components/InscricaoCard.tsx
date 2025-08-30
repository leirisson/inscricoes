// src/components/InscricaoCard.tsx
import { format } from 'date-fns'


interface Inscricao {
  id: number
  athlete1Name: string
  athlete1CPF: string
  athlete2Name: string
  athlete2CPF: string
  category: string
  telefone: string
  authorizeImageUse: string
  data_inscricao: string
  photo: string
  paymentProof: string
}

type InscricaoCardProps = {
  inscricao: Inscricao
}

export default function InscricaoCard({ inscricao }: InscricaoCardProps) {
  const { 
    athlete1Name, 
    athlete1CPF, 
    athlete2Name, 
    athlete2CPF, 
    category, 
    telefone, 
    authorizeImageUse, 
    data_inscricao, 
    photo, 
    paymentProof 
  } = inscricao

  const dataFormatada = format(new Date(data_inscricao), 'dd/MM/yyyy \'às\' HH:mm')
  const usoImagemAutorizado = authorizeImageUse === 'true'

  // Formatar telefone para WhatsApp
  const telefoneLimpo = telefone.replace(/\D/g, '')
  const numeroWhatsApp = `55${telefoneLimpo}`
  
  const mensagem = encodeURIComponent(
    `Olá! Seu pagamento de inscrição foi verificado e sua inscrição foi confirmada com sucesso! 🎉\n\n` +
    `Categoria: ${category}\n` +
    `Atletas: ${athlete1Name} e ${athlete2Name}\n\n` +
    `Equipe FutVôlei`
  )

  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`

  return (
    <div style={styles.card}>
      {/* Tabela Superior */}
      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.labelCell}><strong>Categoria</strong></td>
            <td style={styles.valueCell}>{category}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}><strong>Atleta 1</strong></td>
            <td style={styles.valueCell}>{athlete1Name}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}><strong>CPF</strong></td>
            <td style={styles.valueCell}>{athlete1CPF}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}><strong>Atleta 2</strong></td>
            <td style={styles.valueCell}>{athlete2Name}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}><strong>CPF</strong></td>
            <td style={styles.valueCell}>{athlete2CPF}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}><strong>Telefone</strong></td>
            <td style={styles.valueCell}>{telefone}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}><strong>Data</strong></td>
            <td style={styles.valueCell}>{dataFormatada}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}><strong>Uso de Imagem</strong></td>
            <td style={usoImagemAutorizado ? styles.success : styles.danger}>
              {usoImagemAutorizado ? 'Autorizado' : 'Não autorizado'}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Imagens - Parte Inferior */}
      <div style={styles.photoSection}>
        <div style={styles.photoItem}>
          <h4 style={styles.subTitle}>Foto da Dupla</h4>
          <img src={photo} alt="Foto da dupla" style={styles.image} />
        </div>
        <div style={styles.photoItem}>
          <h4 style={styles.subTitle}>Comprovante</h4>
          <img src={paymentProof} alt="Comprovante de pagamento" style={styles.image} />
        </div>
      </div>

      {/* Botão de Confirmação */}
      <a
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        Confirmar Inscrição
      </a>
    </div>
  )
}

// Estilos centralizados
const styles = {
  card: {
    width: '100%',
    maxWidth: '700px',
    minHeight: '600px',
    margin: '16px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    border: '2px solid #e9e9e97a', // Borda preta padrão
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    boxSizing: 'border-box' as const,
    overflow: 'hidden', // Evita overflow
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginBottom: '20px',
    fontSize: '15px',
    tableLayout: 'fixed' as const,
    fontFamily: 'Segoe UI, Arial, sans-serif',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden' as const,
    border: '2px solid #000', // Borda preta mais forte ao redor da tabela
  },
  labelCell: {
    width: '30%',
    padding: '12px 14px',
    fontWeight: 'bold' as const,
    backgroundColor: '#167e39ff', // Fundo preto nos títulos
    color: '#fff', // Texto branco nos títulos
    border: '1px solid #000',
    textAlign: 'left' as const,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'top' as const,
  },
  valueCell: {
    width: '70%',
    padding: '12px 14px',
    backgroundColor: '#fafafa', // Fundo claro nas células de valor
    color: '#000', // Texto preto
    border: '1px solid #ddd',
    borderLeft: 'none' as const, // Remove borda duplicada
    textAlign: 'left' as const,
    whiteSpace: 'normal' as const,
    wordWrap: 'break-word' as const,
    verticalAlign: 'top' as const,
  },
  success: {
    color: '#2e7d32',
        backgroundColor: '#d1fab5ff',
    fontWeight: 'bold' as const,
    textAlign: 'left' as const,
     padding: '12px 14px',

  },
  danger: {
    color: '#c62828',
    backgroundColor: '#fac4c4ff',
    fontWeight: 'bold' as const,
    textAlign: 'left' as const,
    padding: '12px 14px',
  },
  photoSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginTop: '16px',
    flexWrap: 'wrap' as const,
  },
  photoItem: {
    flex: '1',
    minWidth: '280px',
    textAlign: 'center' as const,
  },
  subTitle: {
    margin: '8px 0 6px 0',
    fontSize: '15px',
    color: '#333',
    fontWeight: '600' as const,
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    height: '300px',
    objectFit: 'cover' as const, // Mantém proporção e corta se necessário
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginTop: '6px',
  },
  button: {
    display: 'block',
    width: '95%',
    padding: '14px',
    backgroundColor: '#25D366', // Verde WhatsApp
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    textDecoration: 'none',
    borderRadius: '8px',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s',
    border: 'none',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#128C7E',
  },
}