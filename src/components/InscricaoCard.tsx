// src/components/InscricaoCard.tsx
import { format } from 'date-fns'
import { useState } from 'react'

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

  // Estado para controle do modal de imagem
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Função para abrir o modal com a imagem clicada
  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    setModalOpen(true)
  }

  // Função para fechar o modal
  const closeModal = () => {
    setModalOpen(false)
    setSelectedImage(null)
  }

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
          <img
            src={photo}
            alt="Foto da dupla"
            style={styles.image}
            onClick={() => openModal(photo)}
            aria-label="Clique para ampliar a foto da dupla"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && openModal(photo)}
          />
        </div>
        <div style={styles.photoItem}>
          <h4 style={styles.subTitle}>Comprovante</h4>
          <img
            src={paymentProof}
            alt="Comprovante de pagamento"
            style={styles.image}
            onClick={() => openModal(paymentProof)}
            aria-label="Clique para ampliar o comprovante"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && openModal(paymentProof)}
          />
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

      {/* Modal de Imagem em Tela Cheia */}
      {modalOpen && selectedImage && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <button
            style={styles.closeButton}
            onClick={closeModal}
            aria-label="Fechar imagem ampliada"
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Imagem ampliada"
            style={styles.modalImage}
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar na imagem
          />
        </div>
      )}
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
    border: '2px solid #e9e9e97a',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
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
    border: '2px solid #000',
  },
  labelCell: {
    width: '30%',
    padding: '12px 14px',
    fontWeight: 'bold' as const,
    backgroundColor: '#167e39ff',
    color: '#fff',
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
    backgroundColor: '#fafafa',
    color: '#000',
    border: '1px solid #ddd',
    borderLeft: 'none' as const,
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
    objectFit: 'cover' as const,
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginTop: '6px',
    cursor: 'pointer', // Indica que é clicável
    transition: 'transform 0.2s',
  },
  imageHover: {
    transform: 'scale(1.02)',
  },
  button: {
    display: 'block',
    width: '95%',
    padding: '14px',
    backgroundColor: '#25D366',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    textDecoration: 'none',
    borderRadius: '8px',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    border: 'none',
    cursor: 'pointer',
  },

  // ✅ Novos estilos para o modal
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
    boxSizing: 'border-box' as const,
  },
  modalImage: {
    maxHeight: '90vh',
    maxWidth: '90vw',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    objectFit: 'contain' as const, // Mostra a imagem inteira, sem cortar
  },
  closeButton: {
    position: 'absolute' as const,
    top: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '50%',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold' as const,
    zIndex: 1001,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  },
}