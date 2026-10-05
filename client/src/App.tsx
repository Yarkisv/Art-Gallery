import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ArtworkList from "./components/ArtworkList/ArtworkList";
import { useModal } from "./contexts/modal.context";
import AddArtworkForm from "./components/AddArtworkForm/AddArtworkForm";

function App() {
  const { isAddArtworkModalOpen } = useModal();

  return (
    <div className="app">
      <Header />
      <main>
        <ArtworkList />
      </main>
      <Footer />

      {isAddArtworkModalOpen && <AddArtworkForm />}
    </div>
  );
}

export default App;
