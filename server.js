const express = require('express');
const cors = require('cors');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');


const app = express();
app.use(cors());
app.use(express.json());





// USB Yazıcıyı Bulma (Bağlı olan POS cihazını algılar)
const device = new escpos.USB();
const options = { encoding: "GB18030" }; // Türkçe karakter desteği için

const printer = new escpos.Printer(device, options);

// Adisyon Fişi Yazdırma İşlemi
app.post('/print', (req, res) => {
  const { items, total } = req.body;  // React uygulamanızdan gönderilen siparişler
  
  device.open((error) => {
    if (error) {
      console.error("Yazıcıya bağlanırken hata oluştu:", error);
      return res.status(500).send("Yazıcıya bağlanırken hata oluştu.");
    }

    printer
      .font('a')
      .align('ct')
      .style('b')
      .size(1, 1)
      .text('--- AFIYET OLSUN ---')
      .text('---------------------')
      .align('lt');

    items.forEach(item => {
      printer.text(`${item.name} - ${item.quantity} adet - ${item.price} TL`);
    });

    printer
      .text('---------------------')
      .text(`Toplam: ${total} TL`)
      .text('---------------------')
      .cut()
      .close();

    res.send("Fiş başarıyla yazdırıldı.");
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor...`));


escpos.USB = require('escpos-usb');