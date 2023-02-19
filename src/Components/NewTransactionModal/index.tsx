import Modal from "react-modal"
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import close from "../../assets/close.svg"
import income from "../../assets/income.svg"
import outcome from "../../assets/outcome.svg"
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";



interface NewTransactionModalProps {
  onRequestClose: () => void;
  isOpen: boolean;
}

export function NewTransactionModal({ onRequestClose, isOpen }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()


  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState("deposit")

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle("")
    setCategory("")
    setAmount(0)
    setType("deposit")
    onRequestClose()
  }

  return (
    <Modal
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close">
        <img src={close} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadatrar transação</h2>

        <input
          placeholder="Titulo"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType("deposit") }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={income} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => { setType("withdraw") }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcome} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>

      </Container>

    </Modal>
  )
}