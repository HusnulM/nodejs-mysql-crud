
getData();
async function getData(){
	const response = await fetch('/read');
	const json = await response.json();
	console.log(json);
	showData(json);
}

const btnSave = document.getElementById('btn_save');
btnSave.addEventListener('click', async event => {

	const action = btnSave.textContent;

	const nis    = document.getElementById('nis').value;
	const nama   = document.getElementById('nama').value;
	const alamat = document.getElementById('alamat').value;
	const hobi   = document.getElementById('hobi').value;

	let data = {
		nis : nis,
		nama : nama,
		alamat : alamat,
		hobi : hobi,
		action : action
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	const response = await fetch('/api', options);
	const json = await response.json();
	console.log(json);
	
	getData();

	$('#exampleModal').modal('hide');

	if(action === 'Simpan'){
		$.alert('Data Berhasil ditambah!');
	}else{
		$.alert('Data Berhasil dirubah!');
	}
});

function showData(json){
	let tr = '';
	$('#databody').html('');
	let no;
	for (let i = 0; i < json.length; i++) {
		no = i + 1;
		tr = $('<tr/>');
		tr.append("<td>" + no + "</td>");
		tr.append("<td>" + json[i].nis + "</td>");
		tr.append("<td>" + json[i].nama + "</td>");
		tr.append("<td>" + json[i].alamat + "</td>");
		tr.append("<td>" + json[i].hobi + "</td>");
		tr.append(`
			<td>
				<button type="button" class="badge badge-primary badge-pill btnEdit" data-nis="`+ json[i].nis +`">
					Edit
				</button>
				<button type="button" class="badge badge-danger badge-pill btnHapus" data-nis="`+ json[i].nis +`">
					Hapus
				</button>
			</td>`
		);
		$('#databody').append(tr);
	}

	//Jquery Selector
	$(function(){
		$('.btnTambahData').on('click', function(){
			document.getElementById('nis').readOnly = false;
			document.getElementById('nis').value = '';
			document.getElementById('nama').value = '';
			document.getElementById('alamat').value = '';
			document.getElementById('hobi').value = '';

	        $('#exampleModalLabel').html('Tambah Data Siswa');
	        $('.modal-footer button[id=btn_save]').html('Simpan');
	    });

		$('.btnEdit').on('click', async function(){
		    let nis = $(this).data('nis');
		    console.log(nis);


		    const url = `readbynis/${nis}`;
			const response = await fetch(url);
			const json = await response.json();
			console.log(json[0].nis);

			document.getElementById('nis').readOnly = true;
			document.getElementById('nis').value = json[0].nis;
			document.getElementById('nama').value = json[0].nama;
			document.getElementById('alamat').value = json[0].alamat;
			document.getElementById('hobi').value = json[0].hobi;

		    $('#exampleModalLabel').html('Ubah Data Siswa');
        	$('.modal-footer button[id=btn_save]').html('Ubah Data');
		    $('#exampleModal').modal('show');
		});

		$('.btnHapus').on('click', async function(){
			let nis = $(this).data('nis');

			$.confirm({
			    title: 'Hapus Data Siswa',
			    content: 'Apakah Anda Yakin...???',
			    buttons: {
			        ya: {
			        	text: 'YA',
			            btnClass: 'btn-blue',
			            action: async function(){
			                const url = `hapus/${nis}`;
							const response = await fetch(url);
							const json = await response.json();
			            	$.alert('Data Berhasil dihapus!');
			            	getData();
			            }
			        },
			        tidak: function () {
			            
			        }
			    }
			});
		});
	})
}