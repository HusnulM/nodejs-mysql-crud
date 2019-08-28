const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app        = express();


//Koneksi ke mysql database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_nodejs'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Koneksi berhasil');
});

app.use(bodyParser.json());
app.listen(4000, () => console.log('Server berjalan di port 4000'));
app.use(express.static('public'));

//Baca Semua Data
app.get('/read',(req, res) => {

  let sql = "SELECT * FROM tbl_siswa";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

//Baca Data Berdasarkan NIS
app.get('/readbynis/:nis', async (req, res) =>{
	const nis = req.params.nis;
	console.log(nis);

	let sql = "SELECT * FROM tbl_siswa Where nis = "+ nis +"";
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});

//route untuk insert data
app.post('/api', (req, res) => {
	let action = req.body.action;
	let data = {nis: req.body.nis, nama: req.body.nama, alamat: req.body.alamat, hobi: req.body.hobi};
	let sql;

	if(action === 'Simpan'){
		sql = "INSERT INTO tbl_siswa SET ?";	
	}else{
		sql = `UPDATE tbl_siswa SET nama='`+req.body.nama+`', 
		        alamat='`+req.body.alamat+`', hobi='`+ req.body.hobi +`' 
		        WHERE nis='`+req.body.nis+`';`
	}
	
	console.log(sql);
	let query = conn.query(sql, data,(err, results) => {
	   if(err) throw err;
	   res.json(results);
	   console.log(results);
	});
});

//Baca Data Berdasarkan NIS
app.get('/hapus/:nis', async (req, res) =>{
	const nis = req.params.nis;
	console.log(nis);

	let sql = `DELETE FROM tbl_siswa Where nis = '`+ nis +`';`
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});
