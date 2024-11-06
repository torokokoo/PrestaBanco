import './App.css'
import Navbar from '@/components/Navbar'
import LoanRequest from '@/components/LoanRequest'
import PendingLoans from '@/components/PendingLoans'
import ReviewLoan from '@/components/ReviewLoan'
import SearchRequest from '@/components/SearchRequest'
import Simulate from '@/components/Simulate'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar></Navbar>
      <Routes>
        <Route path="/home"></Route>
        <Route path="/loan/request" element={<LoanRequest />}></Route>
        <Route path="/executive/review" element={<PendingLoans />}></Route>
        <Route path="/executive/review/:id" element={<ReviewLoan />}></Route>
        <Route path="/loans/search" element={<SearchRequest />}></Route>
        <Route path="/simulate" element={<Simulate />}></Route>
      </Routes>
      </div>
    </Router>

  );
}

export default App
