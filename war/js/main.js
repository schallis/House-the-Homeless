window.hth = {
  init: function(options) {
    this.options = options;
    this.setupBrowseTabs();
    this.animateFlash();
    this.setupDatatables();
    this.setupChosen();
    this.setupCalendar();
    $.datepicker.setDefaults( $.datepicker.regional[ "en-GB" ] );
    $('#date').datepicker();
    $('#dob').datepicker();
  },
  setupBrowseTabs: function(event) {
    $('#uitabs').tabs({
      selected : 0,
    });
    // for forward and back
    $.address.change(function(event){
      $("#uitabs").tabs( {
        "show": function(event, ui) {
          var oTable = $('div.dataTables_scrollBody>table.tabular', ui.panel).dataTable();
          if ( oTable.length > 0 ) {
            oTable.fnAdjustColumnSizing();
          }
        }
      }
                         /*"select", window.location.hash*/
                       )
    });
    // when the tab is selected update the url with the hash
    $("#uitabs").bind("tabsselect", function(event, ui) { 
      window.location.hash = ui.tab.hash;
    })
  },
  animateFlash: function() {
    $('#flash').hide()
    $('#flash').fadeIn(1500);
    window.setTimeout("$('#flash').slideUp()", 5000);
  },
  setupDatatables: function() {
    $('.tabular').dataTable( {
      "sScrollY": "300px",
      "bScrollCollapse": true,
      "bPaginate": false,
    });
  },
  setupChosen: function() {
    $('table.stay #client-id').chosen()
  },
  setupCalendar: function() {
    $('div#calendar').datepicker({
      onSelect: function(dateText, inst) {
        window.location.href = "/calendar/" + dateText;
      }
    });
  }
};
