$(document).ready(function () {

  loadPizza(function (items) {
    items.forEach(element => {
      $('.table').append('<tr><th>' + element.number +
        '</th><td>' + element.name +
        '</td><td>' + element.topping +
        '</td><td>' + element.price +
        '</td><td><a class="btn-add" onclick="add(' + element.number + ',' + element.price + ')">Add</a> <a class="btn-remove" onclick="remove(' + element.number + ',' + element.price + ')">Remove</a></td></tr>')
    });

  });
  $(".search").keyup(function () {
    var searchTerm = $(".search").val();
    var listItem = $('.results tbody').children('tr');
    var searchSplit = searchTerm.replace(/ /g, "'):containsi('")

    $.extend($.expr[':'], {
      'containsi': function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
      }
    });

    $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function (e) {
      $(this).attr('visible', 'false');
    });

    $(".results tbody tr:containsi('" + searchSplit + "')").each(function (e) {
      $(this).attr('visible', 'true');
    });

    var jobCount = $('.results tbody tr[visible="true"]').length;
    $('.counter').text(jobCount + ' item');

    if (jobCount == '0') {
      $('.no-result').show();
    } else {
      $('.no-result').hide();
    }
  });

  function loadPizza(callback) {
    $.ajax({
      type: "GET",
      url: "pizza",
    }).done(function (response) {
      if (response !== null) { // if wrong username or password
        callback(response)
      }
    });
  }
});

function add(number, price) {

  $("#total").text("Total: " + price + " DKK");
  console.log("Added ", number, price)
}

function remove(number, price) {
  console.log("Removed ", number, price)
}