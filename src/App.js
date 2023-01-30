import './App.css';
import React from 'react';
import ModalCreate from './components/ModalCreate';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang: 0,
      persentasiUang: 0,
      pemasukanUang: 0,
      pengeluaranUang: 0,
      transaksiIN: 0,
      transaksiOUT: 0,
      summary: [],
    }

    this.tambahItem = this.tambahItem.bind(this)
    this.fnHitung = this.fnHitung.bind(this)
  }

  tambahItem(objek) {
    let newData = [...this.state.summary, objek]

    let dataUangIN = newData.filter((item) => item.kategori === 'IN')
    let nominalUangIN = dataUangIN.map((item) => item.nominal)
    let jumlahUangIN = nominalUangIN.reduce((total, num) => total + num, 0)

    let dataUangOUT = newData.filter((item) => item.kategori === 'OUT')
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal)
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0)

    this.setState({
      pemasukanUang: jumlahUangIN,
      transaksiIN: nominalUangIN.length,
      pengeluaranUang: jumlahUangOUT,
      transaksiOUT: nominalUangOUT.length,
      sisaUang: jumlahUangIN - jumlahUangOUT,
      persentasiUang: (jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100,
      summary: newData,
    })




  }

  fnHitung() {
    let dataUangIN = this.state.summary.filter((item) => item.kategori === 'IN')
    let nominalUangIN = dataUangIN.map((item) => item.nominal)
    let jumlahUangIN = nominalUangIN.reduce((total, num) => total + num)

    let dataUangOUT = this.state.summary.filter((item) => item.kategori === 'OUT')
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal)
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num)

    this.setState({
      pemasukanUang: jumlahUangIN,
      transaksiIN: nominalUangIN.length,
      pengeluaranUang: jumlahUangOUT,
      transaksiOUT: nominalUangOUT.length,
      sisaUang: jumlahUangIN - jumlahUangOUT,
      persentasiUang: (jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100,

    })
  }


  componentDidMount() {
    if (this.state.summary.length < 1) {
    } else {
      this.fnHitung()
    }
  }

  render() {
    return (
      <>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1 className='fw-bold'>FEEDUITEN APPS</h1>
              <hr className='w-75 mx-auto' />
              <h2 className='fw-bold'>Rp {this.state.sisaUang},-</h2>
              <span className='title-md'>Sisa uang kamu tersisa {this.state.persentasiUang}% lagi</span>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper-in mb-1'>
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className='title-sm'>Pemasukan</span>
                <h3 className='fw-bold'>Rp {this.state.pemasukanUang},-</h3>
                <div>
                  <span className='title-sm text-ungu fw-bold'>{this.state.transaksiIN}</span><span className='title-sm'> Transaksi</span>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper-out mb-1'>
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className='title-sm'>Pengeluaran</span>
                <h3 className='fw-bold'>Rp {this.state.pengeluaranUang},-</h3>
                <div>
                  <span className='title-sm text-ungu fw-bold'>{this.state.transaksiOUT}</span><span className='title-sm'> Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-12 d-flex justify-content-between align-items-center'>
              <h4>Ringkasan Transaksi</h4>
              <div className='button-wrapper d-flex'>
                <ModalCreate action={this.tambahItem} kategori="IN" variant="button btn-ungu px-3 py-2 me-2" text="Pemasukan" icon="bi bi-plus-circle-fill" modalHeading="Tambahkan Pemasukan" />
                <ModalCreate action={this.tambahItem} kategori="OUT" variant="button btn-pink px-3 py-2" text="Pengeluaran" icon="bi bi-dash-circle-fill" modalHeading="Tambahkan Pengeluaran" />
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            {this.state.summary.length < 1 && <Alert />}
            {this.state.summary.map((sum, index) => {
              return (
                <div key={index} className='col-12 mb-3 d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center'>
                    <div className={sum.kategori === 'IN' ? 'icon-wrapper-in' : 'icon-wrapper-out'}>
                      <i className={sum.kategori === 'IN' ? 'bi bi-wallet2' : 'bi bi-bag-dash'}></i>
                    </div>
                    <div className='transaction ms-3 d-flex flex-column'>
                      <h6>{sum.deskripsi}</h6>
                      <span className='title-sm'>{sum.tanggal}</span>
                    </div>
                  </div>

                  <h5 className={sum.kategori === 'IN' ? 'text-money-in' : 'text-money-out'} >Rp {sum.nominal}</h5>
                </div>
              )
            })}

          </div>
        </div>
      </>
    )
  }
}


class Alert extends React.Component {
  // constructor() {
  //   super()
  // }

  render() {
    return (
      <h1>Data Masih Kosong</h1>
    )
  }

}


export default App;
