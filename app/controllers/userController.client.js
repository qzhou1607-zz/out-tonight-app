'use strict';

(function () {

   var profileUsername = document.querySelector('#profile-username') || null;
   var logLink = document.getElementById('log-toggle');
   var logText = document.getElementById('log-btn-toggle');
   var searchBar = document.querySelector('.search-bar');
   var searchBtn = document.querySelector('.search-btn')
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }
   
   function getListHtml(imgUrl,reviewImgUrl, yelpUrl, name,address_1,address_2) {
      var templ = '<div class="list-container">'
   					+ '<img class="bar-img" src="' + imgUrl + '">'
   					+ '<div class="bar-info">'
   					+	'<img src="' + reviewImgUrl + '">'
   					+	'<span><a target="_blank" href="' + yelpUrl + '">' + name + '</a></span>'
   					+	'<br>'
   					+	'<div class="bar-address">'
   					+		'<span>' + address_1 + '</span>'
   					+		'<br>'
   					+		'<span>' + address_2 + '</span>'
   					+	'</div>'
   				+	'</div>'
   			+	'</div>';
		return templ;
   }
   
   searchBtn.addEventListener('click',function() {
      ajaxFunctions.ajaxRequest('GET',(appUrl + '/api/search?location=' + searchBar.value),function(data) {
         document.querySelector('.search-result').innerHTML="";
         var bars = JSON.parse(data);
         bars.forEach(function(item) {
            var obj = {
               'imgUrl':item.image_url,
               'reviewImgUrl':item.rating_img_url_large,
               'yelpUrl':item.url,
               'name':item.name,
               'address_1':item.location.display_address[0],
               'address_2':item.location.display_address[1],
            }
         document.querySelector('.search-result').innerHTML += getListHtml(
               obj.imgUrl, obj.reviewImgUrl, obj.yelpUrl, obj.name,obj.address_1,obj.address_2);
         });
      });
   });
   
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
     
      var userObject = JSON.parse(data);

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'displayName'); 
         logLink.href = '/logout';
         logText.innerHTML = 'Logout';
      }

   }));
})();
