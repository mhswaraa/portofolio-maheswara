<?php
class Pembayaran {
  public function bayar (){
    echo "Pembayaran Berhasil";
  }
}

$kasir = new Pembayaran();

$kasir->bayar();
?>