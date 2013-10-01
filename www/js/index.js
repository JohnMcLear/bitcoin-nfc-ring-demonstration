var app = {
  initialize: function () {
    this.bind();
  },
  bind: function () {
    document.addEventListener('deviceready', this.deviceready, false);
  },
  deviceready: function () {
    // note that this is an event handler so the scope is that of the event
    // so we need to call app.report(), and not this.report()
    console.log('deviceready');
    if(nfc){
      nfc.addNdefListener(function (nfcEvent) {
	    if(nfc.type == "topUp") topUp(nfc, nfcEvent);
		if(nfc.type == "takePayment") takePayment(nfc, nfcEvent);
        ring(nfcEvent); // TODO uncomment me
        console.log("Attempting to bind to NFC");
      }, function () {
        console.log("Success.  Listening for rings..");
      }, function () {
        alert("NFC Functionality is not working, is NFC enabled on your device?");
        // $('#createNew, #read, #scan').attr('disabled','disabled');
        // console.log("Fail.");
      });
      // ndefRecord = ndef.uriRecord("http://nfcring.com"); // placeholder..
      // console.log('is barcode ready? ' + window.barcodescanner);
    }
  }
};

function topUp(nfc, nfcEvent){
  // Show Validating..
  // Check Pin
  // Do HTTP request
  $("#writeRing > .actionName").text("Validating..."); // pretending..
  $("#writeRing > .actionContents").html("<img src='img/loading.gif'>");
  
  setTimeout(function(){
    $("#writeRing > .actionName").text("Top Up Complete"); // pretending..
    $("#writeRing > .actionContents").html("<img src='img/complete.png'>");
  }, 2000);
  
  
}

function takePayment(nfc, nfcEvent){
  $("#readRing > .actionName").text("Validating..."); // pretending..
  $("#readRing > .actionContents").html("<img src='img/loading.gif'>");
  
  setTimeout(function(){
    $("#readRing > .actionName").text("Payment Complete"); // pretending..
    $("#readRing > .actionContents").html("<img src='img/complete.png'>");
  }, 2000);
}



function debug(msg) {
  console.log(msg);
}

// listeners
$("body").on('click', "#topUp", function () {
  window.location = "topUpRing.html";
});
$("body").on('click', "#takePayment", function () {
  window.location = "takePayment.html";
});
$("body").on('click', "#finish", function () {
  window.location = "index.html";
});

$("body").on('click', "#exit", function () {
  console.log("Exiting app");
  navigator.app.exitApp(); 
});
$("body").on('click', "#amount > #ok", function () {
  $("#amount").hide();
  $("#enterPin").show();
  $("#enterPin > .actionContents > input").focus();
});
$("body").on('click', "#enterPin > #ok", function () {
  $("#enterPin").hide();
  $("#writeRing").show();
  // Oh yes.
  var amount = $("#amount > .actionContents > input").val();
  var pin = $("#enterPin > .actionContents > input").val();
  nfc = {"type": "topUp", "amount": amount, "pin": pin};
});
$("body").on('click', "#merchantAmount > #ok", function () {
  $("#merchantAmount").hide();
  $("#readRing").show();
  var amount = $("#merchantAmount > .actionContents > input").val();
  nfc = {"type": "takePayment", "amount": amount};
});
$("body").on('click', "#readRing > #ok", function () {
  // close window / running application
  $("#readRing").hide();
  $("#enterPin").show();
});
$("body").on('click', "#plus", function () {
  // close window / running application
  $("#amount > .actionContents > input").val(parseInt($("#amount > .actionContents > input").val()) + 1);
  $("#merchantAmount > .actionContents > input").val(parseInt($("#merchantAmount > .actionContents > input").val()) + 1);
})
$("body").on('click', "#minus", function () {
  // close window / running application
  $("#amount > .actionContents > input").val(parseInt($("#amount > .actionContents > input").val()) - 1);
  $("#merchantAmount > .actionContents > input").val(parseInt($("#merchantAmount > .actionContents > input").val()) - 1);
})

/*

// We have the tag in a global object
function ring(nfcEvent) { // On NFC Activity..

  if("yay" == "yay"){

    console.log("New URL", newUrl)
    var ndefRecord = ndef.uriRecord(newUrl); // support more types.. TODO

    nfc.write([ndefRecord], function () {
      navigator.notification.vibrate(100);
      console.log("Written", ndefRecord);
      alert("Woohoo!  Your ring is ready.");
    }, function (reason) {
      console.log("Inlay write failed")
    });
	
  }else{
    // read
	console.log("Reading")
	console.log(nfcEvent);
	var ring = nfcEvent.tag;
	console.log(ring);
	ringData = nfc.bytesToString(ring.ndefMessage[0].payload); // TODO make this less fragile 
  }
}

function gup( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
  var regexS = "[\\?&]"+name+"=([^&#]*)";  
  var regex = new RegExp( regexS );  
  var results = regex.exec( window.location.href ); 
  if( results == null ){
    return "";
  }
  else{
    return results[1];
  }
}

*/