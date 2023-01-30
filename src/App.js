import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
class App extends React.Component {

  constructor() {
    super()
    this.state = {
      sisaUang: 0,
      presentaseUang: 0,
      pemasukkanUang: 0,
      pengeluaranUang: 0,
      transaksiMasuk: 0,
      transaksiKeluar: 0,
      summary: [
        {
          deskripsi: 'Menerima Gaji',
          tanggal: '1 July 2023',
          nominal: 1000000,
          category: 'IN'
        },
        {
          deskripsi: 'Beli Kebutuhan Pokok',
          tanggal: '3 July 2023',
          nominal: 200000,
          category: 'OUT'
        },
      ]
    }
    this.tambahItem = this.tambahItem.bind(this)
    this.fnHitung = this.fnHitung.bind(this)
  }

  tambahItem(object) {
    let newData = [...this.state.summary, object]
    let dataUangMasuk = newData.filter((item) => item.category === 'IN')
    let nominalUang = dataUangMasuk.map((item) => item.nominal)
    let jumlahUangMasuk = nominalUang.reduce((total, num) => total + num)

    let dataUangKeluar = newData.filter((item) => item.category === 'OUT')
    let nominalUangKeluar = dataUangKeluar.map((item) => item.nominal)
    let jumlahUangKeluar = nominalUangKeluar.reduce((total, num) => total + num)

    this.setState({
      pemasukkanUang: jumlahUangMasuk,
      transaksiMasuk: nominalUang.length,
      pengeluaranUang: jumlahUangKeluar,
      transaksiKeluar: nominalUangKeluar.length,
      sisaUang: jumlahUangMasuk - jumlahUangKeluar,
      presentaseUang: (jumlahUangMasuk - jumlahUangKeluar) / jumlahUangMasuk * 100
    })
  }

  fnHitung() {
    let dataUangMasuk = this.state.summary.filter((item) => item.category === 'IN')
    let nominalUang = dataUangMasuk.map((item) => item.nominal)
    let jumlahUangMasuk = nominalUang.reduce((total, num) => total + num)

    let dataUangKeluar = this.state.summary.filter((item) => item.category === 'OUT')
    let nominalUangKeluar = dataUangKeluar.map((item) => item.nominal)
    let jumlahUangKeluar = nominalUangKeluar.reduce((total, num) => total + num)

    this.setState({
      pemasukkanUang: jumlahUangMasuk,
      transaksiMasuk: nominalUang.length,
      pengeluaranUang: jumlahUangKeluar,
      transaksiKeluar: nominalUangKeluar.length,
      sisaUang: jumlahUangMasuk - jumlahUangKeluar,
      presentaseUang: (jumlahUangMasuk - jumlahUangKeluar) / jumlahUangMasuk * 100
    })
  }

  componentDidMount() {
    this.fnHitung()
  }

  render() {
    return (
      <>

        <div className='container py-5'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1 className='fw-bold'>Management Money</h1>
              <hr className='w-75 mx-auto mb-4 ' />
              <h2 className='fw-semibold'>Rp {this.state.sisaUang}</h2>
              <span className='title-md'>Sisa duit kamu tersisa {this.state.presentaseUang}% lagi</span>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-2'>
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className='title-sm '>Pemasukkan</span>
                <h3 className='fw-semibold'>Rp. {this.state.pemasukkanUang},-</h3>
                <div>
                  <span className='title-sm text-ungu fw-semibold'>{this.state.transaksiMasuk} </span>
                  <span className='title-sm'>Transaksi</span>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-2'>
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className='title-sm '>Pengeluaran</span>
                <h3 className='fw-semibold'>Rp. {this.state.pengeluaranUang},-</h3>
                <div>
                  <span className='title-sm text-ungu fw-semibold'>{this.state.transaksiKeluar} </span>
                  <span className='title-sm'>Transaksi</span>
                </div>
              </div>
            </div>
          </div>


          <div className='row mt-5'>
            <div className='col-12 d-flex justify-content-between align-items-center'>
              <h4>Ringkasan Transaksi</h4>
              <div className='wrapper-button d-flex'>
                <ModalCreate action={this.tambahItem} category="IN" variant="button btn-plus px-4 py-2 me-3" text="Pemasukkan" icon="bi bi-plus-square-fill" modalHeading="Tambah Pemasukkan"></ModalCreate>
                <ModalCreate action={this.tambahItem} category="OUT" variant="button btn-min px-4 py-2" text="Pengeluaran" icon="bi bi-dash-square-fill" modalHeading="Tambah Pengeluaran"></ModalCreate>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            {this.state.summary.map((sum, index) => {
              return (
                <div key={index} className='mb-4 col-12 d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center'>
                    <div className={sum.category === 'IN' ? 'icon-wrapper-in' : 'icon-wrapper-out'}>
                      <i className={sum.category === 'IN' ? 'bi bi-wallet2' : 'bi bi-bag-dash'}></i>
                    </div>

                    <div className='transaction ms-3 d-flex flex-column'>
                      <h6 className='fw-semibold'>{sum.deskripsi}</h6>
                      <span className='title-sm'> {sum.tanggal}</span>
                    </div>
                  </div>

                  <h5 className={sum.category === 'IN' ? 'text-money-in' : 'text-money-out'}>Rp.{sum.nominal}</h5>
                </div>
              )
            })}
          </div>

        </div>
      </>
    )
  }
}

class ModalCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      deskripsi: '',
      nominal: 0,
      tanggal: '',
      category: ''
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.tambahItem = this.tambahItem.bind(this)
  }

  handleClose() {
    this.setState({
      show: false
    })
  }

  handleShow() {
    this.setState({
      show: true,
      category: this.props.category
    })
  }

  tambahItem() {

    const Data = {
      deskripsi: this.state.deskripsi,
      nominal: parseInt(this.state.nominal),
      tanggal: this.state.tanggal,
      category: this.state.category
    }
    const fntambahItem = this.props.action
    fntambahItem(this.state)

    this.setState({
      show: false
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state);

  }
  render() {
    return (
      <>
        <button className={this.props.variant} onClick={this.handleShow}> {this.props.text} <i className={this.props.icon}></i></button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalHeading}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className='mb-3'>
              <label className='form-label'>Deskripsi</label>
              <input
                type="text"
                className='form-control'
                placeholder='Masukkan deskripsi'
                name='deskripsi'
                value={this.state.deskripsi}
                onChange={this.handleChange} />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Nominal</label>
              <input
                type="number"
                className='form-control'
                placeholder='Masukkan nominal'
                name='nominal'
                value={this.state.nominal}
                onChange={this.handleChange} />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Tanggal</label>
              <input
                type="date"
                className='form-control'
                placeholder='Masukkan tanggal'
                name='tanggal'
                value={this.state.tanggal}
                onChange={this.handleChange} />
            </div>

            <div >
              <input
                type="hidden"
                className='form-control'
                placeholder='Masukkan Category'
                name='category'
                value={this.state.category}
                onChange={this.handleChange} />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <button className={this.props.variant} onClick={this.tambahItem}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }


}

export default App;
