import { Dashboard } from "./Components/dashboard";
import { Header } from "./Components/header";
import Modal from "react-modal"
import { useState } from "react"
import { NewTransactionModal } from "./Components/NewTransactionModal";
import { TransactionProvider } from "./hooks/useTransactions";

Modal.setAppElement("#root")

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function HandleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function HandleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }


  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={HandleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={HandleCloseNewTransactionModal}
      />
    </TransactionProvider>
  );
}

