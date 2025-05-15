var glbTotalAgent = 0;
var glbTotalOmniChat = 0;
var glbTotalCommentAndMore = 0;
var glbTotalVoice = 0;
var glbTotalEmail = 0;
var GlobalAgent = [];
var jsonListData = [];
$(document).ready(function () {
    QA_DataLoad();

    console.log("Scheme!")
    $('#addContactModal').on('show.bs.modal', function (e) {
        // Lakukan sesuatu saat modal akan ditampilkan
        console.log('Modal akan ditampilkan' + $("#AgentID").val());
        EDIT_DataLoad($("#AgentID").val(), "AllDays");
        //$("#save-schedule").hide();
        //$("#Update").show();
    });


    $('#mySelect').change(function () {
        var selectedValue = $(this).val();
        listAgentChoose(selectedValue);
        TabListDays(selectedValue);

        
    });

    $('#selectedItems').click(function () {
        if ($("#myChannel").val() == "") {
            swal(
                '',
                'Silahkan pilih channel terlibih dahulu.',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    });

    $('#myChannel').change(function () {
        var selectedValue = $(this).val();
        var selectedText = $(this).find('option:selected').text();
        var selectedGroup = $('#mySelect').find('option:selected').text();
        listAgentChooseChannel(selectedGroup, selectedText);


        const tabContentContainer =$('#tab-content-container').val();
        const tabsContainer = document.getElementById('tabs-container');
        const activeTab = tabsContainer.querySelector('.nav-link.active');

        if (activeTab) {

            var day = activeTab.innerText.split('\n')[0].trim();
            const dayMap = new Map([
                ['sunday', 'Minggu'],
                ['monday', 'Senin'],
                ['tuesday', 'Selasa'],
                ['wednesday', 'Rabu'],
                ['thursday', 'Kamis'],
                ['friday', 'Jumat'],
                ['saturday', 'Sabtu']
            ]);

            // Reverse the mapping (Indonesian => English)
            const reverseDayMap = new Map(
                [...dayMap].map(([english, indonesian]) => [indonesian, english])
            );

            var groupName = reverseDayMap.get(day);
            const checkboxes = document.querySelectorAll(`#schedule-table-${groupName} input[type="checkbox"]`);
            checkboxes.forEach(checkbox => {
                const channelName = checkbox.value.split('-').slice(-1).join(' ');
                if (channelName !== selectedValue) {
                    checkbox.disabled = true;
                    checkbox.checked = false;  
                } else {
                    checkbox.disabled = false;
                    
                    checkbox.checked = true;
                }

            });

            getDataDays(day, selectedValue);
          //  CheckSchema4Minggu(day, selectedValue);

          
            
        }

    });
    //EDIT_DataLoad(2520);
    const tabsContainer = document.getElementById('tabs-container');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    scrollLeftBtn.addEventListener('click', () => {
        tabsContainer.scrollLeft -= 100; 
    });

    scrollRightBtn.addEventListener('click', () => {
        tabsContainer.scrollLeft += 100; 
    });

    TabListDays("1");
    $('#addContactModal').on('hidden.bs.modal', function () {
        location.reload(); 
    });

    $('.navTabs').on('click', function () {
        const tabsContainer = document.getElementById('tabs-container');
        const activeTab = tabsContainer.querySelector('.nav-link.active');
        var selectedValue = $("#myChannel").val();

        if (activeTab) {

            var day = activeTab.innerText.split('\n')[0].trim();
            const dayMap = new Map([
                ['sunday', 'Minggu'],
                ['monday', 'Senin'],
                ['tuesday', 'Selasa'],
                ['wednesday', 'Rabu'],
                ['thursday', 'Kamis'],
                ['friday', 'Jumat'],
                ['saturday', 'Sabtu']
            ]);

            // Reverse the mapping (Indonesian => English)
            const reverseDayMap = new Map(
                [...dayMap].map(([english, indonesian]) => [indonesian, english])
            );

            var groupName = reverseDayMap.get(day);
            const checkboxes = document.querySelectorAll(`#schedule-table-${groupName} input[type="checkbox"]`);
            checkboxes.forEach(checkbox => {
                const channelName = checkbox.value.split('-').slice(-1).join(' ');
                if (channelName !== selectedValue) {
                    checkbox.disabled = true;
                    checkbox.checked = false;
                } else {
                    checkbox.disabled = false;

                    checkbox.checked = true;
                }


            });

            getDataDays(day, selectedValue);
            CheckSchemaPerhari(day, selectedValue);

            

           

        }
        
    });

});

//$('input[type="checkbox"][name="selectArray[]"]').on('change', function () {
//       // Dapatkan value saat ini
//       let currentValue = $(this).is(':checked') ? $(this).val() : null; // Jika dicentang, ambil value, jika tidak, set null

//       // Dapatkan value sebelumnya
//       let previousValue = $(this).data('prev-value') || null; // Ambil value sebelumnya dari data attribute

//       // Debug log untuk melihat perbedaan nilai sebelumnya dan sekarang
//       console.log(`Checkbox ${$(this).attr('name')} - Previous Value: ${previousValue}, Current Value: ${currentValue}`);

//       // Simpan value saat ini sebagai value sebelumnya untuk perubahan berikutnya
//       $(this).data('prev-value', currentValue);
//   });

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('add-row-btn-monday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-monday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
            <select name="start-time-${dayName.toLowerCase()}-hour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <!-- Other hour options -->
            </select> : 
            <select name="start-time-${dayName.toLowerCase()}-minute">
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
            <select name="end-time-${dayName.toLowerCase()}-hour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <!-- Other hour options -->
            </select> : 
            <select name="end-time-${dayName.toLowerCase()}-minute">
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        //endSelect.innerHTML = `
        //    <select name="ONOFF-${dayName.toLowerCase()}">
        //        <option value="ON">ON</option>
        //        <option value="OFF">OFF</option>

        //    </select>`;
        endSelect.innerHTML = `
            <input type="checkbox" id="ONOFF-${dayName.toLowerCase()}" name="ONOFF-${dayName.toLowerCase()}" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';">`;

        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-monday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-monday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-monday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }



    if (e.target && e.target.classList.contains('add-row-btn-tuesday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-tuesday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
            <select name="start-time-${dayName.toLowerCase()}-hour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <!-- Other hour options -->
            </select> : 
            <select name="start-time-${dayName.toLowerCase()}-minute">
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
            <select name="end-time-${dayName.toLowerCase()}-hour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <!-- Other hour options -->
            </select> : 
            <select name="end-time-${dayName.toLowerCase()}-minute">
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        //endSelect.innerHTML = `
        //    <select name="ONOFF-${dayName.toLowerCase()}">
        //        <option value="ON">ON</option>
        //        <option value="OFF">OFF</option>l

        //    </select>`;
        endSelect.innerHTML = `
            <input type="checkbox" id="ONOFF-${dayName.toLowerCase()}" name="ONOFF-${dayName.toLowerCase()}" value="ON" onchange="this.value=this.checked ? 'ON' : 'OFF';">`;

        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-tuesday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-tuesday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-tuesday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }


    if (e.target && e.target.classList.contains('add-row-btn-wednesday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-wednesday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-wednesday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-wednesday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-wednesday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }



    if (e.target && e.target.classList.contains('add-row-btn-thursday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-thursday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-thursday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-thursday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-thursday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }


    if (e.target && e.target.classList.contains('add-row-btn-friday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-friday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-friday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-friday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-friday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }


    if (e.target && e.target.classList.contains('add-row-btn-saturday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-saturday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-saturday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-saturday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-saturday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }

    if (e.target && e.target.classList.contains('add-row-btn-sunday')) {
        var currentRow = e.target.closest('tr');
        var table = document.getElementById('schedule-table-sunday').getElementsByTagName('tbody')[0];

        // Buat baris baru di bawah baris yang diklik
        var newRow = table.insertRow(currentRow.rowIndex);

        // Ambil nama hari dari baris sebelumnya
        var dayName = currentRow.cells[1].innerText;

        // Ambil nilai jam dan menit dari waktu selesai pada baris sebelumnya
        //var prevEndHour = currentRow.cells[3].querySelector('select[name^="end-time-"]:first-of-type').value;
        //var prevEndMinute = currentRow.cells[3].querySelector('select[name^="end-time-"]:last-of-type').value;

        // Tambahkan sel untuk checkbox
        var cell1 = newRow.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.name = 'select-' + dayName.toLowerCase();
        cell1.appendChild(checkbox);

        // Tambahkan sel untuk nama hari
        var cell2 = newRow.insertCell(1);
        cell2.innerText = dayName; // Menggunakan nama hari yang sama

        // Tambahkan sel untuk waktu mulai
        var cell3 = newRow.insertCell(2);
        var startSelect = document.createElement('div');
        startSelect.className = 'time-select';
        startSelect.innerHTML = `
        <select name="start-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="start-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell3.appendChild(startSelect);

        // Tambahkan sel untuk waktu selesai
        var cell4 = newRow.insertCell(3);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="end-time-${dayName.toLowerCase()}-hour">
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <!-- Other hour options -->
        </select> : 
        <select name="end-time-${dayName.toLowerCase()}-minute">
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>`;
        cell4.appendChild(endSelect);

        var cell5 = newRow.insertCell(4);
        var endSelect = document.createElement('div');
        endSelect.className = 'time-select';
        endSelect.innerHTML = `
        <select name="ONOFF-${dayName.toLowerCase()}">
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
            
        </select>`;
        cell5.appendChild(endSelect);
        // Tambahkan sel untuk tombol "Add Row"
        var cell6 = newRow.insertCell(5);
        var addButton = document.createElement('a');
        addButton.className = 'add-row-btn-sunday';
        addButton.textContent = 'Add Row | ';
        cell6.appendChild(addButton);
        // var cell6 = newRow.insertCell(5);
        var removeButton = document.createElement('a');
        removeButton.className = 'remove-row-btn-sunday';
        removeButton.textContent = 'Remove Row';
        cell6.appendChild(removeButton);
    }
    // Fungsi untuk menghapus baris
    if (e.target && e.target.classList.contains('remove-row-btn-sunday')) {
        var currentRow = e.target.closest('tr');
        currentRow.parentNode.removeChild(currentRow);
    }
});

// Function to uncheck all checkboxes
function clearAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function viewChannelAssign(dateAssign, name,channel) {

    console.log($("#AgentID").val());
    $("#selectedItems").val(name);
    $("#myChannel").val(channel);
    console.log(dateAssign);




    console.log("{TrxID:'" + $("#AgentID").val() + "', TrxUserName: '" + dateAssign + "', TrxAction: 'LIST', TrxActionType: 'DETAILSCHEDULESCHEME'}");
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + $("#AgentID").val() + "', TrxUserName: '" + dateAssign + "', TrxAction: 'LIST', TrxActionType: 'DETAILSCHEDULESCHEME'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("EditDataLoad");
            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(json);
            clearAllCheckboxes();

            // Target tbody dalam tabel
            json.forEach(item => {
                const checkbox = document.getElementById(item.NameSelect);

                if (checkbox) {
                    checkbox.checked = true; // Atur checkbox menjadi checked
                }
                const tabs = document.querySelectorAll('.nav-link');
    //            tabs.forEach(tab => tab.classList.remove('active'));


    //            const tuesdayTab = document.querySelector('a[href="#Tuesday"]');
    //if (tuesdayTab) {
    //    tuesdayTab.classList.add('active');
    //} else {
    //    console.error('No tab for Tuesday found.');
    //}
                
    //            document.querySelector('a[href="#Selasa"]').classList.add('active');

               // const activeTab = document.querySelector('.nav-link.active');
               // if (activeTab) {
               //     activeTab.setAttribute('data-id', `${item.NameSelect}`);
                //}

                //const checkbox = document.getElementById(item.NameSelect);
                //if (checkbox.length > 0) {
                //    checkbox[0].checked = true; // Mark the checkbox as checked
                //}
            });




        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}



function TabListDays(type) {
    console.log("1234");
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'LISTDAYS'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (dataNya) {
            console.log("adada");
            var json = JSON.parse(dataNya.d);
            var i, x, result = "";

            console.log(json);
            const data = json;
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
                data: JSON.stringify({
                    TrxID: type,
                    TrxUserName: $("#hd_sessionLogin").val(),
                    TrxAction: 'LIST',
                    TrxActionType: 'LISTChannel'
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (dataResponse) {
                    console.log("AJAX request for days successful.");
                    let channels = JSON.parse(dataResponse.d);
                    $('#myChannel').empty();

                    // Append a default option (optional)
                    $('#myChannel').append('<option value="">Select a channel</option>');

                    // Loop through the channels array and append each as an option
                    $.each(channels, function (index, channel) {
                        $('#myChannel').append(
                            $('<option>', {
                                value: channel.id,
                                text: channel.name
                            })
                        );
                    });



                    const weekdays = {
                        "Monday": "Senin",
                        "Tuesday": "Selasa",
                        "Wednesday": "Rabu",
                        "Thursday": "Kamis",
                        "Friday": "Jumat",
                        "Saturday": "Sabtu",
                        "Sunday": "Minggu"
                    };

                    const tabsContainer = document.getElementById('tabs-container');
                    const tabContentContainer = document.getElementById('tab-content-container');
                    tabsContainer.innerHTML = '';
                    tabContentContainer.innerHTML = '';

                    function generateTab(day, label, date, active = false) {
                        return `
                    <li class="nav-item">
                        <a class="nav-link ${active ? 'active' : ''}" data-bs-toggle="tab" href="#${day}" role="tab">
                            <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                            <span class="d-none d-sm-block">${label}</span> 
                            <br>
                            <span class="d-none d-sm-block">${date}</span>
                        </a>
                    </li>
                `;

                    }


                    

                    function generateTabContent(day, channels, date, active = false) {
                        let tableRows = '';

                        channels.forEach(channel => {

                            const name = `select-${date}-${channel.name}`.toLowerCase();
                            const value = `${date}-${channel.name}`;
                            const nameNya = `select-${date}`.toLowerCase();
                            tableRows += `
                                    <tr>
                                        <td>
                                            <input type="checkbox" name="${nameNya}"  onchange="handleCheckboxChange(this)" class="form-check-input" id="${name}" value="${value}">
                                        </td>
                                        <td>${channel.name}</td>
                                        <td>${channel.description}</td>
                                    </tr>
                                `;

                        });


                        return `
                            <div class="tab-pane ${active ? 'active' : ''}" id="${day}" role="tabpanel">
                                <div class="row">
                                    <div class="col-md-12">
                                        <table id="schedule-table-${day.toLowerCase()}" class="table table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Choose</th>
                                                    <th>Channel</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${tableRows}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!--<div class="modal-footer">
                                    <button type="button" class="btn btn-light w-sm" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionUpdate()" id="Update">Update</button>
                                    <button type="button" class="btn btn-primary w-sm" id="save-schedule-${day.toLowerCase()}">Add</button>
                                    <button type="button" class="btn btn-primary w-sm" onclick="ActionDelete()" id="Delete">Delete</button>
                                </div>-->
                            </div>
                        `;
                    }

                    // Generate tabs and tab content for this week
                    Object.keys(weekdays).forEach((day, index) => {
                        const label = weekdays[day];
                        const date = data[0][day];
                        const active = index === 0;

                        const tabItem = generateTab(day, label, date, active);
                        tabsContainer.innerHTML += tabItem;

                        const tabContent = generateTabContent(day, channels, date, active);
                        tabContentContainer.innerHTML += tabContent;
                    });

                    // Separator
                    tabsContainer.innerHTML += '<li>  | | </li>';

                    // Generate tabs and tab content for next week
                    Object.keys(weekdays).forEach((day) => {
                        const nextWeekDay = day + "NextWeek";
                        const label = weekdays[day];
                        const date = data[0][nextWeekDay];

                        const tabItem = generateTab(nextWeekDay, label, date);
                        tabsContainer.innerHTML += tabItem;

                        const tabContent = generateTabContent(nextWeekDay, channels, date);
                        tabContentContainer.innerHTML += tabContent;
                    });
                    tabsContainer.innerHTML += '<li> | | </li>';
                    // Generate tabs and tab content for next week
                    Object.keys(weekdays).forEach((day) => {
                        const nextWeekDay = day + "Ke3";
                        const label = weekdays[day];
                        const date = data[0][nextWeekDay];

                        const tabItem = generateTab(nextWeekDay, label, date);
                        tabsContainer.innerHTML += tabItem;

                        const tabContent = generateTabContent(nextWeekDay, channels, date);
                        tabContentContainer.innerHTML += tabContent;
                    });

                    tabsContainer.innerHTML += '<li> | | </li>';
                    // Generate tabs and tab content for next week
                    Object.keys(weekdays).forEach((day) => {
                        const nextWeekDay = day + "Ke4";
                        const label = weekdays[day];
                        const date = data[0][nextWeekDay];

                        const tabItem = generateTab(nextWeekDay, label, date);
                        tabsContainer.innerHTML += tabItem;

                        const tabContent = generateTabContent(nextWeekDay, channels, date);
                        tabContentContainer.innerHTML += tabContent;
                    });
                    //

                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.error("Failed to fetch days:", xmlHttpRequest.responseText);
                    alert("Error fetching days. Please try again.");
                }
            });

            //



            ///
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })


}

function handleDateClick(date) {
    // Your logic for handling the date click goes here
    //alert('You clicked on date: ' + date);
}


function ActionUpdate() {
    const selectedData = [];
    console.log("Hai ini update!");
    //// Mengambil semua checkbox yang dicentang
    //let checkedCheckboxes = $('input[type="checkbox"]:checked');

    //// Melakukan sesuatu dengan checkbox yang dicentang
    //checkedCheckboxes.each(function () {
    //    console.log($(this).val()); // atau $(this).attr('id'), dll.
    //    selectedData.push({
    //        day: $(this).val(), // Hari atau tanggal dari tab
    //        agentid: $('#AgentID').val()
    //    });
    //});
    //const jsonData = JSON.stringify(selectedData);
    //console.log(jsonData);

    // Loop melalui semua tab
    document.querySelectorAll('.tab-pane').forEach(tab => {
        const tabId = tab.id; // Contoh: "Monday", "TuesdayNextWeek", dll.
        const checkboxes = tab.querySelectorAll('input[type="checkbox"]:checked');

        // Loop melalui semua checkbox yang dipilih dalam tab
        checkboxes.forEach(checkbox => {
            const value = checkbox.value;
            const [year, month, day, channel] = value.split('-');

            selectedData.push({
                day: tabId, // Hari atau tanggal dari tab
                year: year, // Tahun
                month: month, // Bulan
                date: day,
                username: $('#AgentID').val(),
                channel: channel
            });
        });
    });

    // Konversi array data menjadi JSON
    const jsonData = JSON.stringify(selectedData);

    if ($("#AgentID").val() == "") {
        swal(
            '',
            'Agent ID is empty!',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    // Debug: Cetak hasilnya di console
    console.log('Selected Data:', jsonData);

    // Kirim data ke API menggunakan fetch (atau Anda bisa menggunakan axios)
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
        data: "{TrxID:'" + jsonData + "', TrxUserName: '" + $("#AgentID").val() + "', TrxAction: 'INSERT', TrxActionType: 'UpdateAgentScheme'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);
            for (i = 0; i < json.length; i++) {

                if (json[i].MessageNya == "Success") {
                    swal(
                        '',
                        'Data berhasil di input!',
                        'success'
                    ).then(function () {
                        location.reload();

                    });

                } else {
                    swal(
                        '',
                        'Mohon maaf data melebihi dari ' + json[i].JumlahParam + ' jumlah maksimal!',
                        'error'
                    ).then(function () {
                        return false;
                    });
                    return false;
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            swal(
                '',
                xmlHttpRequest.responseText,
                'error'
            ).then(function () {
                return false;
            });
            return false;
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })



    //// Reset array nilai sebelumnya sebelum submit
    //previousValues = [];

    // Loop melalui setiap select
    //$('input[type="checkbox"][name="selectArray[]"]').each(function (index) {
    //    let currentValue = $(this).prop('checked');
    //    let previousValue = $(this).data('prev-value') || false;

    //    console.log(`Checkbox ${index + 1}: Previous Value = ${previousValue}, Current Value = ${currentValue}`);

    //    $(this).data('prev-value', currentValue); // Update nilai sebelumnya
    //});
}

function saveSchedule() {
    const selectedData = [];

    // Loop melalui semua tab
    document.querySelectorAll('.tab-pane').forEach(tab => {
        const tabId = tab.id; // Contoh: "Monday", "TuesdayNextWeek", dll.
        const checkboxes = tab.querySelectorAll('input[type="checkbox"]:checked');


        // Loop melalui semua checkbox yang dipilih dalam tab
        checkboxes.forEach(checkbox => {
            const value = checkbox.value;

            // Pecah value menjadi tahun, bulan, tanggal, dan channel
            const [year, month, day, channel] = value.split('-');
            var idData = $('#AgentID').val();
            var usernames = idData.split(';'); // Split idData into an array

            usernames.forEach((username) => {
                selectedData.push({
                    day: tabId, // Hari atau tanggal dari tab
                    year: year, // Tahun
                    month: month, // Bulan
                    date: day, // Tanggal
                    username: username, // Individual username
                    channel: channel // Nama channel
                });
            });
        });
    });

    // Konversi array data menjadi JSON
    const jsonData = JSON.stringify(selectedData);

    if ($("#AgentID").val() == "") {
        swal(
            '',
            'Agent ID is empty!',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    // Debug: Cetak hasilnya di console
    console.log('Selected Data:', jsonData);

    // Kirim data ke API menggunakan fetch (atau Anda bisa menggunakan axios)
    // Trigger confirmation before sending AJAX request
    swal({
        title: "Are you sure?",
        text: "Do you want to save the agent schedule?",
        icon: "warning",
        buttons: ["Cancel", "Yes, Save it!"],
        dangerMode: true
    }).then(function (willSave) {
        if (willSave) {
            // Proceed with AJAX call only if user confirmed
            $.ajax({
                type: "POST",
                url: "asmx/SCH_CreateShifts.asmx/UIDESK_SCH_InsertAgentSchedule",
                data: "{TrxID:'" + jsonData + "', TrxUserName: '" + $("#AgentID").val() + "', TrxAction: 'INSERT', TrxActionType: 'AgentScheme'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var json = JSON.parse(data.d);
                    console.log(data.d);

                    for (var i = 0; i < json.length; i++) {
                        if (json[i].MessageNya === "Success") {



                            swal('', 'Data berhasil di input!', 'success').then(function () {
                                const currentDate = new Date(); 
                                const currentYear = currentDate.getFullYear();
                                const currentMonth = currentDate.getMonth() + 1; 
                                const currentDay = currentDate.getDate(); // Day of the month

                                // Format the date (e.g., 'tahun=2024&bulan=11&hari=senin')
                                const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']; // Array for day names in Bahasa
                                const currentDayName = dayNames[currentDate.getDay()]; // Get the name of the current day

                                // Open CreateSchedule.html in a new tab with dynamic date parameters
                                window.open(`CreateSchedule.html?tahun=${currentYear}&bulan=${currentMonth}&hari=${currentDayName}&channel=Voice`, '_blank');
                            });

                        } else {
                            swal('', 'error', 'error').then(function () {
                                return false;
                            });
                            return false;
                        }
                    }
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    swal('', xmlHttpRequest.responseText, 'error').then(function () {
                        return false;
                    });
                    console.log(xmlHttpRequest.responseText);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        } else {
            // User cancelled the action, no need to save
            console.log("User cancelled saving.");
        }
    });

}


function listAgent() {

    //  alert($('#mySelect').val());
    var resultHeader = "";
    var result = "";
    var messageDiv = $('#DataListAgents');
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LISTAGENT', TrxActionType: 'VIEWTERJADWAL'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            console.log(data.d);
            messageDiv.empty();
            resultHeader = '<p>' +
                '<input type="search" class="form-control" placeholder="Search..." id="searchDropdown">' +
                '</p>';
            for (i = 0; i < json.length; i++) {
                result +=
                    '<li>' +
                    '<label class="dropdown-item">' +
                    '<input type="checkbox" class="form-check-input me-2" value="' + json[i].USERID + '"> ' + json[i].USERNAME + ' - ' + json[i].NAME + '-' + json[i].Site
                '</label>' +
                    '</li>';
                feather.replace();


            }
            messageDiv.append(resultHeader + result);
            // Inisialisasi ulang event listener jika ada
            inisialisasiEventListener();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function listAgentChoose(Id) {

    // alert($('#mySelect').val());
    var resultHeader = "";
    var result = "";
    var messageDiv = $('#DataListAgents');
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + Id + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LISTAGENT', TrxActionType: 'VIEWTERJADWAL'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            console.log(data.d);
            messageDiv.empty();
            resultHeader = '<p>' +
                '<input type="search" class="form-control" placeholder="Search..." id="searchDropdown">' +
                '</p>';
            for (i = 0; i < json.length; i++) {
                result +=
                    '<li>' +
                    '<label class="dropdown-item">' +
                    '<input type="checkbox" class="form-check-input me-2" value="' + json[i].USERID + '"> ' + json[i].USERNAME + ' - ' + json[i].NAME
                '</label>' +
                    '</li>';
                feather.replace();


            }
            messageDiv.append(resultHeader + result);
            // Inisialisasi ulang event listener jika ada
            inisialisasiEventListener();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function listAgentChooseChannel(Id,Channel) {

    // alert($('#mySelect').val());
    var resultHeader = "";
    var result = "";
    var messageDiv = $('#DataListAgents');
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + Id + "', TrxUserName: '" + $("#Channel").val() + "', TrxAction: 'LISTAGENT', TrxActionType: 'VIEWTERJADWALCHANNEL'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            console.log(data.d);
            messageDiv.empty();
            resultHeader = '<p>' +
                '<input type="search" class="form-control" placeholder="Search..." id="searchDropdown">' +
                '</p>';
            for (i = 0; i < json.length; i++) {
                result +=
                    '<li>' +
                    '<label class="dropdown-item">' +
                    '<input type="checkbox" class="form-check-input me-2" value="' + json[i].USERID + '"> ' + json[i].USERNAME + ' - ' + json[i].NAME
                '</label>' +
                    '</li>';
                feather.replace();


            }
            messageDiv.append(resultHeader + result);
            // Inisialisasi ulang event listener jika ada
            inisialisasiEventListener();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function listAgentSearch(dataCari) {
    var resultHeader = "";
    var result = "";
    var messageDiv = $('#DataListAgents');
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + dataCari + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LISTAGENT', TrxActionType: 'VIEWSEARCH'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            console.log(data.d);
            messageDiv.empty();
            resultHeader = '<li>' +
                '<input type="search" class="form-control" value="' + dataCari + '" placeholder="Search..." id="searchDropdown">' +
                '</li>';
            for (i = 0; i < json.length; i++) {
                result +=
                    '<li>' +
                    '<label class="dropdown-item">' +
                    '<input type="checkbox" class="form-check-input me-2" value="' + json[i].USERID + '"> ' + json[i].USERNAME + ' - ' + json[i].NAME + '<br>' + json[i].LEVELUSER +
                    '</label>' +
                    '</li>';
                feather.replace();


            }
            messageDiv.append(resultHeader + result);
            // Inisialisasi ulang event listener jika ada
            inisialisasiEventListener();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function inisialisasiEventListener() {
    // Inisialisasi event listener untuk checkbox dan search
    // Contoh untuk checkbox
    $('#DataListAgents input[type="checkbox"]').on('change', function () {

        ///
        //  if ($("#Update").prop("disabled") !== true) {

        var checkedCount = $('#DataListAgents input[type="checkbox"]:checked').length;

        

        if (checkedCount > parseInt($('#selectedMax').text())) {
          //  alert("Jumlah agen sudah maksimal");
            $(this).prop('checked', false); // Reset checkbox yang terakhir dicentang
        }else {
            // Lakukan sesuatu ketika checkbox diubah
            // Kumpulkan nilai checkbox yang dipilih
            var selectedValues = [];
            var selectedTexts = [];
            if ($('#selectedCount').text() == $('#selectedMax').text()) {
                alert("JUmlah agnet sudah maximal");
            } else {

                $('#DataListAgents input[type="checkbox"]:checked').each(function () {
                    selectedValues.push($(this).val());
                    var text = $(this).parent().text();
                    var name = text.split('-')[1].trim();
                    selectedTexts.push(name);
                    GlobalAgent.push(name)
                });
                $('#selectedItems').val(selectedTexts.join(';'));
                $('#AgentID').val(selectedValues.join(';'));
                // Anda bisa melakukan tindakan lain di sini
                var selectedCount = selectedValues.length;
                $('#selectedCount').text(selectedCount);

            }

            // Tampilkan nilai yang dipilih (misalnya di input #selectedItems)
          
           

           // $('#selectedMax').text( selectedCount);
        }
        ///


    });

    // Jika ada fungsi pencarian, inisialisasi ulang di sini
    // Contoh:
    $('#searchDropdown').on('input', function () {
        // Implementasikan logika pencarian
        var searchTerm = $(this).val().toLowerCase(); // Ambil teks pencarian dan ubah jadi huruf kecil

        if (searchTerm.length > 3) { // Mulai pencarian jika panjang input lebih dari 3
            $('#DataListAgents li').each(function () {
                var itemText = $(this).find('label').text().toLowerCase(); // Cari teks dalam label

                // Periksa apakah teks dalam label sesuai dengan input pencarian
                if (itemText.includes(searchTerm)) {
                    $(this).show(); // Tampilkan item jika sesuai
                } else {
                    $(this).hide(); // Sembunyikan item jika tidak sesuai
                }

            });
        } else {
            $('#DataListAgents li').show(); // Tampilkan semua item jika input kurang dari 4 karakter
        }
        //var searchTerm = $(this).val().toLowerCase(); // Ambil teks pencarian dan ubah jadi huruf kecil

        //if (searchTerm.length > 3) {
        //   listAgentSearch(searchTerm); // Panggil fungsi pencarian jika panjang input lebih dari 3
        //} else if (searchTerm.length < 1) {
        //   listAgent();
        //} else {
        // $('#DataListAgents li').show(); // Tampilkan semua item jika input kurang dari 4 karakter
        //}
    });
}

function EDIT_DataLoad(AgentID, dayName) {
    

    console.log("{TrxID:'" + AgentID + "', TrxUserName: '" + dayName + "', TrxAction: 'LIST', TrxActionType: 'DETAILSCHEDULESCHEME'}");
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + AgentID + "', TrxUserName: '" + dayName + "', TrxAction: 'LIST', TrxActionType: 'DETAILSCHEDULESCHEME'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("EditDataLoad");
            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);
            // Target tbody dalam tabel





        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function Filter() {
    // Show the modal when the filter button is clicked
    $('#filterdata').modal('show');
}

function QA_DataLoad() {
    myTable = $('#DataSCH_Shift').DataTable();
    var siteOptions = new Set();
    var uniqueStatusUsers = new Set();
    var uniqueNameShifts = new Set(); // To store unique Name Shifts values
    
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'LIST', TrxActionType: 'VIEWSCHEME'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            myTable.clear().draw();

            for (let i = 0; i < json.length; i++) {
                siteOptions.add(json[i].Site);

                let statusUser = json[i].StatusUser == 1 ? "Senior" : "Junior";
                uniqueStatusUsers.add(statusUser);

                // Add unique Name Shifts to the Set
                uniqueNameShifts.add(json[i].NameShifts);

                let newDateStart = new Date(parseInt(json[i].PeriodeStart.replace("/Date(", "").replace(")/", ""))).toLocaleDateString("en-UE");
                let newDateEnd = new Date(parseInt(json[i].PeriodeEnd.replace("/Date(", "").replace(")/", ""))).toLocaleDateString("en-UE");
                let lastModified = new Date(parseInt(json[i].DateUpdate.replace("/Date(", "").replace(")/", ""))).toLocaleString("en-UE");

                myTable.row.add([json[i].ID, json[i].NameShifts, json[i].Site, newDateStart, newDateEnd, lastModified, statusUser,
                    "<a onclick=\"Edit('" + json[i].ID + "', '" + newDateStart + "', '" + json[i].NameShifts.replace(/'/g, "\\'") + "')\"><i class='fas fa-edit'></i></a> | <i class='fas fa-trash-alt' onclick='Delete(" + json[i].ID + ")'></i>"
                ]).draw(false);
            }

            // Populate Site options
            let siteSelect = $('#siteSelect');
            siteSelect.empty().append('<option value="">Select Site</option>');
            siteOptions.forEach(site => siteSelect.append('<option value="' + site + '">' + site + '</option>'));

            // Populate StatusUser options
            let statusUserSelect = $('#statusUserSelect');
            statusUserSelect.empty().append('<option value="">Select Status</option>');
            uniqueStatusUsers.forEach(status => {
                statusUserSelect.append('<option value="' + status + '">' + status + '</option>');
            });

            // Populate unique Name Shifts options
            let userSelect = $('#userSelect');
            userSelect.empty().append('<option value="">Select Name Shifts</option>');
            uniqueNameShifts.forEach(nameShifts => {
                userSelect.append('<option value="' + nameShifts + '">' + nameShifts + '</option>');
            });
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
        }
    });
}


// Fungsi untuk mereset form filter
function resetFilterForm() {
    $('#filterType').val(''); // Reset filterType ke default
    $('#siteFilterDiv').hide(); // Sembunyikan filter Site
    $('#userFilterDiv').hide(); // Sembunyikan filter User

    // Reset dropdown ke nilai default
    $('#siteSelect').val('').trigger('change'); // Tambahkan trigger untuk memicu event 'change' jika diperlukan
    $('#statusUserSelect').val('').trigger('change'); 
    $('#userSelect').val('').trigger('change');
}

// Tampilkan modal dengan form yang sudah direset
$('#filterdata').on('show.bs.modal', function () {
    resetFilterForm(); // Panggil fungsi reset
});

// Reset form ketika modal ditutup
$('#filterdata').on('hidden.bs.modal', function () {
    resetFilterForm(); // Panggil fungsi reset
});

function toggleFilter() {
    var filterType = $('#filterType').val(); // Ambil nilai filterType
    if (!filterType) {
        // Jika tidak ada filterType yang dipilih, sembunyikan semuanya
        $('#siteFilterDiv').hide();
        $('#userFilterDiv').hide();
    } else if (filterType === 'site') {
        // Jika filterType = 'site', tampilkan siteFilterDiv
        $('#siteFilterDiv').show();
        $('#userFilterDiv').hide();
    } else if (filterType === 'user') {
        // Jika filterType = 'user', tampilkan userFilterDiv
        $('#siteFilterDiv').hide();
        $('#userFilterDiv').show();
    }
}

function ActionFilter() {
    var selectedFilterType = $('#filterType').val();

    if (selectedFilterType === 'site') {
        var selectedSite = $('#siteSelect').val();
        myTable.columns(2).search(selectedSite ? '^' + selectedSite + '$' : '', true, false);
    } else if (selectedFilterType === 'user') {
        var selectedStatus = $('#statusUserSelect').val();
        var selectedUser = $('#userSelect').val();

        if (selectedStatus && selectedUser && selectedStatus === selectedUser) {
            // If both selectedStatus and selectedUser have the same value, filter only one column
            myTable.columns(6).search('^' + selectedStatus + '$', true, false);
        } else {
            // Otherwise, apply separate filters for each column
            myTable.columns(6).search(selectedStatus ? '^' + selectedStatus + '$' : '', true, false);
            myTable.columns(1).search(selectedUser ? '^' + selectedUser + '$' : '', true, false);
        }
    }

    myTable.draw();
    $('#filterdata').modal('hide');
}

function Tambah() {
    $("#hd_StatusAction").val('add');
    $("#addContactModal").modal('show');
    $("#save-schedule").show();
    $("#Update").hide();
    $("#Delete").hide();
    CleanObject();
    listAgent();
}
function Edit(AgentID, tglParamStart, name,channel) {

    $("#hd_StatusAction").val('edit');
    $("#hd_DateParamStart").val(tglParamStart);
    console.log(AgentID);
    $('#AgentID').val(AgentID);
    $("#addContactModal").modal('show');
    $("#save-schedule").hide();
    $("#Update").show();
    //  $('#mySelect').prop('disabled')
    $('#mySelect').hide();

    $("#Delete").hide();

    CleanObject()
    viewChannelAssign(AgentID, name,channel);
}

function Delete(AgentID,channel) {
    
    $.ajax({
        type: "POST",
        //url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        //data: "{TrxID:'" + AgentID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'VIEW', TrxActionType: 'DELETESCHEME'}",
        url: "asmx/SCH_CreateShifts.asmx/InsertMasterTrxChangeSchedule",
        data: "{TrxID:'" + AgentID + "', TrxUserName: '" + channel + "', TrxAction: '', TrxActionType: 'DELETESCHEME', Param1: '', Param2: '', Param3: '', Param4: ''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            location.reload();
            

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TambahAgentShift() {
    $("#addAgentShift").modal('show');
}
function processAddAgents() {
    console.log($("#selectedItems").val());
    var myTable = $('#listAgentShifts').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + $("#selectedItems").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'ADD', TrxActionType: 'AgentstoShift'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            console.log(data.d);
            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {


                var buttonAction = '<i class="fas fa-edit"></i>  |  <i class="fas fa-trash-alt"></i>';
                myTable.row.add([json[i].NAME, json[i].EMAIL_ADDRESS, buttonAction]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CleanObject() {
    $("#TrxNamaMaster").val("");
    $("#cmbStatus").val("");
    $("#ContentPlaceHolder1_TrxID").val("");
}


function ActionGenerate() {

    var id = $('#AgentID').val();
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/GetDataHistory",
        data: "{TrxID:'" + id + "',Status:'',TrxAction:'GENERATE',AgentId:''}",

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

}
function handleCheckboxChange(checkedCheckbox) {

    if ($("#selectedItems").val() == "") {
        swal(
            '',
            'Silahkan pilih agent terlibih dahulu.',
            'info'
        ).then(function () {
            return false;
        });
        checkedCheckbox.checked = false;
        return false;
    }
    const tabsContainer = document.getElementById('tabs-container');
    const activeTab = tabsContainer.querySelector('.nav-link.active');

    if (activeTab) {
       
        var day = activeTab.innerText.split('\n')[0].trim();
        

        var parts = checkedCheckbox.defaultValue.split('-');
        var channelName = parts[3]; // "Omnichat"

        // Ambil nama grup dari checkbox yang sedang diproses
        const groupName = checkedCheckbox.name;
        console.log(groupName);
        // Ambil semua checkbox dengan nama grup yang sama
        const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
        // Jika checkbox ini dicentang, uncheck semua checkbox lainnya dalam grup yang sama
        let checkedCount = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox !== checkedCheckbox) {
                checkbox.checked = false;
            }
            if (checkbox.checked) {
                checkedCount++;
            }

        });


        if (checkedCount == 0) {
            $('#selectedMax').html('0');
        }

        getDataDays(day, channelName);
        CheckSchemaPerhari(day, channelName);
        //$.ajax({
        //    type: "POST",
        //    url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        //    data: "{TrxID:'" + day + "', TrxUserName: '" + channelName + "', TrxAction: 'LIST', TrxActionType: 'DaysParam'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (data) {

        //        var json = JSON.parse(data.d);
        //        if (checkedCount > 0) {
        //            $('#selectedMax').html(json[0].QtyAgent);
        //            $('#maxChannel').show();
        //        }
               
        //    },
        //    error: function (xmlHttpRequest, textStatus, errorThrown) {
        //        console.log(xmlHttpRequest.responseText);
        //        console.log(textStatus);
        //        console.log(errorThrown);
        //    }
        //})
       
    } 

  
}

function getDataDays(day, selectedValue) {

  
    $.ajax({
        type: "POST",
        url: "asmx/SCH_CreateShifts.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + day + "', TrxUserName: '" + selectedValue + "', TrxAction: 'LIST', TrxActionType: 'DaysParam'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);

            if (json.length == 0) {
                $('#selectedMax').html('0');
                $('#maxChannel').show();
            } else {
                $('#selectedMax').html(json[0].QtyAgent);
                $('#maxChannel').show();
            }

         

            if (parseInt($('#selectedCount').html()) > parseInt(json[0].QtyAgent)) {
                const listItems = $('#selectedItems').val();
                const Agents = $('#AgentID').val();


                var datRemove = parseInt($('#selectedCount').html()) - parseInt(json[0].QtyAgent);

                let nameArray = listItems.split(';');
                nameArray = nameArray.slice(0, datRemove);

                $('#selectedItems').val("");
                let updatedNames = nameArray.join(';');
                $('#selectedItems').val(updatedNames);

                ///agent Id
                let IdArray = Agents.split(';');
                IdArray = IdArray.slice(0, datRemove);
                $('#AgentID').val("");
                let updatedId = IdArray.join(';');
                $('#AgentID').val(updatedId);
                const checkboxes = document.querySelectorAll('#DataListAgents input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    if (updatedId.split(';').includes(checkbox.value)) {
                        checkbox.checked = true;
                    } else {
                        checkbox.checked = false;
                    }
                });
                $('#selectedCount').html(nameArray.length);



            }



        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

}

function CheckSchemaPerhari(day,channel) {
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    var listAgent = $('#selectedItems').val();

    const nameArray = listAgent.split(';');

    console.log(`Jumlah nama: ${nameArray.length}`);

    if (channel = "Omnichat") {
        glbTotalOmniChat += nameArray.length;
        // if (selectedMax > glbTotalOmniChat) {
            // alert(`${channel} Jumlah Agent ${glbTotalOmniChat}`);

        // } else {
            // alert(`${channel} Jumlah Agent ${nameArray.length}`);
        // }

        

    }
    if (channel == "Comments & More") {
        glbTotalCommentAndMore += nameArray.length;
        if (selectedMax > glbTotalCommentAndMore) {
            // alert(`${channel} Jumlah Agent ${glbTotalCommentAndMore}`);

        } else {
            // alert(`${channel} Jumlah Agent ${nameArray.length}`);
        }
    }
    if (channel == "Voice") {
        glbTotalVoice += nameArray.length;
        if (selectedMax > glbTotalVoice) {
            // alert(`${channel} Jumlah Agent ${glbTotalVoice}`);

        } else {
            // alert(`${channel} Jumlah Agent ${nameArray.length}`);
        }

      
       
    }
    if (channel == "Email") {
        glbTotalEmail += nameArray.length;

        if (selectedMax > glbTotalEmail) {
            // alert(`${channel} Jumlah Agent ${glbTotalEmail}`);

        } else {
            // alert(`${channel} Jumlah Agent ${nameArray.length}`);
        }
      
    }


   


    //// Menampilkan checkbox yang tercentang
    //checkedCheckboxes.forEach(checkbox => {
    //    if (checkbox.checked == true) {
    //        alert("channel " + checkbox.value);
            
    //    }
    //});
}

function CheckSchema4Minggu(day, channel) {

    GlobalAgent.forEach((name, index) => {
        // alert(`Nama ke-${index + 1}: ${name}`);
    });
   

}
