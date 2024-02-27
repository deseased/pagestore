import GoodList from '../GoodList/GoodList';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.app__heading}>Интернет-магазин</h1>
      <GoodList />
    </div>
  );
}

export default App;