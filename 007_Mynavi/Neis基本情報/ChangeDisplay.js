
const items = ['ClassC', 'ClassD', 'ClassE', 'ClassF', 'ClassG', 'ClassH', 'ClassI', 'ClassJ', 'ClassK', 'ClassL']


function selectItem() {
   let values = []
   for (let item of items) {
      options = document.querySelectorAll(`#Results_${item} option[hidden]`)
      options.forEach(option => {
         option.hidden = false
      })
   }
   for (let item of items) {
      let value = $p.getControl(item).val()
      if (value) {
         values.push(value)
      }
   }
   for (let item of items) {
      for (let value of values) {
         let option = document.querySelector(`#Results_${item} option[value="${value}"]`)
         if (option) {
            option.hidden = true
         }
      }
   }
   options = document.querySelectorAll(`#Results_ClassM option`)
   options.forEach(option => {
      option.hidden = true
   })
   for (let value of values) {
      let option = document.querySelector(`#Results_ClassM option[value="${value}"]`)
      if (option) {
         option.hidden = false
      }
   }


}


function changeDisplay(){
   if($p.getControl('Class005').val() =="txt" || $p.getControl('Class005').val() =="csv" ){
      $('#ClassList').show()
   }else{
      $p.set($p.getControl('Class006'),'')
      $p.set($p.getControl('Class007'),'')
      $p.set($p.getControl('Class009'),'')
      $('#ClassList').hide()
   }
}



$p.on('change', 'Class005', function () {
   changeDisplay()
})

for (let item of items) {
   $p.on('change', item, function () {
     selectItem()
   })
}



changeDisplay()
selectItem()


$p.events.on_editor_load = function () {
   changeDisplay()
   selectItem()
}
